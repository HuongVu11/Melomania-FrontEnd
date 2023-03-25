import {useState} from 'react'
import { useNavigate } from "react-router-dom"

function SongCreate (props) {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        console.log(newForm)
        const formData = props.formData
        formData.append('title',newForm.title)
        formData.append('artist',newForm.artist)
        formData.append('album',newForm.album)
        formData.append('image',newForm.image)
        formData.append('link',link)
        try {
            // eslint-disable-next-line
            const response = await props.createSong(formData);
            setNewForm({
              title: "",
              artist: "",
              album: "",
              image: "",
            })
            setIsSubmitting(false)
            navigate('/song')
        } catch (error) {
            console.log(error)
            setIsSubmitting(false)
        }
    }

    return (
        <div className='ctn'>
            <h1>Add new song</h1>
            {isSubmitting ? 
                (<div className='loader'></div>)
                :
                (
                <form className='form' encType="multipart/form-data" onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newForm.title}
                    name='title'
                    placeholder='title'
                    onChange={handleChange}
                    required
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
                <input type='submit' value='Add new' className="submitBtn"/>
            </form>
                )
            }
            
        </div>
    )
}

export default SongCreate