import { ChevronLeftSVG } from "@/assets/chevron-left";
import { Typography } from "./typography";
import Link from "next/link";

export const HomepageButton = () => {
  return (
    <Link href={"/"} className="text-left w-full flex gap-x-1 items-center">
      <ChevronLeftSVG className="h-4 w-4" /> <Typography.p>Home page</Typography.p>
    </Link>
  );
};
