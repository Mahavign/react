import * as React from 'react';
import { IoSearch } from "react-icons/io5";
import { cn } from "../utils/cn";

type Props = {
  className?: string;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  placeholder?: string;
};

export default function SearchBox({
  className,
  value,
  onChange,
  onSubmit,
  placeholder = "Search location",
}: Props) {
  return (
    <div className="px-1">
      <form
        className={cn("flex relative items-center justify-center h-10", className)}
        onSubmit={onSubmit}
      >
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="px-4 py-2 w-[230px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-full"
        />
        <button
          type="submit"
          className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full"
        >
          <IoSearch />
        </button>
      </form>
    </div>
  );
}
