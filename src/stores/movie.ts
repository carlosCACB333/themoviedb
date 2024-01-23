import { Movie } from "@/interfaces/movie";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface MovieStore {
  search: string;
  movies: Movie[];
  page: number;
  totalPages: number;
  addMovies: (movies: Movie[]) => void;
  setMovies: (movies: Movie[]) => void;
  setSearch: (search: string) => void;
  setTotalPages: (totalPages: number) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
}

export const useMovieStore = create<MovieStore>()(
  devtools(
    persist(
      (set) => ({
        search: "",
        movies: [],
        page: 1,
        totalPages: 0,
        addMovies: (movies) =>
          set((state) => ({ movies: [...state.movies, ...movies] })),
        setMovies: (movies) => set(() => ({ movies })),
        setSearch: (search) => set(() => ({ search })),
        setTotalPages: (totalPages) => set(() => ({ totalPages })),
        setPage: (page) => set(() => ({ page })),
        nextPage: () => set((state) => ({ page: state.page + 1 })),
      }),
      { name: "movieStore" }
    )
  )
);
