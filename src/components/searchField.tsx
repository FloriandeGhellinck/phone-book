import { SearchSVG } from "@/assets/search";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

export const SearchBar: FC<{ setSearchValue?: Dispatch<SetStateAction<string | null>> }> = ({ setSearchValue }) => {
  const { register, watch } = useForm();

  const searchInput = watch("searchInput");

  useEffect(() => {
    if (setSearchValue) setSearchValue(searchInput);
  }, [searchInput, setSearchValue]);

  return (
    <form className="w-full md:w-1/2 lg:w-1/3">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center">
          <SearchSVG className="fill-primary-blue w-5 h-5 " />
        </div>
        <input
          {...register("searchInput")}
          type="text"
          placeholder="Enter name or number.."
          className="w-full rounded-lg border-2 border-primary-blue placeholder:text-gray-300 py-2 px-2 focus:outline-none "
        />
      </div>
    </form>
  );
};
