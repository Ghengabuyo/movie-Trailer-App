
import MovieCard from './MovieCard';
import { SimpleGrid } from '@chakra-ui/react';

function TrendingMovies({ movies = [], searchMovie }) {
  
  const filteredMovies = movies.filter(movie => {
    const title = movie.movieId.title;

    return title.includes(searchMovie.toLowerCase());
  });

  return (
    <section>
      <SimpleGrid
        columns={{ base: 2, md: 4, lg: 5, xl: 6 }}
        spacing={[6, 6, 6, 10]}
        size='lg'
        mt='10'
        padding={{ lg: 7, xl: 10 }}
      >
        {filteredMovies.map((movie, index) => (
          <MovieCard
            key={index}
            id={movie.id}
            title={movie.movieId.title}
            posterPath={movie.movieId.poster_path}
          />
        ))}
      </SimpleGrid>
    </section>
  );
}

export default TrendingMovies;
