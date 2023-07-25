import { HomepageButton } from "@/components/homepage-button";
import { PageLayout } from "@/components/page-layout";
import { Typography } from "@/components/typography";
import { formatNumberForContactTable } from "@/utils/format-phone-number";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UseMutationResult, useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

const EditContactPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUser>();

  const userQuery = useQuery<User, Error>(["userQuery", id], async () => {
    const response: AxiosResponse = await axios.get("/api/contact", {
      params: {
        id,
      },
    });

    return response.data.data;
  });

  const fetchedUser = userQuery?.data;

  useEffect(() => {
    if (fetchedUser) {
      setValue("first_name", fetchedUser.first_name);
      setValue("last_name", fetchedUser.last_name);
      setValue("phone_number", formatNumberForContactTable(fetchedUser.phone_number));
    }
  }, [fetchedUser, setValue]);

  const editContact: UseMutationResult<User> = useMutation((editedContact) => axios.post("/api/edit-contact", editedContact), {
    onSuccess: () => {
      toast.success("Succesfully edited!");
      router.push("/");
    },
  });

  const onSubmit = (values: CreateUser) => {
    const contactWithId = { ...values, id };
    editContact.mutate(contactWithId);
  };
  return (
    <PageLayout>
      <div className="h-4/6 sm:h-4/6 sm:w-5/6 lg:w-3/4 bg-white rounded-2xl shadow-2xl gap-y-4 p-10 flex flex-col items-center">
        <HomepageButton />
        <Typography.h2>Edit contact</Typography.h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <div>
              <input
                {...register("first_name", {
                  required: "Firstname required",
                })}
                placeholder="First name"
                className="border-2 border-black rounded-lg w-full sm:w-80 pl-1 py-2 focus:outline-none shadow-md"
              />
              <Typography.p className="font-light text-red-500">{errors.first_name?.message as String}</Typography.p>
            </div>
            <div>
              <input
                {...register("last_name", {
                  required: "Lastname required",
                })}
                placeholder="Last name"
                className="border-2 border-black rounded-lg w-full sm:w-80 pl-1 py-2 focus:outline-none shadow-md"
              />
              <Typography.p className="font-light text-red-500">{errors.last_name?.message as String}</Typography.p>
            </div>
            <div>
              <input
                {...register("phone_number", {
                  required: "Phone number required",
                  pattern: {
                    value: /^\+\d+\s\d+\s\d{6,}$/,
                    message: "Invalid format! Try: +32 472 756044",
                  },
                })}
                placeholder="+32 472 456123"
                className="border-2 border-black rounded-lg w-full sm:w-80 pl-1 focus:outline-none shadow-md py-2"
              />
              <Typography.p className="font-light text-red-500">{errors.phone_number?.message as String}</Typography.p>
            </div>
            <div className="flex gap-x-4 justify-center">
              <button
                type="submit"
                className="border-2 border-black bg-green-600 py-2 px-2 hover:pt-1 hover:pb-3 rounded-lg shadow-2xl shadow-black"
                disabled={editContact.isLoading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default EditContactPage;
