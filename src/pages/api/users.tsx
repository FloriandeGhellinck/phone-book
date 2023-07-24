import { NextApiRequest, NextApiResponse } from "next";

export default async function usersHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { searchValue } = req.query;

    const usersQuery = `query getUsers($searchValue: String) {
      users(order_by: {last_name: asc}, where: {
        _or: [
          { first_name: { _ilike: $searchValue } },
          { last_name: { _ilike: $searchValue } },
          { phone_number: { _ilike: $searchValue } }
        ]
      }) {
        id
        first_name
        last_name
        phone_number
      }
    }`;

    const response = await fetch(`${process.env.HASURA_GRAPHQL_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
      },
      body: JSON.stringify({
        query: usersQuery,
        variables: {
          searchValue: `%${searchValue}%`,
        },
      }),
    });

    const data = await response.json();
    res.status(200).json(data.data.users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
