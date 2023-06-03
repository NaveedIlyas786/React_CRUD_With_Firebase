import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import View from "./pages/View";
import Header from "./components/Header";
import { SearchingResultPage } from "./pages/SearchingResultPage";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <ToastContainer position="top-center" />
      <Routes>  //! In Place of Switch We use here "Routes" from preventing the error
        <Route exact path="/" element={<Home/>} />
        <Route path="/add" element={<AddUser/>} />
        <Route path="/update/:id" element={<AddUser/>} />
        <Route path="/view/:id" element={<View/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/search" element={<SearchingResultPage/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
