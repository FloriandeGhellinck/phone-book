import { fetchData } from "@/utils/fetch-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { first_name, last_name, phone_number } = req.body;

    const insertNewContact = `
    mutation MyMutation($first_name: String, $last_name: String, $phone_number: String) {
        insert_users(objects: {first_name: $first_name, last_name: $last_name, phone_number: $phone_number}) {
          returning {
            first_name
            id
            last_name
            phone_number
          }
        }
      }
    `;

    const variables = {
      first_name,
      last_name,
      phone_number,
    };

    const response = await fetchData(insertNewContact, variables);
    const responseData = await response.json();

    if (response.ok) {
      res.status(200).json({ status: "success", data: responseData });
    } else {
      throw new Error("Something went wrong when inserting contact");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export default handler;
