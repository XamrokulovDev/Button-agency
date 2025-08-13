"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Player
        autoplay
        loop
        src="/web.lottie.json"
        style={{ height: "250px", width: "400px" }}
      />
    </div>
  );
}