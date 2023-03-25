import {useState} from 'react'
import { useNavigate, useParams } from "react-router-dom"

function SongUpdate (props) {
    const {id} = useParams()
    const navigate = useNavigate()
    const songData = props.song
    const song = songData.find((s)=> s._id === id)
  
    const [editForm, setEditForm] = useState(song)
    const [link, setLink] = useState('')

    const handleChange = (e) => {
        setEditForm(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }))
    }
    
    const handleLinkChange = (e) => {
        if (e.target.files[0]) {
            setLink(e.target.files[0])
        } else {
            setLink(editForm.link)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = props.formData
        formData.append('title',editForm.title)
        formData.append('artist',editForm.artist)
        formData.append('album',editForm.album)
        formData.append('image',editForm.image)
        formData.append('link',link)
        props.updateSong(formData, id)
        navigate('/song')
    }

    return (
        <div className='ctn'>
            <h1>Update</h1>
            <form className='form' encType="multipart/form-data" onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={editForm.title}
                    name='title'
                    placeholder='title'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={editForm.artist}
                    name='artist'
                    placeholder='artist'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={editForm.album}
                    name='album'
                    placeholder='album'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={editForm.image}
                    name='image'
                    placeholder='image'
                    onChange={handleChange}
                />
                <input
                    type='file'
                    placeholder='link'
                    onChange={handleLinkChange}
                />
                <input type='submit' value='Update' className="submitBtn"/>
            </form>
        </div>
    )
}

export default SongUpdate