import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Movie } from "@/interfaces/movie";
import Image from "next/image";
import { FC } from "react";

interface Props {
  movie: Movie;
}
const POSTER_PATH = "https://image.tmdb.org/t/p/w500";

export const MovieCard: FC<Props> = ({ movie }) => {
  return (
    <Card className="flex justify-center flex-col">
      <CardContent className="flex p-4 gap-4 items-center">
        <Image
          src={
            movie.poster_path
              ? `${POSTER_PATH}${movie.backdrop_path}`
              : "/no-image.jpg"
          }
          alt={movie.title}
          width={600}
          height={400}
          className="rounded-lg h-full object-cover flex-1"
        />
        <div className="flex-1 ">
          <CardTitle>{movie.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {movie.overview}
          </CardDescription>
          <CardFooter>
            <span className="text-sm">Released: {movie.release_date}</span>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
};
