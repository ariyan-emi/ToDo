import {ApiWeather} from "./Api";
import React, {useEffect, useState} from "react";
import "./Weather.css";
import {AlertBlock} from "./AlertBlock";
import { Condition, If, Else, ElseIf } from "../components/Service/condition";
import AirIcon from '@mui/icons-material/Air';
import moment from "moment/moment";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WeatherBlock from "./WeatherBlock";
export default function Weather() {
    const [state, setState] = useState({
        country: "",
        countryName: "",
        Time: "",
        temp: "",
        wind: "",
        humidity: "",
        icon: "",
        status: "",
        block: false
    })
    useEffect(() => {
        ApiWeather().then(response => {
            if (response) {
                state.country = response.location.country;
                state.countryName = response.location.name;
                state.Time = response.location.localtime;
                state.temp = response.current.temp_c;
                state.wind = response.current.wind_kph;
                state.humidity = response.current.humidity
                state.icon = response.current.condition.icon
                state.status = response.current.condition.text
                setState({...state})
            } else {
                state.block = true;
                setState({...state})
            }
        })
    }, [])

    return (
        <>
                         {(() => {
        if (!state.block) {
          return (
            <section className="weather-container">
                        <div className="container-top">
                            <div>
                                <h1 className="weather-title text-white">Today</h1>
                                <p className="paragraph" style={{color:"#6D28D9"}}>
                                    {moment(state.Time).format("h:mm a")}
                                </p>
                            </div>
                            <p className="font-bold" style={{color:"#6D28D9"}}>
                                {moment(state.Time).format("MMM Do YY")}
                            </p>
                        </div>
                        <div className="container-mid">
        <span className="weather-temp-main text-violet-700">
          <span className="weather-tepm text-slate-800">{state.temp}</span>°C
        </span>
                            <img
                                width="220"
                                height="220"
                                src={state.icon}
                                alt={`Icon of ${state.country} ${state.countryName}`}
                            />
                        </div>
                        <div className="container-bot">
                            <p className="paragraph winds">
                                <LocationOnIcon className="iconsWeather"/>{state.countryName}
                            </p>

                        </div>
                        <div className="container-bot">
                            <p className="paragraph winds">
                                <AcUnitIcon className="iconsWeather"/>{state.status}
                            </p>
                        </div>
                        <div className="container-bot">
                            <p className="paragraph winds">
                                <AirIcon className="iconsWeather"/> {state.wind}
                            </p>
                        </div>
                        <div className="container-bot">
                            <p className="paragraph winds">
                                <WaterDropIcon className="iconsWeather"/> {state.humidity}
                            </p>
                        </div>
                    </section>
          )
        } else {
          return (
           <WeatherBlock/>
          )
        }
      })()}
        </>
    )
}
