import Button from "../components/Button";
import TrackCard from "../components/TrackCard";
import trackCover from "../images/temp_track_cover.jfif";
import landingWeb from "../images/cover_landing_web.jpg";

const HomePage = () => {
  const track = {
    image: trackCover,
    title: "Hello world",
    artist: "haha",
  };

  return (
    <div className="">
      <div>
        <div className="bg-primary w-full h-1"></div>
        <div className="bg-lading_web">
          <div className="flex justify-center align-middle flex-col">
            <h1>Connect on SoundCloud</h1>
            <h3>
              Discover, stream. and share a constantly expanding mix of music
              from emerging and major artists around the world.
            </h3>
            <Button context={"Sign up for free"} />
          </div>
        </div>
      </div>
      <div>
        <Button context={"Upload your own"} />
      </div>
      <h1 className="">Hear what's trending for free in the SoundCloud community</h1>
      <div className="grid grid-cols-5 grid-rows-2 gap-x-4 gap-y-6">
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
        <TrackCard track={track} />
      </div>
    </div>
  );
};

export default HomePage;
