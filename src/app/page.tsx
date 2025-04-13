/** @format */
"use client";

import Container from "@/components/container";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcons";
import { convertKelvinToCelsius } from "@/utils/convertkelvinToCelsius";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { metersToKilometers } from "@/utils/metersToKilometers";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { loadingCityAtom, placeAtom } from "./atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { getCurrentTheme } from "@/utils/getTheme";
import { themeStyles } from "@/utils/themeStyles";
import { LuLoaderCircle } from "react-icons/lu";

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {

  const theme = getCurrentTheme();
  const styles = themeStyles[theme];
  const { text } = themeStyles[theme]; 
  const [place] = useAtom(placeAtom);
  const setPlace = useAtom(placeAtom)[1];
  const [loadingCity] = useAtom(loadingCityAtom);
  const URL =`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`


  const { isLoading, error, data, refetch } = useQuery<WeatherData, Error>({
    queryKey: ["weatherData", place],
    queryFn: async () => {
      const { data } = await axios.get(
        URL,
        {
          params: {
            q: place,
            appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
            cnt: 56,
          },
        }
      );
      return data;
    },
  });
  

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const firstData = data?.list[0];

  const uniqueDates = [
    ...new Set(
      data?.list.map((entry: WeatherDetail) =>
        new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const dates = uniqueDates || new Array(7).fill(0);

  const firstDataForEachDate = dates
    .map((date) =>
      data?.list.find((entry: WeatherDetail) => {
        const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
        const entryHour = new Date(entry.dt * 1000).getHours();
        return entryDate === date && entryHour >= 6;
      })
    )
    .filter(Boolean) as WeatherDetail[];

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center min-h-screen justify-center">
  //       <p className="animate-bounce">Loading...</p>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="text-red-400">
          {(error as Error).message || "Something went wrong."}
        </p>
      </div>
    );
  }



  return (
    <div className={`flex flex-col gap-4 min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white ${styles.background}`}>
      <Navbar location={data?.city.name ?? ""} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">

          <>
            <section className="space-y-6">
              <div className="space-y-4">
                <h2 className="flex gap-2 text-2xl font-bold items-end text-white/90">
                  <p>
                    {firstData?.dt_txt
                      ? format(parseISO(firstData.dt_txt), "EEEE")
                      : ""}
                  </p>
                  <p className="text-lg text-white/60">
                    ({firstData?.dt_txt
                      ? format(parseISO(firstData.dt_txt), "dd.MM.yyyy")
                      : ""}
                    )
                  </p>
                </h2>
  
                <Container className="flex flex-col md:flex-row gap-10 px-6 items-center justify-between">
                  <div className="flex flex-col items-center md:items-start px-4">
                    <span className="text-5xl font-bold">
                      {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                    </span>
                    <p className="text-sm text-white/70 whitespace-nowrap">
                      Feels like {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                    </p>
                    <p className="text-sm text-white/70">
                      {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓{" "}
                      {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                    </p>
                  </div>
  
                  <div className="flex gap-8 overflow-x-auto w-full justify-between pr-3 text-white">
                    {data?.list.map((d: WeatherDetail, i: number) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center gap-2 text-xs font-semibold min-w-[60px]`}
                      >
                        <p>{format(parseISO(d.dt_txt), "h:mm a")}</p>
                        <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />
                        <p>{convertKelvinToCelsius(d.main.temp)}°</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
  
              <div className="flex flex-col lg:flex-row gap-4">
                <Container className="w-full md:w-fit justify-center flex-col px-4 items-center text-white text-sm">
                  <p className="capitalize text-center mb-2">
                    {firstData?.weather[0].description}
                  </p>
                  <WeatherIcon iconName={getDayOrNightIcon(firstData?.weather[0].icon ?? "", firstData?.dt_txt ?? "")} />
                </Container>
  
                <Container className="flex flex-wrap gap-4 px-6 justify-between items-center w-full text-white">
                  <WeatherDetails
                    visability={metersToKilometers(firstData?.visibility ?? 10000)}
                    airPressure={`${firstData?.main.pressure ?? "N/A"} hPa`}
                    humidity={`${firstData?.main.humidity ?? "N/A"}%`}
                    sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "H:mm")}
                    sunset={format(fromUnixTime(data?.city.sunset ?? 0), "H:mm")}
                    windSpeed={convertWindSpeed(firstData?.wind.speed ?? 0)}
                  />
                </Container>
              </div>
            </section>
  
            <section className="flex flex-col gap-6">
              <p className="text-2xl font-bold text-white">Forecast (7 days)</p>
              {firstDataForEachDate.map((d: WeatherDetail, i) => (
                <ForecastWeatherDetail
                  key={i}
                  description={d.weather[0].description}
                  weatehrIcon={d.weather[0].icon}
                  date={format(parseISO(d.dt_txt), "dd.MM")}
                  day={format(parseISO(d.dt_txt), "EEEE")}
                  feels_like={d.main.feels_like}
                  temp={d.main.temp}
                  temp_max={d.main.temp_max}
                  temp_min={d.main.temp_min}
                  airPressure={`${d.main.pressure} hPa`}
                  humidity={`${d.main.humidity}%`}
                  sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "H:mm")}
                  sunset={format(fromUnixTime(data?.city.sunset ?? 0), "H:mm")}
                  visability={`${metersToKilometers(d.visibility)} km`}
                  windSpeed={convertWindSpeed(d.wind.speed)}
                />
              ))}
            </section>
          </>
      </main>
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen  w-full h-full bg-black/50 z-50" style={{ position: "fixed", top: 0, left: 0 }}>
          <div className="absolute inset-0 bg-black/50"></div>
         
          <LuLoaderCircle className="animate-spin text-4xl text-white" />
          <p className="text-white ml-2">Loading...</p>
        </div>
      )}
    </div>
  );
  
}
function WeatherSkeleton() {
  return (
    <section className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="flex gap-2 text-2xl items-end">
          <div className="h-6 w-24 rounded bg-white/10 backdrop-blur-sm border border-white/20"></div>
          <div className="h-6 w-24 rounded bg-white/10 backdrop-blur-sm border border-white/20"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="h-6 w-16 rounded bg-white/10 backdrop-blur-sm border border-white/20"></div>
              <div className="h-6 w-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"></div>
              <div className="h-6 w-16 rounded bg-white/10 backdrop-blur-sm border border-white/20"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-2xl h-8 w-36 rounded bg-white/10 backdrop-blur-sm border border-white/20"></div>
        {[...Array(7)].map((_, i) => (
          <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-8 w-28 rounded bg-white/10 backdrop-blur-sm border border-white/20"></div>
            <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"></div>
            <div className="h-8 w-28 rounded bg-white/10 backdrop-blur-sm border border-white/20"></div>
            <div className="h-8 w-28 rounded bg-white/10 backdrop-blur-sm border border-white/20"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

