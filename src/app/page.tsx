import { Typography } from "@/components/typography";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between p-4 bg-[#1D5D9B]">
      <div className="flex items-center flex-col h-full w-full gap-y-12">
        <Typography.h1 className="">Phonebook</Typography.h1>

        <div className="h-full w-full sm:h-5/6 sm:w-5/6 lg:h-3/4 lg:w-3/4 bg-white rounded-2xl shadow-2xl gap-y-4 p-10 flex flex-col">
          <div className="flex justify-end w-full gap-x-4 border-b-2">
            <div> search logo </div>
            <div className="bg-red-500 text-right">search field</div>
          </div>
          <div className="flex items-center">
            <Typography.p>
              {" "}
              Duis occaecat tempor ipsum cillum labore ut dolor nisi adipisicing. Lorem duis ipsum id sint cillum id Lorem esse labore enim.
              Sunt aliquip ad ut ullamco commodo pariatur. Nisi enim tempor exercitation commodo voluptate anim dolor duis ad aute excepteur
              magna exercitation. Proident veniam id non ipsum. Elit ut in in veniam fugiat ullamco commodo est qui adipisicing occaecat.
              Magna eu cillum labore sunt sunt nostrud nostrud reprehenderit.
            </Typography.p>
          </div>
        </div>
      </div>
    </main>
  );
}
