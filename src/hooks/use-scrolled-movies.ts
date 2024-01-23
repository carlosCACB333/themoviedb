import { searchMovies } from "@/actions/seach";
import { useMovieStore } from "@/stores/movie";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";

export const useScrolledMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const movies = useMovieStore((state) => state.movies);
  const page = useMovieStore((state) => state.page);
  const search = useMovieStore((state) => state.search);
  const totalPages = useMovieStore((state) => state.totalPages);
  const addMovies = useMovieStore((state) => state.addMovies);
  const nextPage = useMovieStore((state) => state.nextPage);
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    getScrollElement: () => parentRef.current,
    count: movies?.length || 0,
    estimateSize: () => 400,
    overscan: 1,
  });

  const [lastItem] = [...virtualizer.getVirtualItems()].reverse();
  useEffect(() => {
    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= movies.length - 1 &&
      page < totalPages &&
      !isLoading
    ) {
      // nextPage();
      console.log("next page");
      setIsLoading(true);
      searchMovies(search, page + 1)
        .then((res) => {
          addMovies(res.results);
          nextPage();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [
    lastItem,
    movies,
    page,
    totalPages,
    nextPage,
    isLoading,
    search,
    addMovies,
  ]);

  return {
    movies,
    virtualizer,
    parentRef,
    isLoading,
  };
};
