import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import View from "./pages/View";
import Header from "./components/Header";
import { SearchingResultPage } from "./pages/SearchingResultPage";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

function App() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <Routes>
         
          //! In Place of Switch We use here "Routes" from preventing the error
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/update/:id" element={<AddUser />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchingResultPage />} />
        </Routes>
        <Particles
          className="myparticles"
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fps_limit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                // onClick: {
                //   enable: true,
                //   mode: "push",
                // },
              },
              modes: {
                repulse: {
                  distance: 180,
                  duration: 0.4,
                },
                // push:{
                //   quantity:2
                // }
              },
            },
            particles: {
              links: {
                color: "#fff",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 2, max: 5 },
              },
              number: {
                value: 70,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: {
                  default: "bounce",
                },
                speed: 1,
              },
              opacity: {
                value: 0.5,
              },
              collisions: {
                enable: true,
              },
            },
            background: {
              color: "blue",
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
