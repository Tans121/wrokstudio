import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

/** Reactアプリケーションの描画先。 */
const rootElement = document.getElementById("root");

// 描画先がない構成では継続せず、HTML設定の不備を明示する。
if (rootElement === null) {
  throw new Error("描画先の要素 #root が見つかりません。");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
