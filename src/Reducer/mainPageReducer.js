function mainPageReducer(state, action) {
  /*
     const initState = {
         discoverMovies: [],
         trendingMovies: [],
         topRatedMovies: [],
         upcomingMovies: [],
         favorites: [],
     };*/

  switch (action.type) {

    case "SET_ALL_MOVIES":
      return {
        ...state,
        allMovies: action.payload
      };

    case "SET_DISCOVER_MOVIES":
      return {
        ...state,
        discoverMovies: action.payload
      };

    case "SET_TRENDING_MOVIES":
      return {
        ...state,
        trendingMovies: action.payload
      };

    case "SET_TOP_RATED_MOVIES":
      return {
        ...state,
        topRatedMovies: action.payload

      };

    case "SET_UPCOMING_MOVIES":
      return {
        ...state,
        upcomingMovies: action.payload

      };

    case "ADD_TO_FAVORITES":
      const { id, posterPath, title } = action.payload;
      // Check if the movie with the same ID is already in favorites
      const isAlreadyAdded = state.favorites.some(movie => movie.id === id);
      // If not added already, add it to favorites
      if (!isAlreadyAdded) {
        const updatedFavorites = [...state.favorites, { id, posterPath, title }];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return {
          ...state,
          favorites: [updatedFavorites],
        };
      }
      return state;
    case "LOAD_FAVORITES":
      return { ...state, favorites: action.payload };

    case "REMOVE_FAVORITE":
      const updatedFavorites = state.favorites.filter(favorite => favorite.id !== action.payload);
      return { ...state, favorites: updatedFavorites };

    default:
      return state;
  }

}
export default mainPageReducer;