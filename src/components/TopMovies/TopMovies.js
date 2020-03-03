import React, { Component } from 'react';

import MovieBlock from './MovieBlock';

import './TopMovies.css';
import { API_KEY, URL_REQUEST } from '../../config';

class TopMovies extends Component {
  constructor() {
    super();

    this.state = {
      moviesTop: [],
      moviesTopFiltered: [],
      prefixFilter: '',
      page: 1,
      total_pages: 0,
      total_results: 0
    }

    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  componentDidMount() {
    const { page } = this.state;
    // fetch api get data
    fetch(`${URL_REQUEST}/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          moviesTop: data.results,
          page: data.page,
          total_pages: data.total_pages,
          total_results: data.total_results,
          moviesTopFiltered: this.onHandleFilter(this.state.prefixFilter, data.results)
        })
      })
      .catch(err => console.log(err));
  }

  handleChangeFilter(event) {
    console.log(event)
    let prefix = event.target.value;

    this.setState({
      prefixFilter: prefix,
      moviesTopFiltered: this.onHandleFilter(prefix, this.state.moviesTop)
    })
  }

  onHandleFilter(prefixFilter='', input=[]) {
    let output = [];
    console.log("input", input)
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

  render() {
    const { moviesTop, prefixFilter, moviesTopFiltered } = this.state;
    return(
      <div className="_top-movies">
        {/* Search Input */}
        <div className="container-search">
          <div className="search-input">
            <input 
              type="text" 
              placeholder="search movie" 
              name="prefixFiter" 
              defaultValue={prefixFilter} 
              onChange={(e) => this.handleChangeFilter(e)}
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
}

export default TopMovies;