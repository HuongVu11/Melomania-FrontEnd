import { Link } from "react-router-dom"

function SongIndex (props) {
    const Loaded = () => {
        return props.song.map((song) => (
            <div key={song._id} className='SongIndex'>
                <div>
                    <img src={song.image} alt={song.title} />   
                </div>
                <div>
                    <Link to={`/song/${song._id}`}>
                        <h3>{song.title}</h3>
                    </Link>
                </div>
            </div>
        ))
    }

    const Loading = () => {
        return <h1>Loading...</h1>
    }
    return (
        <div className="container1">
            <h1>Song List</h1>
            <div className="my-3">
                {props.song ? <Loaded /> : <Loading />}
            </div>
        </div>
    )
}

export default SongIndex