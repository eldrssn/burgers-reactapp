import React, { useState } from 'react';
import restaurants from '../sample-restaurants';
import PropTypes from 'prop-types';


const Landing = (props) => {

  const [display, toggleDisplay] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  
  const displayList = () => {
    toggleDisplay(!display);
  }

  const getTitle = (rest) => {
    const {title, url} = rest;

    setTitle(title);
    setUrl(url);
    toggleDisplay(false);
  }

  const goToRest = () => {
    props.history.push(`/restaurant/${url}`)
  }

  return (
    <div className="restaurant_select">
      <div className="restaurant_select_top">
        <div onClick={displayList} className="restaurant_select_top-header font-effect-outline">
          {title ? title : 'Выбери ресторан'}
        </div>

        <div className="arrow_picker">
          <div className="arrow_picker-up"></div>
          <div className="arrow_picker-down"></div>
        </div>
      </div>

      {display 
        ? 
          <div className="restaurant_select_bottom">
            <ul>
              {restaurants.map( rest => {
                return <li onClick={() => getTitle(rest)} key={rest.id}>{rest.title}</li>
              })} 
            </ul>
          </div> 
        : null}

      {title && !display 
      ? 
      <button onClick={goToRest}>Перейти в ресторан</button> 
      : null}
    </div>
)
}

Landing.propTypes = {
  history: PropTypes.object
}

export default Landing;