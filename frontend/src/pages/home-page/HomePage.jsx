import React, { useEffect, useRef, useState } from "react";
import { getLatestTracks } from "../../apis/playlist/getLatestTracks";
import { getPopularTracks } from "../../apis/playlist/getPopularTracks";
import { getTrackWithPagination } from "../../apis/track/getTrackWithPagination";
import loading_gif from "../../assets/images/loading-gif.gif";
import Playlist from "../../components/playlist/Playlist";
import SideBar from "../../components/side-bar/SideBar";
import HomePageTrackHorizontalSwipe from "../../components/track/TrackSwiper";
import TrackWaveform from "../../components/track/TrackWaveform";
import InfiniteScroll from "react-infinite-scroller";

const HomePage = () => {
  const [popularTracks, setPopularTrack] = useState(null);
  const [latestTracks, setLatestTracks] = useState(null);
  const [trendingTracks, setTrendingTracks] = useState("");
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef(0);

  const fetchOnScroll = async () => {
    console.log("being called");
    const tracks = await getTrackWithPagination(5, page);
    setTrendingTracks(tracks);
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularTracks = await getPopularTracks();
        const latestTracks = await getLatestTracks();
        const trendingTracks = await getTrackWithPagination(5, 1);
        setPopularTrack(popularTracks);
        setLatestTracks(latestTracks);
        setTrendingTracks(trendingTracks);
      } catch (error) {
        console.error(
          "An error occurred while retrieving the playlist:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex pl-8 pr-8 flex-col md:flex-row">
      {/* home leftside */}
      <div
        className="w-full md:w-[72%] md:border-r-[1px] md:border-solid pt-8 pr-8"
        ref={scrollRef}
      >
        {latestTracks && popularTracks ? (
          <>
            <HomePageTrackHorizontalSwipe playlist={latestTracks} />
            <Playlist playlist={popularTracks} />
          </>
        ) : (
          <img
            src={loading_gif}
            className="w-[50px] h-[50px] left-0 right-0 m-auto top-10"
          />
        )}

        <div id="trending" className="mt-8 pt-10 border-t">
          <h2 className="text-[1.25rem] mb-4">Trending</h2>

          <InfiniteScroll
            next={fetchOnScroll}
            hasMore={hasMore}
            initialLoad={false}
            // loader={<img src={loading_gif} className="w-[40px] m-auto" />}
            // useWindow={false}
            endMessage={<p>You are all set!</p>}
            // getScrollParent={() => document.getElementById("trending")}
          >
            {trendingTracks &&
              trendingTracks.map((track, index) => (
                <TrackWaveform track={track} key={index} className={"mb-10"} />
              ))}
          </InfiniteScroll>
        </div>
      </div>
      {/* sidebar */}
      <div className="w-full md:w-[28%] pl-8 pt-8 text-[#999] text-[14px]">
        <SideBar recommendSection={true} />
      </div>
    </div>
  );
};
export default HomePage;
