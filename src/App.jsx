import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Jadwal from "./pages/jadwal/Jadwal"
import Fakultas from "./pages/fakultas/Fakultas"
import { Dosen } from "./pages/dosen"
import profile from "./pages/profile"
function App() {


  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/search/:title" Component={Search} />
        <Route path="/jadwal" Component={Jadwal} />
        <Route path="/fakultas" Component={Fakultas} />
        <Route path="/dosen" Component={Dosen} />
        <Route path="/profile" Component={profile} />
      </Routes>
    </>
  )
}

export default App
