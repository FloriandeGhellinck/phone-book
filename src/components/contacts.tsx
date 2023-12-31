import { map } from "lodash";
import { FC } from "react";
import { Typography } from "./typography";
import { GarbageSVG } from "@/assets/garbage";
import { PenSVG } from "@/assets/pen";
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { PhoneFlipSVG } from "@/assets/phone-flip";
import { formatNumberForContactTable } from "@/utils/format-phone-number";
import { toast } from "react-toastify";
import Link from "next/link";

export const ContactsTable: FC<{ searchValue: string }> = ({ searchValue }) => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery<UsersQuery, Error>(["usersQuery", searchValue], async () => {
    const response: AxiosResponse<UsersQuery> = await axios.get("/api/contacts", {
      params: {
        searchValue: searchValue,
      },
    });

    return response.data;
  });

  const fetchedUsers = usersQuery?.data;

  const deleteContact: UseMutationResult = useMutation((userId) => axios.post("/api/delete-contact", { userId }), {
    onSuccess: () => {
      toast.success("Contact deleted");
      queryClient.invalidateQueries({ queryKey: ["usersQuery"] });
    },
    onError: () => {
      toast.error("Error deleting contact");
    },
  });

  const handleDeleteContact = (userId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete the contact ?");
    if (confirmDelete) {
      deleteContact.mutate(userId);
    } else {
      toast.error("Contact not deleted");
    }
  };

  return (
    <div className="overflow-scroll ">
      <table className="w-full overflow-scroll">
        <thead className="sticky top-0 ">
          <tr className="backdrop-blur-sm ">
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
          {/* BAD PRACTICE -- TODO -- Hack to avoid having the blur on the border of the tbody */}
          <tr>
            <td />
          </tr>
        </thead>
        <tbody className="border-2 border-primary-blue overflow-y-scroll">
          {usersQuery.isError && (
            <tr>
              <td>
                <Typography.h2> Error detected</Typography.h2>
              </td>
            </tr>
          )}
          {!usersQuery.isError && usersQuery.isLoading ? (
            <tr>
              <td>
                <Typography.h2> Loading</Typography.h2>
              </td>
            </tr>
          ) : (
            map(fetchedUsers, (user: User) => (
              <tr key={user.id} className="border border-primary-blue border-dashed">
                <td className="w-1/4 text-left pl-1 py-2 pr-4">
                  <Typography.p className="font-extralight">{user.first_name}</Typography.p>
                </td>
                <td className="w-1/4 text-left py-2 pr-4">
                  <Typography.p className="font-extralight whitespace-nowrap">{user.last_name}</Typography.p>
                </td>
                <td className="w-1/4 text-left whitespace-nowrap py-2 pr-4">
                  <Typography.p className="font-extralight">{formatNumberForContactTable(user.phone_number)}</Typography.p>
                </td>
                <td className="text-right pr-3 w-full py-2">
                  <div className="flex justify-end gap-x-2">
                    <Link href={`tel:${user.phone_number}`}>
                      <PhoneFlipSVG className="fill-green-500 h-4 w-4" />
                    </Link>
                    <Link href={`/contact/${user.id}/edit`}>
                      <PenSVG className="fill-primary-blue h-4 w-4" />
                    </Link>
                    <button onClick={() => handleDeleteContact(user?.id)}>
                      <GarbageSVG className="fill-red-500 h-4 w-4" />
                    </button>
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
