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
           Helloosdsdsfsdfsd

        </>
    )
}
