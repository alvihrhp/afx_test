import { mapsActionType } from "./actionType";

interface State {
  loadingSearch: boolean;
  searchPlaces: { [key: string]: any }[] | { [key: string]: any };
}

const initState: State = {
  loadingSearch: false,
  searchPlaces: [],
};

const setLoadingSearch = (state: State) => ({
  ...state,
  loadingSearch: true,
});

const setSearchPlaces = (state: State, data: any) => ({
  ...state,
  loadingSearch: false,
  searchPlaces: data,
});

const mapsRecuder = (state = initState, action: { [key: string]: any }) => {
  const { type, data } = action;

  switch (type) {
    case mapsActionType.FETCH_SEARCH_LOADING:
      return setLoadingSearch(state);
    case mapsActionType.FETCH_SEARCH:
      return setSearchPlaces(state, data);
    default:
      return state;
  }
};

export default mapsRecuder;
