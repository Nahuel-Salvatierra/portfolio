import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./global.css";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<App />);
