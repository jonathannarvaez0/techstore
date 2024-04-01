import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "./components/Context.tsx";
import { SessionChecker } from "./components/SessionChecker.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider>
    <SessionChecker>
      <App />
    </SessionChecker>
  </Provider>
  // </React.StrictMode>,
);
