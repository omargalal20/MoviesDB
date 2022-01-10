import axios from 'axios';
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import MovieCard from '../MovieCard'
import MovieInfoModal from '../MovieInfoModal';

const LikesPage = props => {
    const [likedMovies, setLikedMovies] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [movieInfo, setMovieInfo] = useState({});

    useEffect(() => {
        axios.post('http://localhost:8000/user/getLikes',{
            id: props.user._id
        }).then(res => {
            console.log(res.data);
            setLikedMovies(res.data);
            setFetched(true)
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
        <Card className = 'w-100 d-flex flex-column justify-content-center align-items-center flex-wrap'>
            <Card.Header className = 'text-center w-100'>Liked Movies</Card.Header>
            <div className = 'w-100 d-flex flex-row justify-content-center align-items-center flex-wrap'>
                {
                    (fetched === true ) && likedMovies.map((movie, i) => (
                        <MovieCard key = {i} user = {{...props.user}} movie = {{...movie}} page = 'Likes' setModalShow = {setModalShow} setMovieInfo = {setMovieInfo}></MovieCard>
                    ))
                }
            </div>
        </Card>
        <MovieInfoModal show={modalShow} onHide={() => setModalShow(false)} movieInfo = {{...movieInfo}}/>
        </>
    );
};

export default LikesPage;