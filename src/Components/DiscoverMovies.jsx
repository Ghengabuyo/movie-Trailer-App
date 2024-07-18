
import MovieCard from './MovieCard';
import { SimpleGrid } from '@chakra-ui/react';

function DiscoverMovies({ movies, searchMovie }) {

  const filteredMovies = movies.filter(movie => {
    const title = movie.movieId.title;


    return title.includes(searchMovie.toLowerCase());
  });

  console.log({filteredMovies});


  return (
    <section>
      <SimpleGrid
        columns={{ base: 2, md: 4, lg: 5, xl: 6 }}
        spacing={[6, 6, 6, 10]}
        size='lg'
        mt='10'
        padding={{ lg: 7, xl: 10 }}
      >
         {filteredMovies.map(movie => (
          <MovieCard
            key={movie.movieId.id}
            id={movie.movieId.id}
            title={movie.movieId.title}
            posterPath={movie.movieId.poster_path}
          />
        ))}
      </SimpleGrid>
    </section>
  );
}

export default DiscoverMovies;
