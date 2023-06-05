import fs from "fs";
import express from "express";
import { Base } from "deta";

const app = express();
const port = parseInt(process.env.PORT) || 8080;

// Connect to a Base for storing todo items.
const todos_base = Base("todos");

app.use(express.json());

app.get("/", async (request, response) => {
  response.send(fs.readFileSync("./static/index.html", "utf8"));
});

app.get("/api/todos", async (request, response) => {
  // Fetch all items from the Base.
  const todos = await todos_base.fetch();
  // Return the items as JSON.
  response.send(todos.items);
});

app.post("/api/todos", async (request, response) => {
  // Get the item from the request body.
  const item = request.body;
  // Put the item into the Base.
  const resp = await todos_base.put(item);
  // Return the response as JSON.
  response.send(resp);
});

app.post("/actions/list", async (request, response) => {
  const todos = await todos_base.fetch();
  response.json({
    items: todos.items,
  });
});

app.get("/__space/actions", async (request, response) => {
  response.json({
    actions: [
      {
        name: "list",
        title: "List todos",
        path: "/actions/list",
      },
      {
        name: "add",
        title: "Add todo",
        path: "/api/todos",
        input: [
          {
            name: "text",
            type: "string",
          },
        ],
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
