import { fetchData } from "@/utils/fetch-data";
import { formatNumberForDB } from "@/utils/format-phone-number";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { first_name, last_name, phone_number, id } = req.body;

    const numberFormatedForDB = formatNumberForDB(phone_number);

    const editMutation = `mutation MyMutation($id: uuid!, $first_name: String!, $last_name: String!, $phone_number: String!) {
        update_users_by_pk(pk_columns: {id: $id}, _set: {first_name: $first_name, last_name: $last_name, phone_number: $phone_number}) {
          first_name
          last_name
          phone_number
          id
        }
      }
      `;

    const variables = {
      first_name,
      last_name,
      phone_number: numberFormatedForDB,
      id,
    };

    const response = await fetchData(editMutation, variables);
    const responseData = await response.json();

    if (response.ok) {
      res.status(200).json({ status: "success", data: responseData });
    } else {
      throw new Error("Something went wrong when editing contact");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export default handler;
