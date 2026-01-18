const BASE_PATH = "./src/inject/utils";

export function injectUtilGenerator(plop) {
  console.log("Loading inject generator...");

  plop.setGenerator("injectUtil", {
    description: "Generate a React injectUtil",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "injectUtil name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${BASE_PATH}/{{camelCase name}}/{{camelCase name}}.ts`,
        templateFile: "./tooling/injectUtil/injectUtil.ts.hbs",
      },
      {
        type: "add",
        path: `${BASE_PATH}/{{camelCase name}}/index.ts`,
        templateFile: "./tooling/injectUtil/index.ts.hbs",
      },
      {
        type: "append",
        path: `${BASE_PATH}/index.ts`,
        pattern: "/* PLOP_INJECT_UTIL_EXPORT */",
        template: 'export * from "./{{camelCase name}}";',
      },
    ],
  });
}
