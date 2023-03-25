
//// Search a song by title
//// Here is the URL that we use to fetch data 
//const URL = 'http://localhost:4000/search?title='

import React from "react";
import {useEffect, useState} from 'react'
// WE IMPORT OUR COMPONENTS
import SongDisplay from "./SongDisplay";
import Form from "./Form"



const Search = (props) => {
const [song, setSongs] = useState({})

  //Function to getSongs
  const getSong = async (searchTitle) => {
    // make fetch request and store response
    const response = await fetch(
        `https://melomania-adh.herokuapp.com/search?title=${searchTitle}`
    );
    // Parse JSON response into a javascript object
    const data = await response.json();
    //set the Song state to the Song
    setSongs(data);
    console.log(data)
  };

  //This will run on the first render but not on subsquent renders
  useEffect(() => {
    getSong();
  }, []);

  // USE OUR COMPONENTS IN APPs RETURNED JSX
  // We pass the getSong function as a prop called Songsearch
  // We pass Song as props to Song display
  return (
    <>
    <div className="Search">
      <Form getSong={getSong} />
      <SongDisplay song={song} />    
      </div>
    </>
  );
}

export default Search
