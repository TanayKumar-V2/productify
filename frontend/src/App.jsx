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
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create" element={isSignedIn ? <CreatePage/>:<Navigate to={<HomePage/>}/>}/>
          <Route path="/product/:id" element={<ProductPage/>}/>
          <Route path="/profile" element={isSignedIn ? <ProfilePage/>: <Navigate to={<HomePage/>}/>}/>
          <Route path="/edit/:id" element={isSignedIn ? <EditPage/> : <Navigate to={<HomePage/>}/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;