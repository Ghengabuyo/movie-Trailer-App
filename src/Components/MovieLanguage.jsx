import { Text } from "@chakra-ui/react";

function MovieLanguage({ movieLanguages }) {
  return (
    <div>
      {movieLanguages.map((language, index) => (
        <Text
          key={index}
          mt={3}
          ml={5}
        >
          Movie Language: {language.name}
        </Text>
      ))}
    </div>
  );
}

export default MovieLanguage;
