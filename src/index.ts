/* Library */
import Actions from "./app/actions.ts";
import Directives from "./app/directives.ts";
import Globals from "./app/globals.ts";
import Models from "./app/models.ts";
import Init from "./app/init.ts";
import Router from "./app/router.ts";
import Store from "./app/store.ts";
import Theme from "./app/theme.ts";

/* Components */
export * from "./components/index.ts";

/* Style-Sheets */
import "./style/app.scss";

/* Plugin Install */
export function install(self, option) {
  console.log("Plugin Name", packageName);
  console.log("The Plugin", self);
  console.log("Plugin Options", option);

  // Theme Colors
  Theme();

  // Segments
  return {
    actions: Actions,
    directives: Directives,
    globals: Globals,
    init: Init,
    models: Models,
    router: Router,
    store: Store,
  };
}
