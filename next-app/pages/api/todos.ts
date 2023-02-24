// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Base } from "deta";

export type TodoItem = {
  text: string;
  key: string;
};

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  // Connect to a Base for storing todo items.
  const todos_base = Base("todos");
  if (request.method === "GET") {
    // Fetch all items from the Base.
    const todos = await todos_base.fetch();
    // Return the items as JSON.
    response.status(200).json(todos.items);
  } else if (request.method === "POST") {
    // Get the item from the request body.
    const item = await request.body;
    // Put the item into the Base.
    const resp = await todos_base.put(item);
    // Return the response as JSON.
    response.status(201).json(resp);
  } else {
    response.status(405).end();
  }
}
