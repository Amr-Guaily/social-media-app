import shareVedio from '../../assets/share.mp4';

const Landing = () => {
  return (
    <div className="h-screen w-screen relative">
      <video
        src={shareVedio}
        typeof="vedio/mp4"
        controls={false}
        autoPlay
        loop
        muted
        className="h-full w-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
    </div>
  );
};

export default Landing;
