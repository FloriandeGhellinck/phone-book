import { SearchBar } from "@/components/searchField";
import { Typography } from "@/components/typography";
import { UsersTable } from "@/components/usercart";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between p-4 bg-primary-blue">
      <div className="flex items-center flex-col h-full w-full gap-y-12 pt-8">
        <Typography.h1>Phonebook</Typography.h1>

        <div className="h-full w-full sm:h-5/6 sm:w-5/6 lg:h-3/4 lg:w-3/4 bg-white rounded-2xl shadow-2xl gap-y-4 p-10 flex flex-col">
          <div className="flex justify-between w-full border-b-2 pb-2 flex-col sm:flex-row gap-y-2">
            <a
              href={"/new-entry"}
              className="border-black font-light bg-green-600 border-2 px-2 rounded-lg flex items-center justify-center sm:hover:pt-1 sm:hover:pb-3  "
            >
              Add new entry +
            </a>
            <SearchBar setSearchValue={setSearchValue} />
          </div>
          <UsersTable searchValue={searchValue} />
        </div>
      </div>
    </main>
  );
}
