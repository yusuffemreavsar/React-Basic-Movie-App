import React from 'react'

const SearchBox = ({search,setSearch}) => {
  return (
    <div className='col col-sm-4'>
        <input onChange={(e)=>setSearch(e.target.value)} className='form-control' placeholder='Search the Movie...'></input>
    </div>
  )
}

export default SearchBox