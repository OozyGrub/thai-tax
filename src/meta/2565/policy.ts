import { Policy } from "../../types/policy";

const policy: Policy = {
  family: {
    expense: { min: 100_000 },
    self: { min: 60_000 },
    // TODO: 30,000 - 60,000 depend on age
    children: { multiplier: 30_000 },
    parent: { multiplier: 30_000 },
    spouse: { multiplier: 30_000 },
    handicap: { multiplier: 60_000 },
  },
  general: {
    sso: { max: 9_000 },
    houseInterest: { max: 100_000 },
    socialEnterprise: { max: 100_000 },
    shopDeeMeeKuen: { max: 30_000 },
  },
  insurance: {
    self: {
      max: 100_000,
      life: { max: 100_000 },
      health: { max: 25_000 },
    },
    parent: { max: 15_000 },
    spouse: { max: 10_000 },
  },
  fund: {
    max: 500_000,
    government: { percent: 15 },
    rmf: { percent: 30 },
    annuity: { max: 200_000, percent: 15 },
    nsf: { max: 13_200 },
    ssf: { max: 200_000, percent: 30 },
  },
  donation: {
    special: { percent: 0.1, multiplier: 2 },
    other: { percent: 0.1, multiplier: 2 },
    politic: { max: 100_000 },
  },
};

export default policy;
