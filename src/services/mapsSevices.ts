import axios from "axios";

const googleMapsAPI = (map: any, maps: any) => {
  const autoCompleteService = new maps.places.AutocompleteService();
  const placeService = new maps.places.PlacesService(map);

  const search = (input: any, callback: any) => {
    autoCompleteService.getPlacePredictions(
      {
        input,
      },
      async (predictions: any) => {
        if (!predictions) {
          callback([]);
          return;
        }
        const places = [];
        for (let i = 0; i < predictions.length; i++) {
          const resultLookupPlace = await lookupPlace(predictions[i].place_id);
          places.push(resultLookupPlace);
        }
        callback(places);
      }
    );
  };

  const lookupPlace = (placeId: any) => {
    return new Promise((resolve, reject) => {
      placeService.getDetails(
        {
          placeId,
          fields: ["icon", "name", "formatted_address", "geometry.location"],
        },
        (detailPlace: any) => {
          resolve(detailPlace);
        }
      );
    });
  };

  return {
    map,
    maps,
    search,
    lookupPlace,
  };
};

export default googleMapsAPI;
