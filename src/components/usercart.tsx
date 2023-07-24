import { FC } from "react";

export const Usercart: FC<{ user?: User }> = ({ user }) => {
  return (
    <div>
      {user?.first_name} {user?.last_name} {user?.phone_number}
    </div>
  );
};
