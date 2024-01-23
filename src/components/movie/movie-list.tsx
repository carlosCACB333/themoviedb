"use client";
import { useScrolledMovies } from "@/hooks/use-scrolled-movies";
import { cn } from "@/lib/utils";
import { MovieCard } from "./movie-card";

export const MovieList = () => {
  const { parentRef, virtualizer, movies } = useScrolledMovies();
  return (
    <div
      className={cn("w-full max-w-6xl")}
      style={{
        height: `80vh`,
        width: `100%`,
        overflow: "auto",
      }}
      ref={parentRef}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <MovieCard movie={movies[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};
