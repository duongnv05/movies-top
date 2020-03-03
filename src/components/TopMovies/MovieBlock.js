import React, { Component } from 'react';

import './MovieBlock.css';
import { URL_IMAGE } from '../../config';

class MovieBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    if(data) {
      return(
        <div 
          className="_movie-block" 
        >
          {/* backdrop_path */}
          <div 
            className="top-control"
            style={{backgroundImage: `url(${URL_IMAGE(500)+data.backdrop_path})`}}
            title={data.original_title}
          >
            {/* vote_avarage, vote_count */}
            <div className="vote-info">
              <div className="voted-average">
                <p>IMDb: <span>{data.vote_average}</span></p>
              </div>
              <p className="voted-count">({data.vote_count} voted)</p>
            </div>
          </div>
          <p className="txt-title">{data.title}</p>
          {/* description */}
          <p className="txt-desc" title={data.overview}>{data.overview}</p>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default MovieBlock;