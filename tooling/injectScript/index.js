const BASE_PATH = "./src/inject/scripts";

export function injectScriptGenerator(plop) {
  console.log("Loading inject generator...");

  plop.setGenerator("injectScript", {
    description: "Generate a React injectScript with SCSS module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "injectScript name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${BASE_PATH}/load{{pascalCase name}}/load{{pascalCase name}}.ts`,
        templateFile: "./tooling/injectScript/injectScript.ts.hbs",
      },
      {
        type: "add",
        path: `${BASE_PATH}/load{{pascalCase name}}/load{{pascalCase name}}.module.scss`,
        templateFile: "./tooling/injectScript/injectScript.module.scss.hbs",
      },
      {
        type: "add",
        path: `${BASE_PATH}/load{{pascalCase name}}/index.ts`,
        templateFile: "./tooling/injectScript/index.ts.hbs",
      },
      {
        type: "append",
        path: `${BASE_PATH}/index.ts`,
        pattern: "/* PLOP_INJECT_SCRIPT_EXPORT */",
        template: 'export * from "./load{{pascalCase name}}";',
      },
    ],
  });
}
