import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<App />
		</BrowserRouter>
	</Provider>
);
