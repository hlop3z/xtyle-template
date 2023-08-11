import { spawn } from "child_process";

const commandArgs = process.argv.slice(2);
const input = collectArgs();

// Run P[NPM] Command
runCommandNPM();

function collectArgs() {
  const kwargs = {};
  const args = [];
  for (let i = 0; i < commandArgs.length; i++) {
    const arg = commandArgs[i];
    if (arg.startsWith("--")) {
      const flagName = arg.slice(2); // Remove the leading '--'
      const nextArg = commandArgs[i + 1]; // Get the next argument as value
      if (nextArg && !nextArg.startsWith("--")) {
        kwargs[flagName] = nextArg;
        i++; // Skip the next argument
      } else {
        kwargs[flagName] = true; // Flag without value
      }
    } else {
      args.push(arg); // Collect positional argument
    }
  }
  const input = { kwargs, args };
  // console.log("Custom flags:", input.kwargs);
  // console.log("Positional arguments:", input.args);
  return input;
}

function runCommandNPM() {
  const { workspace } = input.kwargs;
  const command = input.args.join(" ");
  const childProcess = spawn(
    `cd packages/${workspace} && pnpm run ${command}`,
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
}
