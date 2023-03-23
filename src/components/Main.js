import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import SongIndex from "../pages/SongIndex";
import SongShow from "../pages/SongShow";
import SongCreate from "../pages/SongCreate";
import SongUpdate from "../pages/SongUpdate";
import User from "./User";
import { useContext } from 'react'
import UserContext from '../context/UserContext'

const URL = 'https://melomania-adh.herokuapp.com'

function Main (props) {

    const {isAuthenticated, isAuth, notAuth} = useContext(UserContext)
    const [song,setSong] = useState([])
    const formData = new FormData()
    const getSong = async () => {
        const response = await fetch(`${URL}/songs`)
        const data = await response.json()
        setSong(data)
    };

    const createSong = async (song) => {
        await fetch(`${URL}/songs`, {
            method: 'post',
            body: song
        })
        getSong()
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
            <Routes>
                <Route exact path='/' element={
                    <Home />
                }/>
                <Route exact path='/song' element={
                    <SongIndex 
                        song={song}
                        getSong={getSong}
                    />
                }/>
                <Route exact path='/song/create' element={
                    isAuthenticated ? 
                        <SongCreate 
                            createSong={createSong} 
                            formData = {formData}
                        />
                        :
                        <Navigate to='/user' />
                }/>
                <Route exact path='/song/:id' element={
                    isAuthenticated ? 
                        <SongShow 
                            song={song}
                            URL = {URL}
                            deleteSong={deleteSong}
                        />
                        :
                        <Navigate to='/user' state={{prev:'/song'}}/>
                }/>
                <Route exact path='/song/:id/update' element={
                    isAuthenticated ? 
                        <SongUpdate
                            song={song} 
                            updateSong={updateSong} 
                            formData={formData}
                        />
                        :
                        <Navigate to='/user' />
                }/>
                <Route exact path='/user' element={
                    <User 
                        isAuth={isAuth}
                        notAuth={notAuth}
                    />
                }/>
            </Routes> 
        </main>
    )
}

export default Main