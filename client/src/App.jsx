import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react"
import Home from "./pages/Home"
import About from "./pages/About"
import Blog from "./pages/Blog"
import SignIn from "./pages/SignIn"
import SingleBlog from "./components/SingleBlog"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Write from "./pages/Write"



function App() {


  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/posts" element={<Home />} />
          <Route path="/blogs?" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<SingleBlog />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/write" element={<Write />} />

        </Routes>
        <Footer />
      </Router>

    </div>

  );
}

export default App
