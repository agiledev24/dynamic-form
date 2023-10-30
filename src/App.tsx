import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoutes from "./routes";
import { store } from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
