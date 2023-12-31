import { PageLayout } from "@/components/page-layout";
import { SearchBar } from "@/components/search-field";
import { ContactsTable } from "@/components/contacts";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <PageLayout>
      <div className="h-5/6 w-full sm:w-5/6 lg:h-3/4 lg:w-3/4 bg-white rounded-2xl shadow-2xl gap-y-4 p-10 flex flex-col">
        <div className="flex justify-between w-full border-b-2 pb-2 flex-col sm:flex-row gap-y-2">
          <Link
            href={"/new-entry"}
            className="border-black font-light bg-green-600 border-2 px-2 rounded-lg flex items-center justify-center sm:hover:pt-1 sm:hover:pb-3  "
          >
            Add new entry +
          </Link>
          <SearchBar setSearchValue={setSearchValue} />
        </div>
        <ContactsTable searchValue={searchValue} />
      </div>
    </PageLayout>
  );
}
