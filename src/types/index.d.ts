import { Policy } from "./policy";
import { TaxTable } from "./taxTable";

export type TaxYear = 2565;

export type TaxMetaData = {
  policy: Policy;
  taxTable: TaxTable;
};

export type TaxMetaDataMap = { [o in TaxYear]: TaxMetaData };

export type TaxOutput = {
  netIncome: number;
  tax: number;
};
