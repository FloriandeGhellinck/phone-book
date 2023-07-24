import { FC, ReactNode } from "react";
import { Typography } from "./typography";

export const PageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between p-4 bg-primary-blue">
      <div className="flex items-center flex-col h-full w-full gap-y-12 pt-8">
        <Typography.h1>Phonebook</Typography.h1>
        {children}
      </div>
    </main>
  );
};
