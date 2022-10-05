import { FamilyStatus } from "./../enums";

export type ThaiTaxYear = 2565;

export type TaxMetaData = {
  policy: Policy;
  taxTable: TaxTable;
};

export type TaxMetaDataMap = { [o in ThaiTaxYear]: TaxMetaData };

export type TaxOutput = {
  totalIncome: number;
  totalDeduct: number;
  tax: number;
  toPay: number;
};

export type TaxTableRange = {
  from: number;
  to: number;
  percent: number;
};
export type TaxTable = TaxTableRange[];

export type Income = {
  salary: number;
  bonus: number;
  other: number;
  crypto: number;
};

export type GeneralInfo = {
  sso: number;
  houseInterest: number;
  etc: number;
  wht: number;
};

export type Family = {
  status: FamilyStatus;
  noOfChildren: number;
  noOfParents: number;
  noOfSpouses: number;
  noOfRelatedHandicaps: number;
  noOfNonRelatedHandicaps: number;
};

export type Insurance = {
  life: number;
  health: number;
  parent: number;
  retire: number;
};

export type Donation = {
  special: number;
  other: number;
};

// http://www.uckkpho.com/other/48/
export type Fund = {
  pvd: number;
  ssf: number;
  rmf: number;

  /** Government Pension Fund */
  gpf: number;

  /** National Savings Fund */
  nsf: number;

  /** Private School Teacher */
  pvt: number;
};

export type Policy = {
  deduct: {
    self: number;
    parent: number;
    spouse: number;
    handicap: number;
  };
  limit: {
    general: {
      sso: number;
      houseInterest: number;
    };
    insurance: {
      life: number;
      health: number;
      self: number;
      parent: number;
      retire: number;
    };
    fund: {
      value: number;
      percent: number;
    };
    donation: {
      percent: number;
    };
  };
  coefficient: {
    donation: {
      special: number;
      other: number;
    };
  };
};
