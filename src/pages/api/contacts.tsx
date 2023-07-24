import { fetchData } from "@/utils/fetch-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
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

    const variables = {
      searchValue: `%${searchValue}%`,
    };

    const response = await fetchData(usersQuery, variables);

    const data = await response.json();
    res.status(200).json(data.data.users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
