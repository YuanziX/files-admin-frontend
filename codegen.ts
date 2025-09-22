import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8888/query",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
    },
    "./src/__generated__/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
