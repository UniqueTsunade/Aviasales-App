export interface FilterSliceState {
  transfers: Transfers[];
}

export type Transfers = {
  value: string;
  label: string;
  checked: boolean;
};
