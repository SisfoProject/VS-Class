import { Routes, Route,Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Jadwal from "./pages/jadwal/Jadwal"
import Fakultas from "./pages/fakultas/Fakultas"
import { Dosen } from "./pages/dosen"
import profile from "./pages/profile"
import PriviewJadwal from "./pages/PriviewJadwal"
import editProf from "./pages/editProf"
import upProfile from './pages/editProfile/profile'
import changePass from "./pages/changePass"
import settings from "./pages/settings"
import ruangan from "./pages/ruangan"
import forget from "./pages/forget"
import waiting from "./pages/waiting"

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
        <Route path="/jadwal/:id" Component={PriviewJadwal} />
        <Route path="/editProfile/:id" Component={editProf} />
        <Route path="/updateProfile/:id" Component={upProfile}/>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/change-password/:id" Component={changePass} />
        <Route path="/settings" Component={settings} />
        <Route path="/ruangan" Component={ruangan} />
        <Route path="/forget" Component={forget} />
        <Route path="/waiting" Component={waiting} />
      </Routes>
    </>
  )
}

export default App
