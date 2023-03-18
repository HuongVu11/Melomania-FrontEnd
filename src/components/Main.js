import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SongIndex from "../pages/SongIndex";
import SongShow from "../pages/SongShow";
import SongCreate from "../pages/SongCreate";
import SongUpdate from "../pages/SongUpdate";

const URL = "http://localhost:4000"

function Main () {

    const [song,setSong] = useState([])

    const getSong = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setSong(data)
    };

    const createSong = async (song) => {
        await fetch(URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(song)
        })
        getSong()
    }

    const updateSong = async (song, id) =>{
        await fetch(`${URL}/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(song)
        })
        getSong()
    }

    const deleteSong = async (id) => {
        await fetch(`${URL}/${id}`, {
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
                <Route path='/' element={
                    <SongIndex 
                        song={song} 
                    />
                }/>
                <Route path='/song/create' element={
                    <SongCreate 
                        createSong={createSong} 
                    />
                } />
                <Route path='/song/:id' element={
                    <SongShow 
                        song={song} 
                        deleteSong={deleteSong}
                    />
                }/>
                <Route path='/song/:id/update' element={
                    <SongUpdate
                        song={song} 
                        updateSong={updateSong} 
                    />
                } />
            </Routes>
        </main>
    )
}

export default Main