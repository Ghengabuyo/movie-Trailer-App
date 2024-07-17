import { Flex, Text } from '@chakra-ui/react'

function Tagline({ tagline }) {

  return (
    <Flex justifyContent='center'>
      <Text
        fontStyle="italic"
        fontSize={{ base: 'md', md: 'lg', lg: 'xl', xl: '2xl' }}>
        {tagline}
      </Text>
    </Flex>

  );
}

export default Tagline; 