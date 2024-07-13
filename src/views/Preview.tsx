import * as myPlugin from "../components/index.ts";

/* DevTools */
import lorem from "../devtool/lorem.mjs";

/* Utils */
const { useSignal } = preact;

const LOREM = lorem.sentence(4);

// @ts-ignore
export default function View({ route, search, arg }) {
  const view = useSignal("home");
  const setView = (name) => (view.value = name);
  return (
    <div style="text-align: center;">
      <h1>Xtyle (TypeScript + Vite)</h1>
      <br />
      <myPlugin.Button theme-color="danger" on-click={() => setView("home")}>
        Home Page
      </myPlugin.Button>
      <myPlugin.Button theme-text="success" on-click={() => setView("about")}>
        About Page
      </myPlugin.Button>
      <myPlugin.Button theme-border="info" on-click={() => setView("contact")}>
        Contact Page
      </myPlugin.Button>
      <br />
      <br />
      <h3 style="border: solid black 2px; padding: 8px">
        Xtyle is primarily designed for developing libraries rather than
        applications. Nevertheless, it supports the entire development cycle,
        enabling you to build applications with integrated views in your final
        product.
      </h3>
      <br />
      <br />
      <x-slot x-switch x-case={view.value}>
        <x-slot
          x-for={(item) => (
            <x-slot case={item}>
              <h1>{item.toUpperCase()} PAGE</h1>
            </x-slot>
          )}
          x-in={["home", "about", "contact"]}
        ></x-slot>
      </x-slot>
      {LOREM}
    </div>
  );
}
