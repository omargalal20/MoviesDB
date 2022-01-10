import image from '../assets/notfound.jpg'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const MovieCard = props => {
    console.log('Card', props.movie)
    const addToWatchList = () => {
        console.log('WATCHHHH')
        axios.post('http://localhost:8000/user/addToWatchList',{
            id: props.user._id,
            movie : {...props.movie}
        }).then(res => alert(res.data));
    }

    const addToLikes = () => {
        console.log('WATCHHHH')
        axios.post('http://localhost:8000/user/addToLike',{
            id: props.user._id,
            movie : {...props.movie}
        }).then(res => alert(res.data));
    }

    return(
        <Card className = 'm-2 w-25'>
        <img src={Object.keys(props.movie.images.poster).length !== 0 ? props.movie.images.poster['1'].medium.film_image : image} height="280" width = "100%" alt = 'img'/>
        <div className = 'd-flex flex-column justify-content-between align-items-center'>
            <div className="d-flex flex-column align-items-center">
                {props.movie.film_name}
            </div>
            <div className = 'w-100 d-flex justify-content-around p-2'>
                {
                    (Object.keys(props.user).length !== 0) && (props.page !== 'Likes') && (<Button onClick={() => addToLikes()}>Like</Button>)
                }
                {
                    (Object.keys(props.user).length !== 0) && (props.page !== 'WatchList') && (<Button onClick={() => addToWatchList()}>Add To Watch List</Button>)
                }
                <Button onClick={() => {props.setModalShow(true); props.setMovieInfo({...props.movie})}}>More Info</Button>
            </div>
        </div>
        </Card>
    )
}

export default MovieCard