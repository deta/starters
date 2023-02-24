import Head from "next/head";
import Todos from "../components/todos";

export default function Index() {
  return (
    <>
      <Head>
        <title>Next.js App on Space</title>
        <meta name="description" content="A simple Next.js app deployed on Space" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Hello from Next.js on Space! ✨</h1>
        <img src="https://deta.space/docs_assets/developer.gif" alt="Cool GIF" />
        <Todos />
      </main>
    </>
  );
}
