"use client";
import * as React from 'react';
import SearchBox from './SearchBox';
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from "react-icons/md";

type props = {}

export default function Navbar({}: props) {
  const [value, setValue] = React.useState<string>('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Searching for:", value);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
     
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex items-center gap-2'>
          <h2 className='text-gray-500 text-3xl'>Weather</h2>
          <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
        </div>
        <div className='flex items-center gap-4'>
          <section className='flex gap-2 items-center'>
            <MdMyLocation className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer' />
            <MdOutlineLocationOn className='text-3xl' />
            <p className='text-slate-900/80 text-sm'>India</p>
          </section>
          <SearchBox
            className='w-[300px] h-10'
            placeholder='search location'
            onChange={onChange}
            onSubmit={onSubmit}
            value={value}
          />
        </div>
      </div>
    </nav>
  );
}
