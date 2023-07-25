import { ChevronLeftSVG } from "@/assets/chevron-left";
import { PageLayout } from "@/components/page-layout";
import { Typography } from "@/components/typography";
import axios from "axios";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { UseMutationResult, useMutation } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewEntryPage: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUser>();

  const router = useRouter();

  const insertNewContact: UseMutationResult<CreateUser> = useMutation((newContact) => axios.post("/api/new-entry", newContact), {
    onSuccess: () => {
      toast.success("Nouveau contact enregistré.");
      router.push("/");
    },
  });

  const onSubmit = (data: CreateUser) => {
    insertNewContact.mutate(data);
  };

  return (
    <PageLayout>
      <div className="h-4/6 sm:h-4/6 sm:w-5/6 lg:w-3/4 bg-white rounded-2xl shadow-2xl gap-y-4 p-10 flex flex-col items-center">
        <a href={"/"} className="text-left w-full flex gap-x-1 items-center">
          <ChevronLeftSVG className="h-4 w-4" /> <Typography.p>Home page</Typography.p>
        </a>
        <Typography.h2>New entry</Typography.h2>
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
          <div className="flex gap-x-4 justify-between">
            <button
              type="submit"
              className="border-2 border-black bg-green-600 py-2 px-2 hover:pt-1 hover:pb-3 rounded-lg shadow-2xl shadow-black"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="border-2 border-black bg-red-300 py-2 px-2 rounded-lg hover:pt-1 hover:pb-3 shadow-2xl shadow-black"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default NewEntryPage;
