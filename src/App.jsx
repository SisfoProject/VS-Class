import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Main from './pages/home/main'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/search/:title" Component={Search} />
        <Route path="/home" Component={Main} />
   
      </Routes>
    </>
  )
}

export default App
