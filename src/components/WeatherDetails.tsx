"use client";

import React, { useEffect, useState } from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";
import { getCurrentTheme } from "@/utils/getTheme";
import { themeStyles } from "@/utils/themeStyles";

export interface WeatherDetailProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
  const {
    visability = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
    sunrise = "6:20",
    sunset = "18:48",
  } = props;

  const [textColor, setTextColor] = useState("text-white"); // default fallback

  useEffect(() => {
    const theme = getCurrentTheme(); // will only run on client
    const { text } = themeStyles[theme];
    setTextColor(text);
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-center gap-10 sm:gap-20 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-md">
      <SingleWeatherDetail
        icon={<LuEye />}
        information="Visibility"
        value={visability}
        text={textColor}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Humidity"
        value={humidity}
        text={textColor}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        information="Wind Speed"
        value={windSpeed}
        text={textColor}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        information="Air Pressure"
        value={airPressure}
        text={textColor}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information="Sunrise"
        value={sunrise}
        text={textColor}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information="Sunset"
        value={sunset}
        text={textColor}
      />
    </div>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
  text: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 text-xs font-semibold transition-transform hover:scale-110 ${props.text}`}
    >
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-2xl text-neutral-200">{props.icon}</div>
      <p>{props?.value || ""}</p>
    </div>
  );
}
