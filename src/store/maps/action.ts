import { mapsActionType } from "./actionType";
/** Services */
import { mapsServices } from "../../services";

const setMapsSearchLoading = () => ({
  type: mapsActionType.FETCH_SEARCH_LOADING,
});

const setSearchPlaces = (data: { [key: string]: any }[]) => ({
  type: mapsActionType.FETCH_SEARCH,
  data,
});

export const fetchSearch =
  (params?: any, body?: any) => (dispatch: any, getState: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        await dispatch(setMapsSearchLoading());

        const { map, maps, placeInput } = params;

        const googleMapAPI = mapsServices(map, maps);

        googleMapAPI.search(placeInput, (response: any) => {
          resolve(dispatch(setSearchPlaces(response)));
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
