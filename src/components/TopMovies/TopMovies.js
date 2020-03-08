import React, { useState, useEffect } from 'react';

import MovieBlock from './MovieBlock';

import './TopMovies.css';
import { API_KEY, URL_REQUEST } from '../../config';

function TopMovies() {
  const [moviesTop, setMoviesTop] = useState([]);
  const [moviesTopFiltered, setMoviesTopFiltered] = useState([]);
  const [prefixFilter, setPrefixFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('constructor')
    // fetch api get data
    fetch(`${URL_REQUEST}/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setMoviesTop(data.results);
        setPage(data.page);
        setMoviesTopFiltered(onHandleFilter(prefixFilter, data.results));
      })
      .catch(err => console.log(err));
  }, []);

  function handleChangeFilter(event) {
    let prefix = event.target.value;
    
    setPrefixFilter(prefix);
    setMoviesTopFiltered(onHandleFilter(prefix, moviesTop));
  }

  function onHandleFilter(prefixFilter='', input=[]) {
    let output = [];
    if(prefixFilter == '') {
      return input;
    }

    let textRe = `.*${prefixFilter}*.`;
    let re = RegExp(textRe, 'g');

    output = input.filter(el => {
      return re.test(el.title);
    });

    return output;
  }
  
  return (
    <div className="_top-movies">
        {/* Search Input */}
        <div className="container-search">
          <div className="search-input">
            <input 
              type="text" 
              placeholder="search movie" 
              name="prefixFiter" 
              defaultValue={prefixFilter} 
              onChange={(e) => handleChangeFilter(e)}
            />
            <i className="material-icons">search</i>
          </div>
        </div>
        {/* Wrapper Top Movie */}
        <div className="wrapper-top-movies">
          {/* Block Movies */}
          { moviesTopFiltered.map(movie => {
            return(
              <MovieBlock key={movie.id} data={movie} />
            )
          }) }
        </div>
        {/* Pagination */}
      </div>
  )
}

export default TopMovies;