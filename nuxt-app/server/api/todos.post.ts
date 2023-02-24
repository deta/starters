import { Base } from "deta";

export default defineEventHandler(async (event) => {
  // Connect to a Base for storing todo items.
  const todos_base = Base("todos");
  // Get the item from the request body.
  const item = await readBody(event);
  // Put the item into the Base.
  const resp = await todos_base.put(item);
  // Return the response as JSON.
  return resp;
});
