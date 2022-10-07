export type Criteria = {
  min?: number;
  max?: number;
  percent?: number;
  multiplier?: number;
};

export type Policy = {
  family: {
    expense: Criteria;
    self: Criteria;
    children: Criteria;
    parent: Criteria;
    spouse: Criteria;
    handicap: Criteria;
  };
  general: {
    sso: Criteria;
    houseInterest: Criteria;
    socialEnterprise: Criteria;
    shopDeeMeeKuen: Criteria;
  };
  insurance: {
    self: Criteria & {
      life: Criteria;
      health: Criteria;
    };
    parent: Criteria;
    spouse: Criteria;
  };
  fund: Criteria & {
    government: Criteria;
    rmf: Criteria;
    annuity: Criteria;
    nsf: Criteria;
    ssf: Criteria;
  };
  donation: {
    special: Criteria;
    politic: Criteria;
    other: Criteria;
  };
};
