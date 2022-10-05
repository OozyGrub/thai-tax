import { TaxMetaDataMap } from "../types/types";
import policy2565 from "./2565/policy";
import taxTable2565 from "./2565/taxTable";

const taxMetaDataMap: TaxMetaDataMap = {
  2565: {
    policy: policy2565,
    taxTable: taxTable2565,
  },
};

export default taxMetaDataMap;
