// @ts-nocheck
import * as Plugin from "./index.ts";
import Preview from "./preview/demo.tsx";

/**
 * @Register <Plugin>
 */
xtyle.use(Plugin);

/**
 * @Router
 */
const router = {
  history: false,
  baseURL: null,
};

/**
 * @Render
 */
xtyle.init(Preview, document.body, router);

/**
 * @Preview
 */

/* Actions */
console.log("Actions: ", xtyle.action.keys());

/* Directives */
console.log("Directives: ", Object.keys(xtyle.allDirectives));

/* Globals */
console.log("Globals: ", xtyle.global);

/* Models */
console.log("Models: ", xtyle.models.keys());

/* Routes */
console.log("Routes: ", xtyle.router.keys());

/* Store */
console.log("Store: ", xtyle.store);
