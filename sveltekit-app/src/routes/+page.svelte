<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;
  let todoText = "";

  async function addTodo() {
    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: todoText }),
    });
    invalidate("/api/todos");
  }
</script>

<h1>Hello from SvelteKit on Space! ✨</h1>
<img src="https://deta.space/docs_assets/developer.gif" alt="Cool GIF" />
<h2>Play around with the form below to save todo items to a Deta Base!</h2>
<span>Enter some text:</span>
<input type="text" bind:value={todoText} />
<button on:click={addTodo}>Submit</button>
<h2>Here are your todo items:</h2>
<ul id="todo-list">
  {#each data.todos as todo}
    <li>
      {todo.text}
    </li>
  {/each}
</ul>

<style>
  :root {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #121212;
    color: #e0e0e0;
    font-family: sans-serif;
    padding: 2rem;
  }
</style>
