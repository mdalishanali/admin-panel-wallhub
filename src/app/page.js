"use client";
import { api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [wallpapers, setWallpapers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllWallpapers();
  }, [page]);

  const getAllWallpapers = async () => {
    try {
      const respose = await api.get("/api/wallpapers", {
        params: {
          page,
        },
      });
      const newWallpapers = respose?.data?.wallpapers || [];
      if (newWallpapers.length) {
        setWallpapers([...wallpapers, ...newWallpapers]);
      }
      if (newWallpapers.length < 10) {
        setHasMore(false);
      }
    } catch (error) {}
  };

  const fetchMoreData = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <main className="p-8">
      <Link
        href={"/add-wallpaper"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
      >
        Add Wallpaper
      </Link>
      <div className="p-6 rounded-lg shadow-lg">
        <InfiniteScroll
          dataLength={wallpapers.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h1>Loading, fetching fresh datas..</h1>}
          endMessage={
            <>
              <p>Hey you have seen it all</p>
            </>
          }
        >
          <div className="grid grid-cols-3 gap-4">
            {wallpapers.map((wallpaper) => {
              return (
                <div key={wallpaper._id}>
                  <Image
                    alt="iphone wallpapers"
                    src={wallpaper.image}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </main>
  );
}
