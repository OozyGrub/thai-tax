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
    etc: 0,
    wht: 0,
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
    life: 100_000,
    health: 0,
    parent: 0,
    retire: 0,
  })
  .setFund({
    pvd: 0,
    ssf: 200_000,
    rmf: 100_000,
    gpf: 0,
    nsf: 0,
    pvt: 0,
  })
  .setDonation({
    special: 0,
    other: 0,
  });

console.log(thaiTax.summarize());
