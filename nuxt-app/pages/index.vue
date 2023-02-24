<script setup>
const { data: todos, refresh } = await useFetch("/api/todos");
const todoText = useState("todoText", () => "");

async function addTodo() {
  await $fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { text: todoText.value },
  });
  refresh();
}
</script>

<template>
  <h1>Hello from Nuxt on Space! ✨</h1>
  <img src="https://deta.space/docs_assets/developer.gif" alt="Cool GIF" />
  <h2>Play around with the form below to save todo items to a Deta Base!</h2>
  <span>Enter some text:</span>
  <input type="text" v-model="todoText" />
  <button @click="addTodo()">Submit</button>
  <h2>Here are your todo items:</h2>
  <ul>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ul>
</template>

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
