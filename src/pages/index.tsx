import { SearchBar } from "@/components/searchField";
import { Typography } from "@/components/typography";
import { Usercart } from "@/components/usercart";
import includes from "lodash/includes";
import toLower from "lodash/toLower";
import filter from "lodash/filter";
import map from "lodash/map";
import { useState } from "react";
import replace from "lodash/replace";

export default function Home() {
  const usersToTest = [
    { id: "1aze3", firstName: "Gaston", lastName: "Lagaffe", phoneNumber: "+32 472 75 60 44" },
    { id: "1aze456", firstName: "benoit", lastName: "Brisefer", phoneNumber: "+32 472 75 60 44" },
    { id: "1aze654", firstName: "Schtroumpf", lastName: "Farceur", phoneNumber: "+32 472 75 60 44" },
  ];

  const [searchValue, setSearchValue] = useState<string | null>("");

  const usersFiltered = filter(usersToTest, (user) => {
    const formatedSearchValue = replace(toLower(searchValue as string), / /g, "");

    return (
      includes(replace(toLower(user.firstName), / /g, ""), formatedSearchValue) ||
      includes(replace(toLower(user.lastName), / /g, ""), formatedSearchValue) ||
      includes(replace(user.phoneNumber, / /g, ""), formatedSearchValue)
    );
  });

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between p-4 bg-primary-blue">
      <div className="flex items-center flex-col h-full w-full gap-y-12 pt-8">
        <Typography.h1>Phonebook</Typography.h1>

        <div className="h-full w-full sm:h-5/6 sm:w-5/6 lg:h-3/4 lg:w-3/4 bg-white rounded-2xl shadow-2xl gap-y-4 p-10 flex flex-col">
          <div className="flex justify-end w-full border-b-2 pb-2">
            <SearchBar setSearchValue={setSearchValue} />
          </div>
          <div className="flex items-center ">
            <ul className="">
              {map(usersFiltered, (eachUser: User) => {
                return (
                  <li key={eachUser.id}>
                    <Usercart user={eachUser} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
