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
import useScreenDimensions from "../../utils/useScreenDimensions";

const HomePage = () => {
  const [popularTracks, setPopularTrack] = useState(null);
  const [latestTracks, setLatestTracks] = useState(null);
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef(0);
  const containerRef = useRef();

  const [loadMore, setLoadMore] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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

  const fetchOnScroll = async () => {
    if (loadMore) {
      return;
    }

    const tracks = await getTrackWithPagination(5, page);
    if (tracks.length == 0) {
      setPage(-1);
      setLoadMore(false);

      return;
    }
    await sleep(1000);
    const mergeTracks = [...trendingTracks, ...tracks];

    setTrendingTracks(mergeTracks);

    setPage(page + 1);

    setLoadMore(false);
  };

  useEffect(() => {
    function checkScrollPosition() {
      var threshold = 100;
      if (window.window.innerWidth < 640) {
        threshold = 600;
      }

      const scrollY = window.scrollY || window.pageYOffset;
      const innerHeight = window.innerHeight;
      const bodyHeight = document.body.clientHeight;

      if (bodyHeight - (scrollY + innerHeight) < threshold) {
        if (page === -1) {
          return;
        }
        fetchOnScroll();

        setLoadMore(true);
      }
    }

    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [trendingTracks, page]);

  return (
    <div className="flex pl-8 pr-8 flex-col md:flex-row" ref={containerRef}>
      {/* home leftside */}
      <div
        className="w-full md:w-[72%] md:border-r-[1px] md:border-solid pt-8 md:pr-8 "
        ref={scrollRef}
      >
        {latestTracks && popularTracks ? (
          <>
            <HomePageTrackHorizontalSwipe playlist={latestTracks} />
            <Playlist playlist={popularTracks} haveTitle={true} />
            <Playlist
              playlist={popularTracks}
              isGradient={true}
              haveTitle={true}
            />
          </>
        ) : (
          <img
            src={loading_gif}
            className="w-[50px] h-[50px] left-0 right-0 m-auto top-10"
          />
        )}

        <div id="trending" className="mt-8 pt-10 border-t">
          <h2 className="text-[1.25rem] mb-4">Trending</h2>

          {trendingTracks &&
            trendingTracks.map((track, index) => (
              <TrackWaveform track={track} key={index} className={"mb-10"} />
            ))}
        </div>

        {loadMore && (
          <img
            src={loading_gif}
            className="w-[50px] h-[50px] left-0 right-0 m-auto top-10"
          />
        )}
      </div>
      {/* sidebar */}
      <div className="w-full md:w-[28%] pl-8 pt-8 text-[#999] text-[14px]">
        <SideBar recommendSection={true} />
      </div>
    </div>
  );
};
export default HomePage;
