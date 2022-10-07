import { FamilyStatus } from "../enums";

export type Income = {
  salary: number;
  bonus: number;
  other: number;
  crypto: number;
};

export type GeneralInfo = {
  sso: number;
  houseInterest: number;
  socialEnterprise: number;
  shopDeeMeeKuen: number;
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
  spouse: number;
  annuity: number;
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
