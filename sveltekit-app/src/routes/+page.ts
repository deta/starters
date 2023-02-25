import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const response = await fetch("/api/todos");
  const todos = await response.json();
  return {
    todos,
  };
}) satisfies PageLoad;
