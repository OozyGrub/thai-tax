import { Policy } from "./policy";
import { Family, GeneralInfo, Income } from "./props";
import { Donation, Fund, Insurance } from "./props.d";
import { TaxTable } from "./taxTable";

export type DefaultOptions = {
  policy: Policy;
  taxTable: TaxTable;
  income: Income;
  generalInfo: GeneralInfo;
  family: Family;
  insurance: Insurance;
  fund: Fund;
  donation: Donation;
};
