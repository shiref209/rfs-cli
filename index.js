#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { program } from "commander";
import { toLowerCaseFirstChar, toUpperCaseFirstChar } from "./utils.js";

program
  .version("1.0.0")
  .argument("<name>", "Module name")
  .option("-v, --verbose", "Verbose output")
  .parse(process.argv);

const options = program.opts();
const moduleName = program.args[0];

const projectStructure = {
  pages: {
    extension: ".page.tsx",
    files: ["index.ts"],
    type: "Page",
  },
  hoc: {
    extension: ".hoc.tsx",
    files: ["index.ts"],
    type: "Hoc",
  },
  components: {
    extension: ".content.tsx",
    files: ["index.ts"],
    type: "Content",
  },
};

function createProjectStructure(name) {
  const refinedName = toLowerCaseFirstChar(name);
  const refinedNameUpper = toUpperCaseFirstChar(name);

  Object.entries(projectStructure).forEach(([dir, config]) => {
    const { extension, files, type } = config;
    const dirPath = path.join("./src", dir, refinedName);

    try {
      fs.mkdirSync(dirPath, { recursive: true });

      const indexPath = path.join("./src", dir, "index.ts");
      fs.appendFileSync(indexPath, `export * from './${refinedName}';\n`);

      const mainFilePath = path.join(dirPath, `${refinedName}${extension}`);
      const mainFileContent = `import React from 'react';

interface ${refinedNameUpper}${type}Props {}

export const ${refinedNameUpper}${type}: React.FC<${refinedNameUpper}${type}Props> = () => {
  return <></>;
};`;
      fs.writeFileSync(mainFilePath, mainFileContent);

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        if (file === "index.ts") {
          fs.writeFileSync(
            filePath,
            `export * from './${refinedName}${extension.replace(".tsx", "")}';`
          );
        }
      });

      if (options.verbose) {
        console.log(`Created structure for ${dir}`);
      }
    } catch (error) {
      console.error(`Error creating structure for ${dir}:`, error.message);
    }
  });

  console.log("Project structure created successfully!");
}

try {
  createProjectStructure(moduleName);
} catch (error) {
  console.error("An error occurred:", error.message);
  process.exit(1);
}
