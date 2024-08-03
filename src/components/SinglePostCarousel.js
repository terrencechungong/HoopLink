import { useState } from 'react';
import './styles/single-post-carousel.scss'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const SinglePostCarousel = ({ closeModalFunction, allPhotos }) => {
    let [index, setIndex] = useState(0);
    const bgStyles = {
        backgroundSize: 'cover', // This makes the background image cover the entire div
        backgroundPosition: 'center', // This centers the background image in the div
        height: '80%', // Example height, adjust as needed
        width: '80%'
    }

    const goForward = () => {
        setIndex((index + 1) % allPhotos.length)
    }

    const moveBackwards = () => {
        if (index == 0) {
            setIndex(allPhotos.length - 1);
        } else {
            setIndex(index - 1);
        }
    }

    return (
        <div id='single-post-carousel-modal'>
            <button onClick={goForward}><IoArrowBackCircleOutline size={40} /></button>
            <div id="single-post-carousel">
                <div id='carousel-photo' style={{ ...bgStyles, backgroundImage: `url(${allPhotos[index]})` }}></div>
            </div>
            <button onClick={moveBackwards}><IoArrowForwardCircleOutline size={40} /></button>

        </div>
    )
}

export default SinglePostCarousel;