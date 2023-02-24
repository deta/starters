import { useState } from "react";
import useSWR from "swr";
import { TodoItem } from "../pages/api/todos";

export default function Todos() {
  const { data, error, mutate } = useSWR<TodoItem[]>("/api/todos", (key) => fetch(key).then((res) => res.json()));
  const [todoText, setTodoText] = useState("");

  if (error) {
    return <div>Failed to load todos</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Play around with the form below to save todo items to a Deta Base!</h2>
      <span>Enter some text:</span>
      <input type="text" onChange={(e) => setTodoText(e.target.value)} />
      <button
        onClick={async () => {
          await fetch("/api/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: todoText }),
          });
          mutate();
        }}
      >
        Submit
      </button>
      <h2>Here are your todo items:</h2>
      <ul>
        {data.map((todo) => (
          <li key={todo.key}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
