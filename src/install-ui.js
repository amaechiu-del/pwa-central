import { createInstallController } from "./index.js";
/** Browser-only install affordance. Caller owns the element and lifecycle. */
export function attachInstallButton({ button, target = globalThis, onUnavailable = () => {} }) {
  if (!button || typeof button.addEventListener !== "function") throw new Error("Install button required");
  const controller = createInstallController(target);
  const onClick = async () => {
    if (!controller.available) { onUnavailable(); return; }
    await controller.prompt();
  };
  button.addEventListener("click", onClick);
  return () => { button.removeEventListener("click", onClick); controller.dispose(); };
}
