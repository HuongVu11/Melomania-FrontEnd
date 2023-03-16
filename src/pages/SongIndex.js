import { Link } from "react-router-dom"

function SongIndex (props) {
    const Loaded = () => {
        return props.song.map((song) => (
            <div key={song._id} className='SongIndex'>
                <img src={song.image} alt={song.title} />
                <Link to={`/song/${song._id}`}>
                    <h1>{song.title}</h1>
                </Link>
            </div>
        ))
    }

    const Loading = () => {
        return <h1>Loading...</h1>
    }
    return (
        <div className="container">
            <h1>Song List</h1>
            {props.song ? <Loaded /> : <Loading />}
        </div>
    )
}

export default SongIndex