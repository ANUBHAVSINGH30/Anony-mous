import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed"
import Create from "./pages/Create"
import PostDetail from "./pages/PostDetail"
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = {'token':true}
return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}


function App() {

  return (
   <Routes>
    {/* <Route pathh="/" element={<Navigate to="/signin"/>} /> */}
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/feed" element={<Feed />} />
    <Route path="/create" element={<Create />} />
    <Route path="/post/:id" element={<PostDetail />} />
   </Routes> 
  )
}

export default App;
