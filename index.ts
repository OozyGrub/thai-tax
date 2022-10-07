import { FamilyStatus } from "./src/enums";
import { ThaiTax } from "./src/ThaiTax";

const thaiTax = new ThaiTax(2565)
  .setIncome({
    salary: 0,
    bonus: 0,
    other: 1_000_000,
    crypto: 0,
  })
  .setGeneralInfo({
    sso: 0,
    houseInterest: 0,
    socialEnterprise: 0,
    shopDeeMeeKuen: 0,
  })
  .setFamily({
    status: FamilyStatus.SINGLE,
    noOfChildren: 0,
    noOfParents: 0,
    noOfSpouses: 0,
    noOfRelatedHandicaps: 0,
    noOfNonRelatedHandicaps: 0,
  })
  .setInsurance({
    life: 0,
    health: 0,
    parent: 0,
    spouse: 0,
    annuity: 0,
  })
  .setFund({
    pvd: 0,
    ssf: 200_000,
    rmf: 300_000,
    gpf: 0,
    nsf: 0,
    pvt: 0,
  })
  .setDonation({
    special: 1000,
    other: 0,
  });

console.log(thaiTax.summarize());
