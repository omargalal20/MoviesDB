import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MovieInfoModal = props => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.movieInfo.film_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Synopsis</h4>
          <p>
            {props.movieInfo.synopsis_long}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default MovieInfoModal;