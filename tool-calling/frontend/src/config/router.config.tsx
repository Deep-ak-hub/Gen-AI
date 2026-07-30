import { BrowserRouter, Routes, Route } from "react-router"
import AuthLayoutPage from "../pages/layouts/AuthLayoutPage"
import LoginPage from "../pages/auth/LoginPage"
import App from "../App"

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path = "/" element={<App />}/>
      <Route path="/auth" element = {<AuthLayoutPage />}>
        <Route index= {true} element={<LoginPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRouter