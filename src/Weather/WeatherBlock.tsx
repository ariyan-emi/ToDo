import {AlertBlock} from "./AlertBlock";
import DangerousIcon from "@mui/icons-material/Dangerous";
import React, {useEffect, useState} from "react";
import { Condition, If } from "../components/Service/condition";

export default function WeatherBlock() {

    const AlertShow = localStorage.getItem('Alert')
    return (
        <div>
            <If condition={AlertShow != `"Showed"`}>
                <AlertBlock/>
            </If>
            <section className="weather-container2 align-middle text-center ">
                <DangerousIcon className="DangerFont"/> <br/> <p>Can't Use This</p>
            </section>
        </div>
    )
}
