import { Base } from "deta";

export default defineEventHandler(async (event) => {
  // Connect to a Base for storing todo items.
  const todos_base = Base("todos");
  // Fetch all items from the Base.
  const todos = await todos_base.fetch();
  // Return the items as JSON.
  return todos.items;
});
