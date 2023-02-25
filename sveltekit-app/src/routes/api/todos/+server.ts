import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { Base } from "deta";

export const GET = (async () => {
  // Connect to a Base for storing todo items.
  const todos_base = Base("todos");
  // Fetch all items from the Base.
  const todos = await todos_base.fetch();
  // Return the items as JSON.
  return json(todos.items);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
  // Connect to a Base for storing todo items.
  const todos_base = Base("todos");
  // Get the item from the request body.
  const item = await request.json();
  // Put the item into the Base.
  const resp = await todos_base.put(item);
  // Return the response as JSON.
  return json(resp);
}) satisfies RequestHandler;
