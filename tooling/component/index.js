const BASE_PATH = "./src/components";

export function componentGenerator(plop) {
  console.log("Loading component generator...");

  plop.setGenerator("component", {
    description: "Generate a React component with SCSS module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${BASE_PATH}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
        templateFile: "./tooling/component/component.tsx.hbs",
      },
      {
        type: "add",
        path: `${BASE_PATH}/{{pascalCase name}}/{{pascalCase name}}.module.scss`,
        templateFile: "./tooling/component/component.module.scss.hbs",
      },
      {
        type: "add",
        path: `${BASE_PATH}/{{pascalCase name}}/index.ts`,
        templateFile: "./tooling/component/index.ts.hbs",
      },
      {
        type: "append",
        path: `${BASE_PATH}/index.ts`,
        pattern: "/* PLOP_INJECT_EXPORT */",
        template: 'export * from "./{{pascalCase name}}";',
      },
    ],
  });
}
