import React, { useState } from "react";
import { Footer, Header, PopularProducts, Slider } from "../../containers";
import { Navbar } from "../../components";
import video from "../../assets/warsztaty_1.mp4";
import video2 from "../../assets/kids_workshop_background.jpg";
import "./home.css";
export default function Home() {
  const [currentVideo, setCurrentVideo] = useState(video2);

  const handleVideoEnd = () => {
    setCurrentVideo((prevVideo) => (prevVideo === video2 ? video : video2));
  };
  return (
    <div className="App">
      <div className="video_bg">
        <div className="header-bg_video">
          <video
            muted="muted"
            autoPlay="autoPlay"
            loop="loop"
            playsInline
            onEnded={handleVideoEnd}
          >
            <source src={video2} type="video/mp4" />
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <Navbar />
        <Header />
      </div>
      <Slider />
      <PopularProducts />

      <Footer />
    </div>
  );
}
