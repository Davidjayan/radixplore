import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Slide,
  styled,
  Switch,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import celcius from "../../assets/w.png";
import farenheit from "../../assets/farenheit.jpg";
import { capitalizeFirstLetter, getFormattedResult } from "../../helpers/utils";
const getIcon = (variant: string) => {
  return `http://openweathermap.org/img/w/${variant}.png`;
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        // content:'"C"'
        backgroundImage: `url('${celcius}')`,
        backgroundSize: "cover", // Adjust as necessary
        backgroundPosition: "center",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url(${farenheit})`,
      borderRadius: 50,
      //   backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
      //     "#fff"
      //   )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export const OpenWeatherModal = forwardRef((props, ref) => {
  const [data, setData] = useState<any>();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<any>();
  const [unitType, setUnitType] = useState<"CELCIUS" | "FARENHEIT">("CELCIUS");

  useEffect(() => {

    if (position) {
      (async () => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            position?.[0]
          }&lon=${position?.[1]}&appid=${
            import.meta.env.VITE_OPENWEATHER_API_KEY
          }`
        ).then((res) => res.json());
        setData(res);
        console.log("ASLDJHKJSD:::", res);
      })();
    }
  }, [position]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({ handleClose, handleOpen, setPosition }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        width: "100%",
        height: "100%",
        outline: "none",
      }}
    >
      <Slide in={open} direction="left">
        <Box
          sx={{
            bgcolor: "background.paper",
            outline: "none",
            width: "50%",
            marginLeft: "auto",
            height: "100%",
            boxShadow: 24,
            p: 4,
            display:"flex",
            flexDirection:"column",
            gap:5,
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", right: 10, top: 10 }}
            onClick={handleClose}
          >
            <CancelOutlinedIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FmdGoodIcon color="primary" />
              <p style={{ fontSize: "14" }}>Place:</p>
              <p
                style={{
                  fontSize: "16",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                {data?.name}
              </p>
            </Typography>
            <FormControlLabel
              checked={unitType == "CELCIUS"}
              onChange={(e, c) => {
                if (c) {
                  setUnitType("CELCIUS");
                } else {
                  setUnitType("FARENHEIT");
                }
              }}
              control={<MaterialUISwitch />}
              label={capitalizeFirstLetter(unitType)}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5">Weather</Typography>
              <Grid
                container
                columns={2}
                sx={{ display: "flex", flexDirection: "row", mx: 2, my: 1 }}
              >
                <Grid item md={1}>
                  <Typography>
                    Temperature:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {getFormattedResult(unitType, data?.main?.temp)}
                    </span>
                  </Typography>
                  <Typography>
                    Feel's like:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {getFormattedResult(unitType, data?.main?.feels_like)}
                    </span>
                  </Typography>
                  <Typography>
                    Humidity:
                    <span style={{ fontWeight: "bold" }}>
                      {data?.main?.humidity}
                    </span>
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography>
                    Minimum temperature:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {getFormattedResult(unitType, data?.main?.temp_min)}
                    </span>
                  </Typography>
                  <Typography>
                    Maximum temperature:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {getFormattedResult(unitType, data?.main?.temp_max)}
                    </span>
                  </Typography>
                  <Typography>
                    Pressure:
                    <span style={{ fontWeight: "bold" }}>
                      {data?.main?.pressure}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5">Today's conditions</Typography>

            <Grid container columns={2} my={1}>
              {data?.weather?.map((value: any, idx: number) => (
                <Grid item md={1} px={2} key={idx}>
                  <Card sx={{ flexDirection: "row", display: "flex" }}>
                    <img src={getIcon(value.icon)} alt={value.icon} />
                    <Box sx={{ flexDirection: "column", display: "flex" }}>
                      <Typography>
                        Main:
                        <span style={{ fontWeight: "bold" }}>{value.main}</span>
                      </Typography>

                      <Typography>
                        Description:
                        <span style={{ fontWeight: "bold" }}>
                          {value.description}
                        </span>
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, my: 1 }}>
            <Typography>
              Sunrise at:{" "}
              <span style={{ fontWeight: "bold" }}>
                {moment(new Date(data?.sys?.sunrise * 1000)).format(
                  "hh:mm:ss A"
                )}
              </span>
            </Typography>
            <Typography>
              Sunset at:{" "}
              <span style={{ fontWeight: "bold" }}>
                {moment(new Date(data?.sys?.sunset * 1000)).format(
                  "hh:mm:ss A"
                )}
              </span>
            </Typography>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
});
