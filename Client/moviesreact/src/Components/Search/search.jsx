import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import MovieCard from '../MovieCard'
import MovieInfoModal from '../MovieInfoModal'
import { useLocation } from "react-router-dom"

const SearchPage = props => {
    const location = useLocation();
    const [searchedMovies] = useState(location.state.searched);
    const [modalShow, setModalShow] = useState(false);
    const [movieInfo, setMovieInfo] = useState({});

    return(
        <>
        <Card className = 'w-100 d-flex flex-column justify-content-center align-items-center flex-wrap'>
            <Card.Header className = 'text-center w-100'>Searched Movies</Card.Header>
            <div className = 'w-100 d-flex flex-row justify-content-center align-items-center flex-wrap'>
                {
                    searchedMovies.map((movie, i) => (
                        <MovieCard key = {i} user = {{...props.user}} movie = {{...movie}} page = 'Search' setModalShow = {setModalShow} setMovieInfo = {setMovieInfo}></MovieCard>
                    ))
                }
            </div>
        </Card>
        <MovieInfoModal show={modalShow} onHide={() => setModalShow(false)} movieInfo = {{...movieInfo}}/>
        </>
    );
};

export default SearchPage;