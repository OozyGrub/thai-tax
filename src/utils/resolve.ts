import { chain } from "lodash";
import { Criteria } from "../types/policy";

export const resolve = ({
  criteria,
  amount = Infinity,
  percentRef = Infinity,
}: {
  criteria: Criteria;
  amount?: number;
  percentRef?: number;
}) =>
  chain([
    (criteria.multiplier ?? 1) * amount,
    ((criteria.percent ?? Infinity) / 100) * percentRef,
    criteria.max ?? Infinity,
    criteria.min ?? Infinity,
  ])
    .min()
    .value();
