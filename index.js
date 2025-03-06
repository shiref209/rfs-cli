#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { program } from "commander";
import { toLowerCaseFirstChar, toUpperCaseFirstChar } from "./utils.js";
import inquirer from "inquirer";
import os from "os";

program
  .version("1.0.0")
  .argument("<name>", "Module name")
  .option("-v, --verbose", "Verbose output")
  .option("--reset-config", "Reset saved project type configuration")
  .parse(process.argv);

const options = program.opts();
const moduleName = program.args[0];

const configPath = path.join(os.homedir(), ".rfsclirc");

async function getProjectType() {
  // Check if config exists and reset was not requested
  if (fs.existsSync(configPath) && !options.resetConfig) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
      return config.projectType;
    } catch (error) {
      console.log("Config file corrupted, recreating...");
    }
  }

  // Ask user for project type
  const { projectType } = await inquirer.prompt([
    {
      type: "list",
      name: "projectType",
      message: "What type of project are you working on?",
      choices: ["React", "React Native"],
    },
  ]);

  // Save configuration
  fs.writeFileSync(configPath, JSON.stringify({ projectType }));
  return projectType;
}

async function createProjectStructure(name, projectType) {
  const refinedName = toLowerCaseFirstChar(name);
  const refinedNameUpper = toUpperCaseFirstChar(name);

  // Define project structure based on project type
  const projectStructure = {
    ...(projectType === "React"
      ? {
          pages: {
            extension: ".page.tsx",
            files: ["index.ts"],
            type: "Page",
          },
        }
      : {
          screens: {
            extension: ".screen.tsx",
            files: ["index.ts"],
            type: "Screen",
          },
        }),
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

async function main() {
  try {
    const projectType = await getProjectType();
    await createProjectStructure(moduleName, projectType);
  } catch (error) {
    console.error("An error occurred:", error.message);
    process.exit(1);
  }
}

main();
