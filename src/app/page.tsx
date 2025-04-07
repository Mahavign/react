'use client';

import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type WeatherForecast = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastEntry[];
};

type ForecastEntry = {
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
};

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=7625447694764ea6c815d71898f61d93"
      );
      return data;
    },
  });
  

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-4">
        <h1 className="text-xl font-bold">Weather Forecast for Pune</h1>
        <pre className="bg-white p-4 mt-4 rounded-md shadow-sm overflow-x-auto">
          {/* {JSON.stringify(data, null, 2)} */}
        </pre>
      </div>
    </div>
  );
}
