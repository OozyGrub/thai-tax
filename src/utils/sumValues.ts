import { sum, values } from "lodash";

export const sumValues = (obj: any) => sum(values(obj));
