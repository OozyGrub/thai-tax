import { min, round, sum } from "lodash";
import { FamilyStatus } from "./enums";
import taxMetaDataMap from "./meta";
import {
  Donation,
  Fund,
  GeneralInfo,
  Income,
  Policy,
  TaxOutput,
  TaxTable,
  ThaiTaxYear,
} from "./types/types";
import { Family, Insurance } from "./types/types.d";
import { sumValues } from "./utils/sumValues";

export class ThaiTax {
  private year: ThaiTaxYear;
  private policy: Policy;
  private taxTable: TaxTable;

  private income: Income;
  private generalInfo: GeneralInfo;

  private family: Family;
  private insurance: Insurance;
  private fund: Fund;
  private donation: Donation;

  constructor(year: ThaiTaxYear) {
    this.year = year;
    this.policy = taxMetaDataMap[year].policy;
    this.taxTable = taxMetaDataMap[year].taxTable;

    this.income = { salary: 0, bonus: 0, other: 0, crypto: 0 };
    this.generalInfo = { sso: 0, houseInterest: 0, etc: 0, wht: 0 };
    this.family = {
      status: FamilyStatus.SINGLE,
      noOfChildren: 0,
      noOfParents: 0,
      noOfSpouses: 0,
      noOfRelatedHandicaps: 0,
      noOfNonRelatedHandicaps: 0,
    };
    this.insurance = {
      life: 0,
      health: 0,
      parent: 0,
      retire: 0,
    };
    this.fund = {
      pvd: 0,
      ssf: 0,
      rmf: 0,
      gpf: 0,
      nsf: 0,
      pvt: 0,
    };
    this.donation = {
      special: 0,
      other: 0,
    };
  }

  public setIncome(o: Income): ThaiTax {
    this.income = o;
    return this;
  }

  public setGeneralInfo(o: GeneralInfo): ThaiTax {
    this.generalInfo = o;
    return this;
  }

  public setFamily(o: Family): ThaiTax {
    this.family = o;
    return this;
  }

  public setInsurance(o: Insurance): ThaiTax {
    this.insurance = o;
    return this;
  }

  public setFund(o: Fund): ThaiTax {
    this.fund = o;
    return this;
  }

  public setDonation(o: Donation): ThaiTax {
    this.donation = o;
    return this;
  }

  public calFamilyDeduct(): number {
    const selfDeduct = this.policy.deduct.self;
    const parentDeduct = this.family.noOfParents * this.policy.deduct.parent;
    const spouseDeduct =
      this.family.status === FamilyStatus.MARRIED
        ? this.family.noOfSpouses * this.policy.deduct.spouse
        : 0;
    const handicapDeduct =
      this.family.noOfRelatedHandicaps * this.policy.deduct.handicap +
        this.family.noOfNonRelatedHandicaps >
      0
        ? this.policy.deduct.handicap
        : 0;

    return sum([selfDeduct, parentDeduct, spouseDeduct, handicapDeduct]);
  }

  public calGeneralDeduct(): number {
    const ssoDeduct = min([
      this.generalInfo.sso,
      this.policy.limit.general.sso,
    ])!;
    const houseInterestDeduct = min([
      this.generalInfo.houseInterest,
      this.policy.limit.general.houseInterest,
    ])!;
    return sum([ssoDeduct, houseInterestDeduct]);
  }

  public calInsuranceAndFundDeduct(): number {
    const lifeInsuranceDeduct = min([
      this.insurance.life,
      this.policy.limit.insurance.life,
    ])!;

    const calInsuranceDeduct = (): number => {
      const healthInsuranceDeduct = min([
        this.insurance.health,
        this.policy.limit.insurance.health,
      ])!;
      const selfInsuranceDeduct = min([
        lifeInsuranceDeduct + healthInsuranceDeduct,
        this.policy.limit.insurance.life,
      ])!;
      const parentDeduct = min([
        this.insurance.parent,
        this.policy.limit.insurance.parent,
      ])!;
      return sum([selfInsuranceDeduct, parentDeduct]);
    };

    const calFundDeduct = (): number => {
      const retireDeduct = min([
        this.insurance.retire,
        this.policy.limit.insurance.retire - lifeInsuranceDeduct,
      ])!;
      return min([
        sumValues(this.fund) + retireDeduct,
        // this.policy.limit.fund.percent * sumValues(this.income),
        this.policy.limit.fund.value,
      ])!;
    };

    return calInsuranceDeduct() + calFundDeduct();
  }

  public calDonationDeduct(): number {
    const deduct =
      this.policy.coefficient.donation.special * this.donation.special +
      this.policy.coefficient.donation.other * this.donation.other;
    return min([
      deduct,
      this.policy.limit.donation.percent * sumValues(this.income),
    ])!;
  }

  public calTax(amount: number): number {
    return this.taxTable.reduce((total, range) => {
      if (range.from > amount) return total;
      return total + range.percent * (min([amount, range.to])! - range.from);
    }, 0);
  }

  public summarize(): TaxOutput {
    const totalIncome = sumValues(this.income);

    const familyDeduct = this.calFamilyDeduct();
    const generalDeduct = this.calGeneralDeduct();
    const insuranceAndFundDeduct = this.calInsuranceAndFundDeduct();
    const donationDeduct = this.calDonationDeduct();

    const totalDeduct = sum([
      familyDeduct,
      generalDeduct,
      insuranceAndFundDeduct,
      donationDeduct,
    ]);

    console.log(totalIncome);
    const tax = this.calTax(totalIncome - totalDeduct);

    return {
      totalDeduct: round(totalDeduct, 2),
      totalIncome: round(sumValues(this.income), 2),
      tax: round(tax, 2),
      toPay: round(tax - this.generalInfo.wht, 2),
    };
  }
}
