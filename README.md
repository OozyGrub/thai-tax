# thai-personal-income-tax
Thai personal income tax utility functions.

### Background
Thai tax calculation has proven to be difficult. Instead of extensive words, it would be simpler as programming code.

### Usage
```ts

const thaiTax = new ThaiTax(2565)
  .setIncome({
    salary: 12 * 1_000_000,
    bonus: 1_000_000,
    other: 1_000_000,
  })
  .setGeneralInfo({
    sso: 0,
    houseInterest: 0,
    socialEnterprise: 0,
    shopDeeMeeKuen: 0,
  })
  .setFamily({
    status: FamilyStatus.SINGLE,
    noOfChildren: 1
  })
  .setInsurance({
    life: 100_000,
    health: 25_000,
  })
  .setFund({
    ssf: 200_000,
    rmf: 300_000,
  })
  .setDonation({
    special: 1000,
  })
  .summarize();

/**
 * { netIncome: 13208000, tax: 4137800 }
 **/

```

### TO-DO
- [ ] recheck logic
- [ ] add Thai documentations (reference would be good)
- [ ] add more and more tests
- [ ] add linter
- [ ] deply on npm
