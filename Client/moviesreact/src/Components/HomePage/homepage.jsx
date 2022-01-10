import axios from 'axios';
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import MovieCard from '../MovieCard'
import MovieInfoModal from '../MovieInfoModal'
import Spinner from 'react-bootstrap/Spinner'

const HomePage = props => {
    const [nowShowingMovies, setNowShowingMovies] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [movieInfo, setMovieInfo] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/movies/nowShowing').then(res => {
            setNowShowingMovies(res.data.films);
            console.log(res.data.films);
            setFetched(true)
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
        <Card className = 'w-100 d-flex flex-column justify-content-center align-items-center flex-wrap'>
            <Card.Header className = 'text-center w-100'>Now Showing</Card.Header>
            <div className = 'w-100 d-flex flex-row justify-content-center align-items-center flex-wrap'>
                {
                    (fetched === true ) ? nowShowingMovies.map((movie, i) => (
                        <MovieCard key = {i} user = {{...props.user}} movie = {{...movie}} page = 'Home' setModalShow = {setModalShow} setMovieInfo = {setMovieInfo}></MovieCard>
                    )) : <Spinner animation="border" variant="success" />
                }
            </div>
        </Card>
        <MovieInfoModal show={modalShow} onHide={() => setModalShow(false)} movieInfo = {{...movieInfo}} user = {{...props.user}}/>
        </>
    );
};

export default HomePage;