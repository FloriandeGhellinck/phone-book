type User = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};
type UsersQuery = User[];

type CreateUser = Omit<User, "id">;
