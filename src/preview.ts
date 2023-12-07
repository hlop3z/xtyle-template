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

/* Globals */
console.log("Globals: ", xtyle.global);

/* Store */
console.log("Store: ", xtyle.store);

/* Routes */
console.log("Routes: ", Object.keys(xtyle.router.routes));

/* Directives Keys */
console.log("Directives: ", Object.keys(xtyle.allDirectives));

/**
 * @Theme
 */
// Colors
const Theme = {
  theme: {
    // Base
    none: "transparent",
    white: "#fff",
    black: "#000",
    gray: "#808080",
    success: "green",
    danger: "red",
    warning: "orange",
    info: "blue",
    // Theme
    1: "blue",
    2: "green",
    3: "red",
    4: "purple",
  },
  light: {
    1: "blue",
    2: "green",
    3: "red",
    4: "purple",
  },
  dark: {},
};

xtyle.theme(Theme);
