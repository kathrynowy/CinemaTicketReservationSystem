import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const movieData = [
  {
    name: "ALITA: BATTLE ANGEL",
    img: "https://media.pathe.nl/nocropthumb/180x254/gfx_content/1still/Alita_-Battle-Angel_ps_1_jpg_sd-high-2018-Twentieth-Century-Fox-Film-Corporation-All-rights-reserved.jpg",
  },
  {
    name: "A STAR IS BORN ",
    img: "https://media.pathe.nl/nocropthumb/180x254/gfx_content/other/api/filmdepot/v1/movie/download/19767_102504_ps_sd-high.jpg",
  },
  {
    name: "AQUAMAN",
    img: "https://media.pathe.nl/nocropthumb/180x254/gfx_content/other/api/filmdepot/v1/movie/download/19787_102960_ps_sd-high.jpg",
  },
  {
    name: "BOHEMIAN RHAPSODY",
    img: "https://media.pathe.nl/nocropthumb/180x254/gfx_content/posterhr/Bohemian-Rhapsody_ps_1_jpg_sd-high_-2018-Twentieth-Century-Fox-Film-Corporation-All-Rights-Reserved.jpg",
  },
  {
    name: "CAN YOU EVER FORGIVE ME",
    img: "https://media.pathe.nl/nocropthumb/180x254/gfx_content/other/api/filmdepot/v1/movie/download/32593_105753_ps_sd-high.jpg",
  },
]

ReactDOM.render(<App />, document.getElementById('root'));


