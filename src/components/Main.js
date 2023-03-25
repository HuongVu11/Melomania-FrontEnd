import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import SongIndex from "../pages/SongIndex";
import SongShow from "../pages/SongShow";
import SongCreate from "../pages/SongCreate";
import SongUpdate from "../pages/SongUpdate";
import User from "./User";
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import ArtistShow from "../pages/ArtistIndex";
import ArtistIndex from "../pages/ArtistIndex";

const URL = 'https://melomania-adh.herokuapp.com'

function Main (props) {
    const {isAuthenticated} = useContext(UserContext)
    const [song,setSong] = useState([])
    const formData = new FormData()

    const getSong = async () => {
        const response = await fetch(`${URL}/songs`)
        const data = await response.json()
        setSong(data)
    };

    const createSong = async (song) => {
        try {
            const newSongData =  await fetch(`${URL}/songs`, {
                method: 'post',
                body: song
            })
          const newSong = await newSongData.json()
          // add the new song to the existing list
          setSong(prevSongs => [...prevSongs, newSong])
        } catch (error) {
          console.log(error)
        }
    }  

    const updateSong = async (song, id) =>{
        await fetch(`${URL}/songs/${id}`, {
            method: 'put',
            body: song
        })
        getSong()
    }

    const deleteSong = async (id) => {
        await fetch(`${URL}/songs/${id}`, {
          method: 'delete'
        })
        getSong()
    }
    
    useEffect(() => {
        getSong()
    }, [])


    return (
        <main>
            {isAuthenticated ? (
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/song" element={
                        <SongIndex song={song} 
                            getSong={getSong} />
                    }/>
                    <Route exact path="/song/create" element={
                        <SongCreate 
                            createSong={createSong} 
                            formData={formData} />
                    }/>
                    <Route exact path="/song/:id" element={
                        <SongShow 
                            song={song} 
                            URL={URL} 
                            deleteSong={deleteSong} />
                    }/>
                    <Route exact path="/song/:id/update" element={
                        <SongUpdate 
                            song={song} 
                            updateSong={updateSong}
                            formData={formData}/>
                    }/>
                    <Route path="/artist" element={
                        <ArtistIndex URL={URL}/>
                    }/>
                    <Route path="/user" element={
                        <User />
                    }/>
                </Routes>
            ) : (
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/song" element={
                        <SongIndex 
                            song={song} 
                            getSong={getSong} 
                        />}
                    />
                    <Route path="/song/:id" element={
                        <User />
                    }/>
                    <Route path="/artist" element={<ArtistIndex URL={URL}/>} />
                    <Route path="/user" element={<User />} />
                </Routes>
                

            )}
        </main>
    );

}

export default Main