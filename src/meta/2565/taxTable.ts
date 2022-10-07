import { TaxTable } from "../../types/taxTable";

const taxTable: TaxTable = [
  { from: 0, to: 150_000, percent: 0 },
  { from: 150_000, to: 300_000, percent: 5 },
  { from: 300_000, to: 500_000, percent: 10 },
  { from: 500_000, to: 750_000, percent: 15 },
  { from: 750_000, to: 1_000_000, percent: 20 },
  { from: 1_000_000, to: 2_000_000, percent: 25 },
  { from: 2_000_000, to: 5_000_000, percent: 30 },
  { from: 5_000_000, to: Infinity, percent: 35 },
];

export default taxTable;
