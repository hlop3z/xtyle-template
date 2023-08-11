import { spawn } from "child_process";

if (process.argv.length < 4) {
  console.error("Usage: npm run workspace <workspace-name> <command>");
  process.exit(1);
}

const workspaceName = process.argv[2];
const command = process.argv.slice(3).join(" ");

const childProcess = spawn(`cd packages/${workspaceName} && pnpm ${command}`, {
  cwd: "./",
  stdio: "inherit",
  shell: true,
});

const handleExit = () => {
  if (childProcess) {
    childProcess.kill("SIGINT");
  }
  process.exit(0);
};

process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
