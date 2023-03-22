import {useState, useEffect} from 'react'

function Lyrics (props) {
    const [lyrics, setLyrics] = useState(null)
    const URL = 'https://some-random-api.ml/lyrics?title='

    const getLyrics = async () => {
        try {
            const response = await fetch(`${URL}${props.song.title}`)
            const json = await response.json()
            if (props.song.artist === json.artist || props.song.artist === json.author) {
                setLyrics(json.lyrics)
            } else {
                setLyrics('lyrics is not available')
            }
        } catch (error) {
            setLyrics('lyrics is not available')
        }
    }

    useEffect(() => {
        getLyrics()
    }, [])

    const Loading = () => {
        return (
            <div className="mt-3">Loading...</div>
        )
    }

    const Loaded = () => {
        return (
            <div className="mt-3">
                {lyrics.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
        )
    }

    return lyrics? <Loaded /> : <Loading />
}

export default Lyrics