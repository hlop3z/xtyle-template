import * as myPlugin from "../components/index.ts";

/* DevTools */
import lorem from "../devtool/lorem.mjs";

const LOREM = lorem.sentence(3);

export default function Demo() {
  return (
    <div>
      <br />
      <myPlugin.Button theme-color="danger">Click Me</myPlugin.Button>
      <myPlugin.Button theme-text="success">Click Me</myPlugin.Button>
      <myPlugin.Button theme-border="info">Click Me</myPlugin.Button>
      <br />
      <br />
      {LOREM}
    </div>
  );
}
