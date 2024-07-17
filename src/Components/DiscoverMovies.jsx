
import MovieCard from './MovieCard';
import { SimpleGrid } from '@chakra-ui/react';

function DiscoverMovies({ movies, searchMovie }) {

  const filteredMovies = movies.filter(movie => {
    const title = movie.title ? movie.title.toLowerCase() : '';
    const name = movie.name ? movie.name.toLowerCase() : '';

    return (
      title.includes(searchMovie.toLowerCase()) ||
      name.includes(searchMovie.toLowerCase())
    );
  });

  return (
    <>
      <section>
        <SimpleGrid
          columns={{ base: 2, md: 4, lg: 5, xl: 6 }}
          spacing={[6, 6, 6, 10]}
          size='lg'
          mt='10'
          padding={{ lg: 7, xl: 10 }}
        >
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title || movie.name || 'Untitled'}
              posterPath={movie.poster_path}
            />
          ))}
        </SimpleGrid>
      </section>
    </>
  );
}

export default DiscoverMovies;
