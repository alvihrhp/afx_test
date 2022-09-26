import React, { useState, useEffect, useMemo } from "react";
/** Material UI */
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
/** CSS */
import "./App.css";
/** Google Map */
import GoogleMapReact from "google-map-react";
/** Ddebounce */
import debounce from "lodash.debounce";
/** React Redux */
import { useDispatch, useSelector } from "react-redux";
/** Action */
import { fetchSearch } from "./store/maps/action";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const gmApiKey = process.env.REACT_APP_GOOGLE_MAP_KEY
    ? process.env.REACT_APP_GOOGLE_MAP_KEY
    : "";

  const gmDefaultProps = {
    center: {
      lat: 35.662,
      lng: 139.7038,
    },
    zoom: 11,
  };

  const { loadingSearch, searchPlaces: resultSearchPlaces } = useSelector(
    (state: any) => state.mapsState
  );

  const [placeInput, setPlaceInput] = useState<string>("");

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: -3.745,
    lng: -38.523,
  });

  const [googleMaps, setGoogleMaps] = useState<{ map: any; maps: any }>({
    map: null,
    maps: null,
  });

  const [confirmSearch, setConfirmSearch] = useState<boolean>(false);

  const [showResults, setShowResults] = useState<boolean>(false);

  const searchPlaces = async () => {
    try {
      setConfirmSearch(false);
      dispatch(fetchSearch({ ...googleMaps, placeInput }));
    } catch (error) {
      console.log(error);
    }
  };

  const centerPlace = (location: { [key: string]: any }) => {
    const { lat, lng } = location;

    const resultLat = String(lat()).slice(0, 6);
    const resultLng = String(lng()).slice(0, 7);

    setCenter({
      lat: Number(resultLat),
      lng: Number(resultLng),
    });

    setShowResults(false);
  };

  const triggerSearch = useMemo(() => {
    return debounce(() => {
      setConfirmSearch(true);
    }, 1500);
  }, []);

  useEffect(() => {
    if (confirmSearch) {
      searchPlaces();
    }
  }, [confirmSearch]);

  useEffect(() => {
    if (resultSearchPlaces.length > 0) {
      setShowResults(true);
    }
  }, [resultSearchPlaces]);

  return (
    <>
      <CssBaseline />
      <Container className="container">
        <div className="form-container">
          <Card className="card">
            <FormControl fullWidth sx={{ m: 1 }} className="form-control">
              <InputLabel
                htmlFor="outlined-adornment-amount"
                placeholder="Search Places"
              >
                Search
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={placeInput}
                onChange={(e) => setPlaceInput(e.target.value)}
                onKeyUp={(e) => triggerSearch()}
                startAdornment={
                  <InputAdornment position="start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="search-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
          </Card>
          {resultSearchPlaces.length > 0 && showResults && (
            <div className="absolute">
              {resultSearchPlaces.map(
                (place: { [key: string]: any }, placeIdx: number) => (
                  <Card className="card" key={placeIdx}>
                    <div
                      className="search-place-result"
                      onClick={(e) => {
                        centerPlace(place.geometry.location);
                      }}
                    >
                      <div className="icon-place-container">
                        <img src={place.icon} className="icon-place" />
                      </div>
                      <div className="search-place-detail">
                        <h3>{place.name}</h3>
                        <div className="border"></div>
                        <span>{place.formatted_address}</span>
                      </div>
                    </div>
                  </Card>
                )
              )}
            </div>
          )}
        </div>
        <Card className="card seperator">
          <div className="maps-container">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: gmApiKey,
                libraries: ["places"],
              }}
              center={center}
              defaultCenter={gmDefaultProps.center}
              defaultZoom={gmDefaultProps.zoom}
              onGoogleApiLoaded={({ map, maps }) => {
                setGoogleMaps({ map, maps });
              }}
              yesIWantToUseGoogleMapApiInternals
              options={{
                fullscreenControl: false,
              }}
            >
              {/* {!loading && taps.length
                ? taps.map((tap) => (
                    <Marker
                      key={tap.id}
                      lat={tap.latitude}
                      lng={tap.longitude}
                      category={tap.category_id}
                      tap={tap}
                    />
                  ))
                : null} */}
            </GoogleMapReact>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default App;
