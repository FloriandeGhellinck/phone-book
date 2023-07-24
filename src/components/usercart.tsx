import { map } from "lodash";
import { FC } from "react";
import { Typography } from "./typography";
import { GarbageSVG } from "@/assets/garbage";
import { SearchSVG } from "@/assets/search";
import { PenSVG } from "@/assets/pen";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";

export const UsersTable: FC<{ searchValue: string }> = ({ searchValue }) => {
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
    <div className="flex items-center overflow-scroll">
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-1/4 text-left pl-1 pr-4">
              <Typography.p>Firstname</Typography.p>
            </th>
            <th className="w-1/4 text-left pr-4">
              <Typography.p>Lastname</Typography.p>
            </th>
            <th className="w-1/4 text-left pr-4">
              <Typography.p>Phonenumber</Typography.p>
            </th>
            <th className="w-1/4 text-right pr-3">
              <Typography.p>Actions</Typography.p>
            </th>
          </tr>
        </thead>
        <tbody className="border-2 border-primary-blue">
          {usersQuery.isLoading ? (
            <tr>
              <td>
                <Typography.h2> Loading</Typography.h2>
              </td>
            </tr>
          ) : (
            map(fetchedUsers, (eachUser: User) => (
              <tr key={eachUser.id} className="border border-primary-blue border-dashed">
                <td className="w-1/4 text-left pl-1 py-2 pr-4">
                  <Typography.p className="font-extralight">{eachUser.first_name}</Typography.p>
                </td>
                <td className="w-1/4 text-left py-2 pr-4">
                  <Typography.p className="font-extralight whitespace-nowrap">{eachUser.last_name}</Typography.p>
                </td>
                <td className="w-1/4 text-left whitespace-nowrap py-2 pr-4">
                  <Typography.p className="font-extralight">{eachUser.phone_number}</Typography.p>
                </td>
                <td className="text-right pr-3 w-full py-2">
                  <div className="flex justify-end gap-x-2">
                    <PenSVG className="fill-primary-blue h-4 w-4" />
                    <GarbageSVG className="fill-red-500 h-4 w-4" />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
