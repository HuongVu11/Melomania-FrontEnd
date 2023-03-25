import {useState, useEffect} from 'react'

function Lyrics (props) {
    const [lyrics, setLyrics] = useState(null)

    useEffect(() => {
        const getLyrics = async () => {
            try {
                const response = await fetch(`https://some-random-api.ml/lyrics?title=${props.song.title}`)
                const json = await response.json()
                if (props.song.artist === json.artist || props.song.artist === json.author) {
                    setLyrics(json.lyrics)
                } else {
                    setLyrics(`Lyrics aren't available for this song.`)
                }
            } catch (error) {
                setLyrics(`Lyrics aren't available for this song.`)
            }
        }
        getLyrics()
    }, [props.song.artist,props.song.title])

    const Loading = () => {
        return (
            <>
                <div className='mt-5'>Loading...</div>
                <div className='loader'></div>
            </>
        )
    }

    const Loaded = () => {
        return (
            <div className='mt-3'>
                {lyrics.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
        )
    }

    return lyrics? <Loaded /> : <Loading />
}

export default Lyrics