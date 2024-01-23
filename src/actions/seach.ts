"use server";

import { SearchMovieResponse } from "@/interfaces/movie";

const movieUrl = new URL("https://api.themoviedb.org/3/search/movie");

export const searchMovies = async (
  search: string,
  page = 1
): Promise<SearchMovieResponse> => {
  movieUrl.searchParams.set("query", search);
  movieUrl.searchParams.set("page", page.toString());
  const response = await fetch(movieUrl, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.THEMOVIE_ACCESS_TOKEN}`,
    },
  });

  const data: SearchMovieResponse = await response.json();
  return data;
};
