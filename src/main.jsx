import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./firebaseConfig.js";
import { store } from "./store.js";
import { Provider } from "react-redux";
import ThemeProvider from "./components/ThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   <ThemeProvider>
   <App />
   </ThemeProvider>
  </Provider>
);
