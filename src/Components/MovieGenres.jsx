import { Tag, Box, Flex } from '@chakra-ui/react';

function MovieGenres({ genres }) {

  return (
    <Flex justifyContent="center" >
      <Box borderWidth="2px"
        borderColor="blue"
        p={2}
        borderRadius="md"
        mt='3'
      >

        {genres.map((genre) => (
          <Tag key={genre.id} m={1} fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'lg' }} >
            {genre.name}
          </Tag>
        ))}
      </Box>
    </Flex>
  );
}

export default MovieGenres;
