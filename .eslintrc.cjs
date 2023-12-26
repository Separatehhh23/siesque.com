module.exports = {
  extends: [
    "plugin:astro/recommended",
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {},
    },
    {
      files: ["*.astro"],
      processor: "astro/client-side-ts",
      rules: {},
    },
    // ...
  ],
}
