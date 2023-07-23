import { NextApiRequest, NextApiResponse } from "next";

export default async function usersHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const usersQuery = `query {
      users {
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
      body: JSON.stringify({ query: usersQuery }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
