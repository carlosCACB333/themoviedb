"use client";

import { searchMovies } from "@/actions/seach";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearcherForm } from "@/interfaces/search";
import { cn } from "@/lib/utils";
import { searcherSchema } from "@/schemas/searcher";
import { useMovieStore } from "@/stores/movie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const Searcher = () => {
  const setMovies = useMovieStore((state) => state.setMovies);
  const setSearch = useMovieStore((state) => state.setSearch);
  const search = useMovieStore((state) => state.search);
  const setTotalPages = useMovieStore((state) => state.setTotalPages);
  const setPage = useMovieStore((state) => state.setPage);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SearcherForm>({
    mode: "onChange",
    resolver: zodResolver(searcherSchema),
  });

  useEffect(() => {
    if (search) setValue("search", search);
  }, [search, setValue]);

  const onSubmit = handleSubmit(async ({ search }) => {
    try {
      const { results, page, total_pages } = await searchMovies(search);
      setMovies(results);
      setSearch(search);
      setPage(page);
      setTotalPages(total_pages);
    } catch (error) {
      setError("search", { message: "Ocurrió un error al buscar la película" });
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full max-w-md">
      <div className="flex gap-2">
        <Input
          placeholder="Buscar una película"
          {...register("search")}
          className={cn(
            "flex-1",
            errors.search && "border-red-500 focus-visible:ring-red-500"
          )}
        />
        <Button type="submit" disabled={!isValid || isSubmitting}>
          Buscar
        </Button>
      </div>
      <span className="text-red-500 text-sm">{errors.search?.message}</span>
    </form>
  );
};
