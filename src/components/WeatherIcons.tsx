import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";


type WeatherIconProps = React.HTMLAttributes<HTMLDivElement> & {
  iconName: string;
};

export default function WeatherIcon({ iconName, className, ...rest }: WeatherIconProps) {
  return (
    <div
      title={iconName}
      {...rest}
      className={cn("relative h-20 w-20", className)}
    >
      <Image
        width={100}
        height={100}
        alt="weather icon"
        src={`https://openweathermap.org/img/wn/${iconName}@2x.png`}
      />
    </div>
  );
}
