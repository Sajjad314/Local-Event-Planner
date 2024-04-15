import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./redux/store";
import { Provider } from "react-redux";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
