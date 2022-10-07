import taxMetaDataMap from "./meta";
import { TaxYear } from "./types";
import { DefaultOptions } from "./types/defaultOptions.d";

const defaultYear: TaxYear = 2565;

export const defaultOptions: DefaultOptions = {
  policy: taxMetaDataMap[defaultYear].policy,
  taxTable: taxMetaDataMap[defaultYear].taxTable,
  income: {
    salary: 0,
    bonus: 0,
    other: 0,
    crypto: 0,
  },
  generalInfo: {
    sso: 0,
    houseInterest: 0,
    socialEnterprise: 0,
    shopDeeMeeKuen: 0,
  },
  family: {
    status: 0,
    noOfChildren: 0,
    noOfParents: 0,
    noOfSpouses: 0,
    noOfRelatedHandicaps: 0,
    noOfNonRelatedHandicaps: 0,
  },
  insurance: {
    life: 0,
    health: 0,
    parent: 0,
    spouse: 0,
    annuity: 0,
  },
  fund: {
    pvd: 0,
    ssf: 0,
    rmf: 0,
    gpf: 0,
    nsf: 0,
    pvt: 0,
  },
  donation: {
    special: 0,
    other: 0,
  },
};
