import React from "react";
import { IoSearch } from "react-icons/io5";
import { cn } from "@/utils/cn";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  placeholder?: string;
};

export default function SearchBox({
  className,
  value,
  onChange,
  onSubmit,
  placeholder,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex items-center bg-white rounded-full px-8 py-4 shadow-lg border border-gray-300 focus-within:border-blue-500 transition-all hover:shadow-xl",
        className
      )}
    >
      <IoSearch className="text-gray-500 text-3xl mr-4" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Search..."}
        className="flex-1 bg-transparent outline-none text-gray-800 text-xl font-medium"
      />
    </form>
  );
}
