import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";

function App(){
  return(
    <div className="min-h-screen bg-base-100">
      <Navbar/>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create" element={<CreatePage/>}/>
          <Route path="/product/:id" element={<ProductPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/edit/:id" element={<EditPage/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;