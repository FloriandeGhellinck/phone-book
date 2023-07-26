import { SearchSVG } from "@/assets/search";
import replace from "lodash/replace";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

export const SearchBar: FC<{ setSearchValue?: Dispatch<SetStateAction<string>> }> = ({ setSearchValue }) => {
  const { register, watch } = useForm();

  const searchInput = watch("searchInput");
  const formatedSearchValue = replace(searchInput, / /g, "");

  useEffect(() => {
    if (setSearchValue) setSearchValue(formatedSearchValue);
  }, [formatedSearchValue, setSearchValue]);

  return (
    <form className="w-full md:w-1/3 sm:w-1/2">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center">
          <SearchSVG className="fill-primary-blue w-5 h-5" />
        </div>
        <input
          {...register("searchInput")}
          type="text"
          placeholder="Enter name or number.."
          className="w-full rounded-lg border-2 border-primary-blue text-black placeholder:text-gray-300 py-2 px-2 focus:outline-none "
        />
      </div>
    </form>
  );
};
