import React from 'react'

const MovieList = ({movies,favcomp,handleFavouritesClick}) => {
  const FavComponent=favcomp
  return (
    <>
        {movies.map((movie,index)=>
          <div className='image-container d-flex justify-content-center m-3 movie' key={index}>
            <img src={movie.Poster} alt='movie'></img>   
            <div onClick={()=>handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
              <FavComponent></FavComponent>
              
              </div>        
          </div>
        )}
    </>
  )
}


export default MovieList