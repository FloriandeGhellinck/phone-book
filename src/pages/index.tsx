import { SearchBar } from "@/components/searchField";
import { Typography } from "@/components/typography";
import { Usercart } from "@/components/usercart";
import map from "lodash/map";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");

  const usersQuery = useQuery<usersQuery, Error>(["usersQuery", searchValue], async () => {
    const response: AxiosResponse<usersQuery> = await axios.get("/api/users", {
      params: {
        searchValue: searchValue || "",
      },
    });

    return response.data;
  });

  const fetchedUsers = usersQuery?.data;

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between p-4 bg-primary-blue">
      <div className="flex items-center flex-col h-full w-full gap-y-12 pt-8">
        <Typography.h1>Phonebook</Typography.h1>

        <div className="h-full w-full sm:h-5/6 sm:w-5/6 lg:h-3/4 lg:w-3/4 bg-white rounded-2xl shadow-2xl gap-y-4 p-10 flex flex-col">
          <div className="flex justify-end w-full border-b-2 pb-2">
            <SearchBar setSearchValue={setSearchValue} />
          </div>
          <div className="flex items-center ">
            {usersQuery.isLoading ? (
              //TODO: style loading + handle error/empty query
              <div>
                <Typography.h2> Loading</Typography.h2>
              </div>
            ) : (
              <ul>
                {map(fetchedUsers, (eachUser: User) => {
                  return (
                    <li key={eachUser?.id}>
                      <Usercart user={eachUser} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
