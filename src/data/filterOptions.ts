import { Transfers } from "../redux/filter/types";

const filterOptions: Omit<Transfers, "checked">[] = [
  { value: "all", label: "Все" },
  { value: "noTransfers", label: "Без пересадок" },
  { value: "oneTransfers", label: "1 пересадка" },
  { value: "twoTransfers", label: "2 пересадки" },
  { value: "threeTransfers", label: "3 пересадки" },
];

export default filterOptions;
