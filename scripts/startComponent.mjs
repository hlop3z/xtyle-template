import { spawn } from "child_process";

if (process.argv.length < 4) {
  console.error(
    "Usage: npm run start <workspace-name> <component-name-kebab-case>"
  );
  process.exit(1);
}

const workspaceName = process.argv[2];
const command = process.argv[3];

const childProcess = spawn(
  `npm run core:cmd -- app:start ${command.toLowerCase()} --workspace ${workspaceName}`,
  {
    cwd: "./",
    stdio: "inherit",
    shell: true,
  }
);

const handleExit = () => {
  if (childProcess) {
    childProcess.kill("SIGINT");
  }
  process.exit(0);
};

process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
