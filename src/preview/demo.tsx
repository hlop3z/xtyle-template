import * as myPlugin from "../components/index.ts";

/* DevTools */
import lorem from "../devtool/lorem.mjs";

const LOREM = lorem.sentence(3);

export default function Demo() {
  return (
    <div>
      <br />
      <myPlugin.Button>Click Me</myPlugin.Button>
      <br />
      {LOREM}
    </div>
  );
}
