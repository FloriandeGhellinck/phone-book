import { ChevronLeftSVG } from "@/assets/chevron-left";
import { Typography } from "./typography";

export const HomepageButton = () => {
  return (
    <a href={"/"} className="text-left w-full flex gap-x-1 items-center">
      <ChevronLeftSVG className="h-4 w-4" /> <Typography.p>Home page</Typography.p>
    </a>
  );
};
