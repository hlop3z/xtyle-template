const $NAME = "myplugin__Button";

import "./style.scss";

export default function Button(props) {
  return (
    <button x-html {...props} class={[$NAME, props.class]}>
      {props.children}
    </button>
  );
}
