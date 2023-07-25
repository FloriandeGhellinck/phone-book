import { fetchData } from "@/utils/fetch-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { id } = req.query;

    const contactQuery = `query contactQuery($id: uuid!) {
        users_by_pk(id: $id) {
          id
          first_name
          last_name
          phone_number
        }
      }
      `;
    const variables = {
      id,
    };

    const response = await fetchData(contactQuery, variables);
    const data = await response.json();

    res.status(200).json({ status: "succes", data: data.data.users_by_pk });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
