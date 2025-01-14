export interface TicketsSliceState {
  searchId: string;
  status: Status;
  tickets: Ticket[];
  loadedTickets: Ticket[];
  stop: boolean;
  startSlice: number;
  error: null | string;
  activeSort: null | string;
  activeFilters: Array<string>;
  filteredTicketsLoaded: boolean;
  isLoad: boolean;
  loadedCount: number;
  isFirstLoad: boolean;
  hasFetchedInitialData: boolean;
}

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type Ticket = {
  price: number;
  carrier: string;
  id?: string;
  segments: SegmentsType[];
};

export type SegmentsType = {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
};
