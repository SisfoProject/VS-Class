import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"


function App() {


  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/search/:title" Component={Search} />
   
      </Routes>
    </>
  )
}

export default App
