import React from "react";
import { Footer, Header } from "./containers";
import { Navbar } from "./components";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="video_bg">
        <div className="header-bg_video">
          <video muted="muted" autoplay="autoplay" loop="loop" playsinline>
            <source
              src="https://booksy-public.s3.amazonaws.com/Horizontal_PL_1.webm"
              type="video/webm"
            />
            <source
              src="https://booksy-public.s3.amazonaws.com/PL.mp4"
              type="video/webm"
            />
          </video>
        </div>
        <Navbar />
        <Header />
      </div>

      <Footer />
    </div>
  );
};

export default App;
