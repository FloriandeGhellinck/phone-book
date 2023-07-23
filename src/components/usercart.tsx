import { FC } from "react";

export const Usercart: FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      {user.firstName} {user.lastName} {user.phoneNumber}
    </div>
  );
};
