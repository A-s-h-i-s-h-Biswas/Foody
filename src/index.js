import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CartProvider from "./Storage/CartProvider";
import { AuthProvider } from "./Storage/Auth-Context";

ReactDOM.render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>,
  document.getElementById("root")
);
