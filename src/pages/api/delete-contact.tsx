import { fetchData } from "@/utils/fetch-data";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.body;

    const deleteContact = `
      mutation MyMutation($id: uuid) {
        delete_users(where: {id: {_eq: $id}}) {
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
      id: userId,
    };

    const response = await fetchData(deleteContact, variables);
    const responseData = await response.json();

    if (response.ok) {
      res.status(200).json({ status: "success", data: responseData });
    } else {
      throw new Error("Something went wrong when deleting contact");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export default handler;
