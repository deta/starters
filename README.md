# Starter Space Apps

This repository contains a collection of example Space apps to help you get started with Space.

## Quick Start

1. If you don't already have a Space account, create one for free [here](https://deta.space/signup).
2. Install the Space CLI and link your Space account to the CLI. Instructions to do that can be found [here](https://deta.space/docs/en/basics/cli).
3. Clone this repository and navigate to an example app directory.

   ```sh
   git clone https://github.com/deta/starters
   cd starters/python-app
   ```

4. Create a new builder project on Space.

    ```sh
    space new
    ```

5. Push your project to Space and create a development instance.

    ```sh
    space push
    ```

6. A development instance of your app is now live on Space! Find it in the [Builder][builder] and use it to test your app.

> **Important**: running `space new` will create a `.space` directory inside your project. This directory contains sensitive information about your app and is used by the Space CLI to push your app to Space. Do not change the name of the directory, include it in any version control software, or add it to repositories.

## Project Structure

Every Space project must have a [Spacefile][spacefile-ref]. This is the configuration file used by Space to build and deploy your app. Upon initializing your project, the Space CLI will automatically scan your project and generate a Spacefile.

Besides the Spacefile, your project needs to contain some code or assets to be deployed, depending on the type of app you are building.

Your project can also include a [Discovery.md][discovery-ref] file which will be used to generate a [Discovery][discovery] page if you choose to release and list your app.

## Deploying your Space App

Run the `space push` command to upload your code to Space, and the build pipeline will start packaging your app. Once packaging is complete, you will see your app's development instance in the [Builder][builder]. You can use this instance to debug and test to make sure your app is ready for use.

## Releasing your Space App

When you are ready to release your app , run the `space release` command. This will create a new release of your app and make it available for other users to install. If you want to make the app visible on [Discovery][discovery], add the `--listed` flag to the command. Your app will get its own page that will display the contents of the [Discovery.md][discovery-ref] file.

## App List

- [Python](python-app)
- [Node.js](node-app)
- [Next.js](next-app)
- [Nuxt](nuxt-app)
- [SvelteKit](sveltekit-app)
- [Go](go-app)
- [Deno](deno-app)
- [Next.js](node-scheduled-actions)

## Contributing

If you want to report a bug, submit a fix, add an app, or otherwise contribute, please read the [contributing guidelines](CONTRIBUTING.md).

[builder]: https://deta.space/builder "Space Builder"
[discovery]: https://deta.space/discovery "Space Discovery"
[spacefile-ref]: https://deta.space/docs/en/reference/spacefile "Spacefile Reference"
[discovery-ref]: https://deta.space/docs/en/reference/discovery "Discovery.md Reference"
