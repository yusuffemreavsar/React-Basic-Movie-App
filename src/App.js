import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFav from './components/AddFav';
import RemoveFavourites from './components/RemoveFavourites';
import './App.css';
function App() {
  const [movies, setMovies] = useState([])
  const [favourites, setFavourites] = useState([])
  const [search, setSearch] = useState('')
  const getMovieRequest = async(search)=>{ 
    const URL=`http://www.omdbapi.com/?s=${search}&apikey=c1b2b34a`
    const response=await fetch(URL)
    const responseJson=await response.json()

    if(responseJson.Search){
      setMovies(responseJson.Search)
    }
  }
  const addFavouritesMovie=(movie)=>{
      const newFavouriteList=[...favourites,movie]
      setFavourites(newFavouriteList)
      saveToLocalStorage(newFavouriteList)
  }
  const removeFavouritesMovie=(movie)=>{
      const newFavouriteList=favourites.filter(
        (favourite)=>favourite.imdbID!==movie.imdbID
      )
      setFavourites(newFavouriteList)
      saveToLocalStorage(newFavouriteList)
      
  }
  const saveToLocalStorage=(items)=>{
    localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))
  }
  const resetFavourites=()=>{
    setFavourites([])
    saveToLocalStorage([])

  }
  useEffect(() => {
    getMovieRequest(search)
  }, [search])
  useEffect(() => {
    const movieFavourites=JSON.parse(localStorage.getItem('react-movie-app-favourites'))
    setFavourites(movieFavourites)
  }, [])
  
  return (
    <div className='container-fluid movie-app '>
      <div className="row d-flex align-items-center mt-4 mb-4">
         <MovieListHeading heading="Movie World"></MovieListHeading>
         <SearchBox search={search} setSearch={setSearch}></SearchBox>
      </div>
      <div className="row">
         <MovieList movies={movies} handleFavouritesClick={addFavouritesMovie} favcomp={AddFav}/>      
      </div>
      <hr></hr>
      <div className="row d-flex align-items-center mt-4 mb-4">
         <MovieListHeading heading="Favourites"></MovieListHeading>
      </div>
      <button className='btn btn-danger' onClick={()=>resetFavourites()}>Clear Favourites</button>
      <div className="row">
         <MovieList movies={favourites} handleFavouritesClick={removeFavouritesMovie} favcomp={RemoveFavourites}/>      
      </div>
    </div>
  );
}

export default App;
