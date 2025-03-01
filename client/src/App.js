import { CartProvider } from "./context/CartContext";
import HomeRoutes from "./route/HomeRoutes";
import DashboardHomeRoute from "./routes/admin/DashboardHomeRoute";

function App() {
  return (
    <>
      <CartProvider>
        <HomeRoutes />
        <DashboardHomeRoute />
      </CartProvider>
    </>
  );
}

export default App;