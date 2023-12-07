/* Library */
import Directives from "./app/directives.ts";
import Globals from "./app/globals.ts";
import OnInit from "./app/init.ts";
import Store from "./app/store.ts";

/* Components */
export * from "./components/index.ts";

/* Style-Sheets */
import "./style/app.scss";

/* Plugin Install */
// @ts-ignore
export function install(self, option) {
  return {
    directives: Directives,
    globals: Globals,
    init: OnInit,
    store: Store,
  };
}
