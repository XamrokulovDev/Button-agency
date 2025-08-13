import video from "../assets/video.mp4";

const VideoPlayer = () => {
  return (
    <video
      src={video}
      autoPlay
      muted
      loop
      playsInline
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

export default VideoPlayer;