import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";

function App(){
  const{isSignedIn,isClerkLoaded}=useAuthReq()
  useUserSync()

  if(!isClerkLoaded){
    return null
  }
  
  return(
    <div className="min-h-screen bg-base-100">
      <Navbar/>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={isSignedIn ? <HomePage/>: <Navigate to="/"/>}/>
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