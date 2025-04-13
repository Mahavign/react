/** @format */

import React from "react";
import Container from "./container";
import WeatherIcon from "./WeatherIcons";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import { convertKelvinToCelsius } from "@/utils/convertkelvinToCelsius";
import { getCurrentTheme } from "@/utils/getTheme";
import { themeStyles } from "@/utils/themeStyles";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatehrIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {
  const {
    weatehrIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;

  const theme = getCurrentTheme();
  const { text } = themeStyles[theme];

  return (
    <Container
      className={`flex flex-col md:flex-row items-stretch gap-6 rounded-2xl shadow-xl transition-all duration-500 border border-white/10 p-4 bg-white/10 backdrop-blur-lg ${text}`}
    >
      {/* Left Section */}
      <section className="flex gap-6 items-center min-w-[260px] md:min-w-[280px]">
        <div className="flex flex-col items-center space-y-1">
          <WeatherIcon iconName={weatehrIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>

        {/* Temperature & Description */}
        <div className="flex flex-col gap-1">
          <span className="text-5xl font-bold">
            {convertKelvinToCelsius(temp ?? 0)}°
          </span>
          <p className="text-xs">
            Feels like {convertKelvinToCelsius(feels_like ?? 0)}°
          </p>
          <p className="capitalize text-sm opacity-80">{description}</p>
        </div>
      </section>

      {/* Right Section */}

      <section className="flex-3 overflow-x-auto">
        <div className="flex-1 justify-between flex-wrap gap-20 w-full">
          <WeatherDetails {...props} />
        </div>
      </section>

    </Container>
  );
}

