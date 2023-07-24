export const fetchData = async (query: string, variables: object) => {
  const response = await fetch(`${process.env.HASURA_GRAPHQL_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return response;
};
