import {useState} from 'react'
import { useNavigate } from "react-router-dom"

function SongCreate (props) {
    const navigate = useNavigate()
    const [newForm, setNewForm] = useState({
        title: '',
        artist: '',
        album: '',
        image: '',
    })
    const [link, setLink] = useState('')
    
    const handleChange = (e) => {
        setNewForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleLinkChange = (e) => {
        setLink(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newForm)
        const formData = props.formData
        formData.append('title',newForm.title)
        formData.append('artist',newForm.artist)
        formData.append('album',newForm.album)
        formData.append('image',newForm.image)
        formData.append('link',link)
        console.log(formData)
        props.createSong(formData)
        setNewForm({
            title: '',
            artist: '',
            album: '',
            image: '',
        })
        navigate('/song')
    }

    return (
        <div className='container'>
            <h1>Add new song</h1>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newForm.title}
                    name='title'
                    placeholder='title'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={newForm.artist}
                    name='artist'
                    placeholder='artist'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={newForm.album}
                    name='album'
                    placeholder='album'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={newForm.image}
                    name='image'
                    placeholder='image'
                    onChange={handleChange}
                />
                <input
                    type='file'
                    placeholder='link'
                    onChange={handleLinkChange}
                    required
                />
                <input type='submit' value='Add new' />
            </form>
        </div>
    )
}

export default SongCreate