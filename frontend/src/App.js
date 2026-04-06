import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import TopNav from "./components/TopNav";
import SiteFooter from "./components/SiteFooter";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <TopNav />
          <main style={{ flex: 1 }}>
            <MainRoutes />
          </main>
          <SiteFooter />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
