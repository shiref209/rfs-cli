import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import tmp from "tmp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("RFS-CLI", () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = tmp.dirSync({ unsafeCleanup: true });
    process.chdir(tmpDir.name);
  });

  afterEach(() => {
    process.chdir(__dirname);
    tmpDir.removeCallback();
  });

  test("creates correct file structure", () => {
    const moduleName = "TestModule";
    execSync(`node ${path.join(__dirname, "index.js")} ${moduleName}`);

    // Check if directories are created
    expect(
      fs.existsSync(path.join(tmpDir.name, "src", "pages", "testModule"))
    ).toBe(true);
    expect(
      fs.existsSync(path.join(tmpDir.name, "src", "hoc", "testModule"))
    ).toBe(true);
    expect(
      fs.existsSync(path.join(tmpDir.name, "src", "components", "testModule"))
    ).toBe(true);

    // Check if files are created
    expect(
      fs.existsSync(
        path.join(
          tmpDir.name,
          "src",
          "pages",
          "testModule",
          "testModule.page.tsx"
        )
      )
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(tmpDir.name, "src", "hoc", "testModule", "testModule.hoc.tsx")
      )
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(
          tmpDir.name,
          "src",
          "components",
          "testModule",
          "testModule.content.tsx"
        )
      )
    ).toBe(true);

    // Check if index files are created
    expect(
      fs.existsSync(
        path.join(tmpDir.name, "src", "pages", "testModule", "index.ts")
      )
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(tmpDir.name, "src", "hoc", "testModule", "index.ts")
      )
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(tmpDir.name, "src", "components", "testModule", "index.ts")
      )
    ).toBe(true);
  });

  test("creates files with correct content", () => {
    const moduleName = "TestModule";
    execSync(`node ${path.join(__dirname, "index.js")} ${moduleName}`);

    const pageContent = fs.readFileSync(
      path.join(
        tmpDir.name,
        "src",
        "pages",
        "testModule",
        "testModule.page.tsx"
      ),
      "utf8"
    );
    expect(pageContent).toContain("interface TestModulePageProps");
    expect(pageContent).toContain(
      "export const TestModulePage: React.FC<TestModulePageProps>"
    );

    const hocContent = fs.readFileSync(
      path.join(tmpDir.name, "src", "hoc", "testModule", "testModule.hoc.tsx"),
      "utf8"
    );
    expect(hocContent).toContain("interface TestModuleHocProps");
    expect(hocContent).toContain(
      "export const TestModuleHoc: React.FC<TestModuleHocProps>"
    );

    const componentContent = fs.readFileSync(
      path.join(
        tmpDir.name,
        "src",
        "components",
        "testModule",
        "testModule.content.tsx"
      ),
      "utf8"
    );
    expect(componentContent).toContain("interface TestModuleContentProps");
    expect(componentContent).toContain(
      "export const TestModuleContent: React.FC<TestModuleContentProps>"
    );
  });

  test("handles multiple module creation", () => {
    const moduleNames = ["Module1", "Module2"];
    moduleNames.forEach((moduleName) => {
      execSync(`node ${path.join(__dirname, "index.js")} ${moduleName}`);
    });

    moduleNames.forEach((moduleName) => {
      const lowerModuleName = moduleName.toLowerCase();
      expect(
        fs.existsSync(path.join(tmpDir.name, "src", "pages", lowerModuleName))
      ).toBe(true);
      expect(
        fs.existsSync(path.join(tmpDir.name, "src", "hoc", lowerModuleName))
      ).toBe(true);
      expect(
        fs.existsSync(
          path.join(tmpDir.name, "src", "components", lowerModuleName)
        )
      ).toBe(true);
    });
  });
});
