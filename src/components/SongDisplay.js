// We Must Import the React Library
import React from "react";

// Define a function that is our component, always make sure to declare the props parameter so you can use props in your component
// You can also destructure your props directly from the parameter list
const SongDisplay = ({ song }) => {
  //The component must return some JSX
  return (
    <>
      <h1>{song.title}</h1>
      <h2>{song.artist}</h2>
      <h2>{song.album}</h2>
      <img src={song.image} alt={song.title} />
      <h2>{song.link}</h2>
    </>
  );
};

// We must export the component to use it in other files
export default SongDisplay;
