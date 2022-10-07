import { clamp, max, min, round, sum } from "lodash";
import { defaultOptions } from "./defaultOptions";
import { FamilyStatus } from "./enums";
import taxMetaDataMap from "./meta";
import { TaxOutput, TaxYear } from "./types";
import { Policy } from "./types/policy";
import {
  Donation,
  Family,
  Fund,
  GeneralInfo,
  Income,
  Insurance,
} from "./types/props";
import { TaxTable } from "./types/taxTable";
import { resolve } from "./utils/resolve";
import { sumValues } from "./utils/sumValues";

export class ThaiTax {
  private policy: Policy;
  private taxTable: TaxTable;

  private income: Income;
  private generalInfo: GeneralInfo;

  private family: Family;
  private insurance: Insurance;
  private fund: Fund;
  private donation: Donation;

  constructor(year?: TaxYear) {
    this.policy = year ? taxMetaDataMap[year].policy : defaultOptions.policy;
    this.taxTable = year
      ? taxMetaDataMap[year].taxTable
      : defaultOptions.taxTable;
    this.income = defaultOptions.income;
    this.generalInfo = defaultOptions.generalInfo;
    this.family = defaultOptions.family;
    this.insurance = defaultOptions.insurance;
    this.fund = defaultOptions.fund;
    this.donation = defaultOptions.donation;
    return this;
  }

  public setIncome(o: Partial<Income>): ThaiTax {
    this.income = { ...defaultOptions.income, ...o };
    return this;
  }

  public setGeneralInfo(o: Partial<GeneralInfo>): ThaiTax {
    this.generalInfo = { ...defaultOptions.generalInfo, ...o };
    return this;
  }

  public setFamily(o: Partial<Family>): ThaiTax {
    this.family = { ...defaultOptions.family, ...o };
    return this;
  }

  public setInsurance(o: Partial<Insurance>): ThaiTax {
    this.insurance = { ...defaultOptions.insurance, ...o };
    return this;
  }

  public setFund(o: Partial<Fund>): ThaiTax {
    this.fund = { ...defaultOptions.fund, ...o };
    return this;
  }

  public setDonation(o: Partial<Donation>): ThaiTax {
    this.donation = { ...defaultOptions.donation, ...o };
    return this;
  }

  /**
   *
   * @returns เงินได้ที่ต้องเสียภาษี
   */
  public sumIncome(): number {
    return sumValues(this.income);
  }

  public getTax(): number {
    const netIncome = this.getNetIncome() - this.sumDonationDeduct();
    return this.calculateTax(netIncome);
  }

  public sumFamilyDeduct(): number {
    const selfDeduct = resolve({
      criteria: this.policy.family.self,
    });

    const parentDeduct = resolve({
      criteria: this.policy.family.parent,
      amount: this.family.noOfParents,
    });

    // TODO: 30,000 - 60,000 depend on age
    const childrenDeduct = resolve({
      criteria: this.policy.family.children,
      amount: this.family.noOfChildren,
    });

    const netSpouses =
      this.family.status === FamilyStatus.MARRIED
        ? // monogamy
          min([1, this.family.noOfSpouses])
        : 0;
    const spouseDeduct = resolve({
      criteria: this.policy.family.spouse,
      amount: netSpouses,
    });

    const netHandicaps = this.family.noOfRelatedHandicaps;
    0 + clamp(this.family.noOfNonRelatedHandicaps, 0, 1);
    const handicapDeduct = resolve({
      criteria: this.policy.family.handicap,
      amount: netHandicaps,
    });

    return sum([
      selfDeduct,
      parentDeduct,
      childrenDeduct,
      spouseDeduct,
      handicapDeduct,
    ]);
  }

  public sumGeneralDeduct(): number {
    const ssoDeduct = resolve({
      criteria: this.policy.general.sso,
      amount: this.generalInfo.sso,
    });

    const houseInterestDeduct = resolve({
      criteria: this.policy.general.houseInterest,
      amount: this.generalInfo.houseInterest,
    });

    const socialEnterpriseDeduct = resolve({
      criteria: this.policy.general.socialEnterprise,
      amount: this.generalInfo.socialEnterprise,
    });

    const shopDeeMeeKuenDeduct = resolve({
      criteria: this.policy.general.shopDeeMeeKuen,
      amount: this.generalInfo.shopDeeMeeKuen,
    });

    return sum([
      ssoDeduct,
      houseInterestDeduct,
      socialEnterpriseDeduct,
      shopDeeMeeKuenDeduct,
    ]);
  }

  public sumInsuranceAndFundDeduct(): number {
    const lifeInsuranceDeduct = resolve({
      amount: this.insurance.life,
      criteria: this.policy.insurance.self.life,
    });

    const calInsuranceDeduct = (): number => {
      const healthInsuranceDeduct = resolve({
        criteria: this.policy.insurance.self.health,
        amount: this.insurance.health,
      });

      const selfInsuranceDeduct = resolve({
        criteria: this.policy.insurance.self,
        amount: lifeInsuranceDeduct + healthInsuranceDeduct,
      });

      const parentInsuranceDeduct = resolve({
        criteria: this.policy.insurance.parent,
        amount: this.insurance.parent,
      });

      const spouseInsuranceDeduct = resolve({
        criteria: this.policy.insurance.spouse,
        amount: this.insurance.spouse,
      });

      return sum([
        selfInsuranceDeduct,
        parentInsuranceDeduct,
        spouseInsuranceDeduct,
      ]);
    };

    const calFundDeduct = (): number => {
      const governmentDeduct = resolve({
        criteria: this.policy.fund.government,
        amount: this.fund.gpf + this.fund.pvd + this.fund.pvt,
        percentRef: this.income.salary,
      });

      const rmfDeduct = resolve({
        criteria: this.policy.fund.rmf,
        amount: this.fund.rmf,
        percentRef: this.sumIncome(),
      });

      const annuityDeduct = resolve({
        criteria: this.policy.fund.annuity,
        amount: this.insurance.annuity,
      });

      const nsfDeduct = resolve({
        criteria: this.policy.fund.nsf,
        amount: this.fund.nsf,
      });

      const ssfDeduct = resolve({
        criteria: this.policy.fund.ssf,
        amount: this.fund.ssf,
        percentRef: this.sumIncome(),
      });

      const fundDeduct = sum([
        governmentDeduct,
        rmfDeduct,
        annuityDeduct,
        nsfDeduct,
        ssfDeduct,
      ]);

      return resolve({
        criteria: this.policy.fund,
        amount: fundDeduct,
      });
    };

    return calInsuranceDeduct() + calFundDeduct();
  }

  public sumDonationDeduct(): number {
    const specialDeduct = resolve({
      criteria: this.policy.donation.special,
      amount: this.donation.special,
      percentRef: this.getNetIncome(),
    });

    const otherDeduct = resolve({
      criteria: this.policy.donation.other,
      amount: this.donation.other,
      percentRef: this.getNetIncome(),
    });

    return sum([specialDeduct, otherDeduct]);
  }

  /**
   *
   * @returns เงินได้หลังหักค่าลดหย่อน
   */
  public getNetIncome(): number {
    const totalIncome = this.sumIncome();

    const familyDeduct = this.sumFamilyDeduct();
    const generalDeduct = this.sumGeneralDeduct();
    const insuranceAndFundDeduct = this.sumInsuranceAndFundDeduct();

    const totalDeduct = sum([
      familyDeduct,
      generalDeduct,
      insuranceAndFundDeduct,
    ]);

    const expense = resolve({ criteria: this.policy.family.expense });

    return max([0, totalIncome - totalDeduct - expense])!;
  }

  public calculateTax(amount: number): number {
    return this.taxTable.reduce((total, range) => {
      if (range.from > amount) return total;

      return (
        total + (range.percent / 100) * (min([amount, range.to])! - range.from)
      );
    }, 0);
  }

  public summarize(): TaxOutput {
    const netIncome = this.getNetIncome() - this.sumDonationDeduct();
    const tax = this.getTax();

    return {
      netIncome: round(netIncome, 2),
      tax: round(tax, 2),
    };
  }
}
