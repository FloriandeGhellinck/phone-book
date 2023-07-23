import { SearchBar } from "@/components/searchField";
import { Typography } from "@/components/typography";
import { Usercart } from "@/components/usercart";
import map from "lodash/map";

export default function Home() {
  const usersToTest = [
    { id: "1aze3", firstName: "Gaston", lastName: "Lagaffe", phoneNumber: "+32 472 75 60 44" },
    { id: "1aze456", firstName: "benoit", lastName: "Brisefer", phoneNumber: "+32 472 75 60 44" },
    { id: "1aze654", firstName: "Schtroumpf", lastName: "Farceur", phoneNumber: "+32 472 75 60 44" },
  ];

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between p-4 bg-[#1D5D9B]">
      <div className="flex items-center flex-col h-full w-full gap-y-12">
        <Typography.h1>Phonebook</Typography.h1>

        <div className="h-full w-full sm:h-5/6 sm:w-5/6 lg:h-3/4 lg:w-3/4 bg-white rounded-2xl shadow-2xl gap-y-4 p-10 flex flex-col">
          <div className="flex justify-end w-full gap-x-4 border-b-2">
            <SearchBar />
          </div>
          <div className="flex items-center ">
            <ul className="">
              {map(usersToTest, (eachUser: User) => {
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
