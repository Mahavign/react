"use client";

import * as React from "react";
import SearchBox from "./SearchBox";
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import { useAtom } from "jotai";
import { placeAtom } from "@/app/atom";

type NavbarProps = {
  location: string | undefined;
};

export default function Navbar({ location }: NavbarProps) {
  const setPlace = useAtom(placeAtom)[1];
  const [value, setValue] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    setPlace(value.trim());
    setValue("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <nav className="sticky top-0 left-0 z-50 backdrop-blur-md bg-white/70 shadow-sm border-b border-gray-200">
      <div className="h-auto min-h-[80px] w-full max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <h2 className="text-gray-800 text-3xl font-bold">Weather</h2>
          <MdWbSunny className="text-3xl text-yellow-400" />
        </div>

        {/* Centered Big Search Box */}
        <div className="flex-1 flex justify-center w-full sm:w-auto order-last sm:order-none">
          <SearchBox
            className="w-full max-w-2xl"
            placeholder="Search location..."
            onChange={onChange}
            onSubmit={onSubmit}
            value={value}
          />
        </div>

        {/* Location Info */}
        <div className="flex items-center gap-4 text-sm text-gray-700 shrink-0">
          <button
            title="Use current location"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <MdMyLocation className="text-xl" />
          </button>
          <MdOutlineLocationOn className="text-xl" />
          <p className="max-w-[120px] truncate hidden sm:block">
            {location ?? "Unknown"}
          </p>
        </div>
      </div>
    </nav>
  );
}
