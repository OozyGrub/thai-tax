import { TaxTable } from "../../types/types";

const taxTable: TaxTable = [
  { from: 0, to: 15_000, percent: 0 },
  { from: 15_001, to: 300_000, percent: 0.05 },
  { from: 300_001, to: 500_000, percent: 0.1 },
  { from: 500_001, to: 750_000, percent: 0.15 },
  { from: 750_001, to: 1_000_000, percent: 0.2 },
  { from: 1_000_001, to: 2_000_000, percent: 0.25 },
  { from: 2_000_001, to: 5_000_000, percent: 0.3 },
  { from: 5_000_001, to: Infinity, percent: 0.35 },
];

export default taxTable;
