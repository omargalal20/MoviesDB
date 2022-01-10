import axios from 'axios';
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import MovieCard from '../MovieCard'
import MovieInfoModal from '../MovieInfoModal';

const WatchListPage = props => {
    const [watchListMovies, setWatchListMovies] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [movieInfo, setMovieInfo] = useState({});

    useEffect(() => {
        axios.post('http://localhost:8000/user/getWatchList',{
            id: props.user._id
        }).then(res => {
            console.log('Watchlistt', res.data);
            setWatchListMovies(res.data);
            setFetched(true)
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
        <Card className = 'w-100 d-flex flex-column justify-content-center align-items-center flex-wrap'>
            <Card.Header className = 'text-center w-100'>Watch List Movies</Card.Header>
            <div className = 'w-100 d-flex flex-row justify-content-center align-items-center flex-wrap'>
                {
                    (fetched === true ) && watchListMovies.map((movie, i) => (
                        <MovieCard key = {i} user = {{...props.user}} movie = {{...movie}} page = 'WatchList' setModalShow = {setModalShow} setMovieInfo = {setMovieInfo}></MovieCard>
                    ))
                }
            </div>
        </Card>
        <MovieInfoModal show={modalShow} onHide={() => setModalShow(false)} movieInfo = {{...movieInfo}}/>
        </>
    );
};

export default WatchListPage;