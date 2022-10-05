import { Policy } from "../../types/types";

const policy: Policy = {
  deduct: {
    self: 30_000,
    parent: 30_000,
    spouse: 30_000,
    handicap: 60_000,
  },
  limit: {
    general: {
      sso: 9_000,
      houseInterest: 100_000,
    },
    insurance: {
      life: 100_000,
      health: 25_000,
      self: 100_000,
      parent: 15_000,
      retire: 300_000,
    },
    fund: {
      value: 500_000,
      percent: 0.15,
    },
    donation: {
      percent: 0.1,
    },
  },
  coefficient: {
    donation: {
      special: 2,
      other: 1,
    },
  },
};

export default policy;
