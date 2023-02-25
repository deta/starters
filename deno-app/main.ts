import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { Deta } from "https://esm.sh/deta@1.1.0";
const deta = Deta(Deno.env.get("DETA_PROJECT_KEY")!);

const handler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  switch (url.pathname) {
    case "/": {
      // Serve a static HTML file
      const body = new TextDecoder().decode(
        Deno.readFileSync("./static/index.html"),
      );
      return new Response(body, {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    }

    case "/api/todos": {
      // Connect to a Base for storing todo items.
      const todos_base = deta.Base("todos");
      if (request.method === "GET") {
        // Fetch all items from the Base.
        const todos = await todos_base.fetch();
        // Return the items as JSON.
        return new Response(JSON.stringify(todos.items), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else if (request.method === "POST") {
        // Get the item from the request body.
        const item = await request.json();
        // Put the item into the Base.
        const resp = await todos_base.put(item);
        // Return the response as JSON.
        return new Response(JSON.stringify(resp), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        // If the request method is not GET or POST, return a 405 error
        return new Response("Method Not Allowed", { status: 405 });
      }
    }

    default:
      return new Response("Not Found", { status: 404 });
  }
};

await serve(handler, {
  port: +Deno.env.get("PORT")! || 8080,
});
