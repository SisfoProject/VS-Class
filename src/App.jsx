import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/login/main"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
      </Routes>
    </>
  )
}

export default App
