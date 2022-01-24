import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

type WeatherData = {
    properties: {
        timeseries: [
            {
                time: string, data: {
                    instant: {
                        details: {
                            // eslint-disable-next-line camelcase
                            air_temperature: number,
                            // eslint-disable-next-line camelcase
                            relative_humidity: number
                        }
                    }
                }
            }
        ]
    }
}

type FormDataType = {
    latitude: string
    longitude: string
}

const WeatherForecast = () => {
  const [form, setForm] = useState<FormDataType>({
    latitude: '',
    longitude: '',
  });
  const [latitudeError, setLatitudeError] = useState(false);
  const [longitudeError, setLongitudeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const validateLatitude = () => {
    const isValid = (!!form.latitude && (+form.latitude >= -90 && +form.latitude <= 90));
    setLatitudeError(!isValid);
    return isValid;
  };
  const validateLongitude = () => {
    const isValid = (!!form.longitude && (+form.longitude >= -180 && +form.longitude <= 180));
    setLongitudeError(!isValid);
    return isValid;
  };

  const formValidation = () => {
    const latitudeValid = (!!form.latitude && (+form.latitude >= -90 && +form.latitude <= 90));
    const longitudeValid = (!!form.longitude && (+form.longitude >= -180 && +form.longitude <= 180));

    setLatitudeError(!latitudeValid);
    setLongitudeError(!longitudeValid);

    return longitudeValid && latitudeValid;
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (formValidation()) {
      setLoading(true);
      const url = 'https://8l526ngysb.execute-api.eu-west-1.amazonaws.com/';
      const weatherResponse = axios
        .get(`${url}/?lat=${form.latitude}&lon=${form.longitude}`);
      weatherResponse
        .then(({ data }) => {
          setWeatherData(data);
        })
        .catch(() => {
          alert('Error receiving weather data');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="section">
      <h1 className="section-title">Weather Forecast</h1>
      <div className="container">
        <form className="form" onSubmit={submitHandler} noValidate autoComplete="off">
          <div className="input-wrapper">
            <TextField
              value={form.latitude}
              onChange={(e) => setForm({ ...form, latitude: e.target.value })}
              onBlur={() => validateLatitude()}
              id="standard-basic"
              label="Latitude"
              variant="standard"
              fullWidth
              required
              error={latitudeError}
              helperText={latitudeError ? 'Please enter a value >= -90 and <= 90' : undefined}
            />
            <TextField
              value={form.longitude}
              onChange={(e) => setForm({ ...form, longitude: e.target.value })}
              onBlur={() => validateLongitude()}
              id="standard-basic"
              label="Longitude"
              variant="standard"
              fullWidth
              required
              error={longitudeError}
              helperText={longitudeError ? 'Please enter a value >= -180 and <= 180' : undefined}
            />
          </div>
          <Button type="submit" variant="contained" fullWidth>Contained</Button>
        </form>
        <div className="data">

          <table className="table">
            <thead className="thead">
              <tr className="thead-tr">
                <th>Time</th>
                <th>Temperature</th>
                <th>Humidity</th>
              </tr>
            </thead>

            <tbody className="tbody">
              {/* // @ts-ignore */}
              {weatherData ? (weatherData.properties.timeseries.map((item) => (
                <tr className="tr" key={item.time.toString()}>
                  <th>{item.time.slice(14, 19)}</th>
                  <th>{`${item.data.instant.details.air_temperature} °C`}</th>
                  <th>{`${item.data.instant.details.relative_humidity} %`}</th>
                </tr>
              ))) : null}

            </tbody>
          </table>

          {loading
            ? (
              <div className="loading">
                <CircularProgress />
              </div>
            )
            : null}

        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
