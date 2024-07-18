import { useEffect, useContext, useReducer, useState } from "react";
import nameContext from "../Contexts/nameContext";
import { useParams } from "react-router-dom";
import MovieDescription from "../Components/MovieDescription";
import MoviePoster from "../Components/MoviePoster";
import MovieLanguage from "../Components/MovieLanguage";
import style from "../Pages/ContentPage.module.css";
import GoBack from "../Components/GoBack";
import contentPageReducer from "../Reducer/contentPageReducer";
import { Box, Flex, Button, Text, SimpleGrid } from "@chakra-ui/react";
import MovieGenres from "../Components/MovieGenres";
import OriginCountry from "../Components/OriginCountry";
import VoteAverage from "../Components/VoteAverage"
import Tagline from "../Components/Tagline"
import { BsSuitHeartFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";


function ContentPage() {

  const { setDisplayName } = useContext(nameContext);


  useEffect(() => {
    const savedDisplayName = localStorage.getItem('displayName');
    if (savedDisplayName) {
      setDisplayName(savedDisplayName);
    }
  }, []);


  const { id } = useParams();


  const initialState = {
    title: '',
    posterPath: '',
    description: '',
    movieLanguage: [],
    trailerId: '',
    favorites: [],
    movieId: [],
    genres: [],
    originCountry: [],
    voteAverage: '',
    tagline: '',

  }


  const [state, dispatch] = useReducer(contentPageReducer, initialState);


  const {
    title,
    posterPath,
    description,
    movieLanguage,
    genres,
    originCountry,
    voteAverage,
    trailerId,
    favorites,

    tagline
  } = state;


  const apiUrl = 'https://api.themoviedb.org/3/';
  const apiKey = '8772c586ff1328a24e402adce96ff6f9';
  const ytApi = 'AIzaSyC3ysL6CJSjliLqx5HK9abI-O44N-yNcWs';

  const myApi = 'http://localhost:3000';



  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`${myApi}/movies/${id}`);
      const json = await response.json();
      console.log('jaaaaason', json)
      


      dispatch({ type: "SET_POSTER_PATH", payload: json.data.poster_path})
      dispatch({ type: "SET_TITLE", payload: json.data.title})
      dispatch({ type: "SET_DESCRIPTION", payload: json.data.overview })
    //  dispatch({ type: "SET_MOVIE_LANGUAGE", payload: json.data.spoken_languages })
      dispatch({ type: "SET_GENRES", payload: json.data.genres })
     // dispatch({ type: "SET_ORIGIN_COUNTRY", payload: json.data.production_countries })
      dispatch({ type: "SET_VOTE_AVERAGE", payload: json.data.vote_average })
   //   dispatch({ type: "SET_TAGLINE", payload: json.data.tagline })

/*
      
            const trailerQuery = encodeURIComponent(`${json.title || json.name} official trailer`);
            const trailerResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${trailerQuery}&key=${ytApi}&part=snippet&type=video`);
            const trailerData = await trailerResponse.json();

            if (trailerData.items && trailerData.items.length > 0) { // Check if trailerData.items exists
                dispatch({ type: "SET_TRAILER_ID", payload: trailerData.items[0].id.videoId })
            } else {
                console.log('No trailer found');
            } 
*/

    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };



  useEffect(() => {
    console.log('state', state)
    fetchMovieDetails();
  }, [id]);


  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    dispatch({ type: "LOAD_FAVORITES", payload: savedFavorites });
  }, []);

  
      const handleRemoveFavorite = (id) => {
          const updatedFavorites = state.favorites.filter(favorite => favorite.id !== id);
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          dispatch({ type: "REMOVE_FROM_FAVORITES", payload: id });
      };


  const addToFavorites = () => {
    const isFavorite = favorites.some(favorite => favorite.id === id);

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = state.favorites.filter(favorite => favorite.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: id });
    } else {
      // Add to favorites
      const updatedFavorites = [...state.favorites, { id, posterPath, title }];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      dispatch({ type: "ADD_TO_FAVORITES", payload: { id, posterPath, title } });
    }
  };

  const isFavorite = favorites.some(favorite => favorite.title === title);

  return (

    <Box bg='black' color='white' minHeight="100vh">

      <div className={style.ytbg}>
        <GoBack />

        <Box color='blue.400' mb='6' mt='6'>
          <Tagline tagline={tagline} />
        </Box>
{/*
        <Box
          w={{ base: '80%', md: '80%', lg: '60%', xl: '70%' }}
          p={4} border='1px'
          borderColor='blue.400'
          margin="0 auto"
          position="relative"
          boxShadow='lg'
          rounded='md'
          mb='5' >
          {

            <div className={style.videoContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
                allowFullScreen
                title="YouTube video player"
              ></iframe>
            </div>
          }
        </Box>
*/}
      </div>

      <Flex
        bg="radial-gradient(circle at 10% 20%, #0B60B0  0%, black 90%)"
        color="white"
        padding="10px"
        alignItems="center"
        justifyContent="center">
        <Flex
          width="100%"
          maxWidth="1200px"
          justifyContent="space-between">
          <SimpleGrid
            columns={[1, 1, 2]}
            spacing="5px"
            width="100%" >

            <Flex alignItems="center" justifyContent="center" >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center">
                <MoviePoster
                  width={{ base: '210px', lg: '280px' }}
                  height={{ base: '330px', lg: '450px' }}
                  posterPath={posterPath}
                  title={title}
                />
                <Button
                  onClick={addToFavorites}
                  mt={4}
                  padding='1'
                  color='white'
                  bg='teal'
                  variant="outline"
                  width={{ base: '65%', md: '70%', lg: '65%', xl: '70%' }}
                  height={{ base: '65%', md: '70%', lg: '65%', xl: '70%' }}
                  fontSize={{ base: '12px', md: '14px', lg: '16', xl: '16' }}
                >
                  {isFavorite ? (<><BsSuitHeartFill />ADDED TO FAVORITES </>) : (<><BsSuitHeart />ADD TO FAVORITES </>)}

                </Button>
              </Box>
            </Flex>


            <div className={style.detailsBox}>
              <Box >
                <Text
                  fontSize={{ base: '2xl', lg: '3xl', xl: '4xl' }}
                  size="md"
                  mb={4}
                  overflow="hidden"
                  whiteSpace="wrap"
                  textAlign='Center'>
                  {title}
                </Text>
                <MovieDescription description={description} />
               {/* <MovieLanguage movieLanguages={movieLanguage} />*/}

                {/*<OriginCountry originCountries={originCountry} />*/}
                <VoteAverage voteAverage={voteAverage} />
                <MovieGenres genres={genres} /> 

              </Box>
            </div>
          </SimpleGrid>
        </Flex>
      </Flex>


    </Box>
  );
}



export default ContentPage;

