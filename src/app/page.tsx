import { MovieList } from "@/components/movie/movie-list";
import { Searcher } from "@/components/movie/searcher";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 container mx-auto px-4 py-8 items-center">
      <Searcher />
      <MovieList />
    </main>
  );
}
