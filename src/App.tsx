import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { MapComponent } from "./components/MapComponent";
import { FormLabel, Grid, TextField } from "@mui/material";

function App() {
  const [latitude, setLatitude] = useState<string>();
  const [longitude, setLongitude] = useState<string>();
  const [lattitudeError, setLattitudeError] = useState(false);
  const [longitudeError, setLongitudeError] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("ASDJHSA::", );
          
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          console.log("ASDJHSA::", error);

          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Grid
        width={"100%"}
        container
        flexWrap={"nowrap"}
        direction={"column"}
        height={"90vh"}
        item
        justifyContent={"center"}
      >
        <Grid
          gap={5}
          position={"static"}
          top={0}
          left={0}
          // zIndex={99999}
          height={"10%"}
          bgcolor={"white"}
          container
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          direction={"row"}
        >
          <TextField
            label="Latitude"
            // InputLabelProps={{
            //   shrink: !!latitude,
            // }}
            error={lattitudeError}
            onChange={(e) => {
              const newValue = e.target.value;

              setLatitude(newValue);
              if (isNaN(parseFloat(newValue))) {
                setLattitudeError(true);
              } else {
                setLattitudeError(false);
              }
            }}
            value={latitude}
          />
          <TextField
            label="Longitude"
            // InputLabelProps={{
            //   shrink: !!longitude,
            // }}
            error={longitudeError}
            onChange={(e) => {
              const newValue = e.target.value;
              setLongitude(newValue);
              if (isNaN(parseFloat(newValue))) {
                setLongitudeError(true);
              } else {
                setLongitudeError(false);
              }
            }}
            value={longitude}
          />
        </Grid>

        <Grid
          borderRadius={20}
          sx={{ boxShadow: "1px 1px 1px #ccc", outline: "none" }}
          width={"100%"}
          height={"90%"}
        >
          <MapComponent
            position={
              latitude && longitude
                ? [Number(latitude), Number(longitude)]
                : undefined
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
