import './styles/single-run-view.scss'
import { useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const SingleRunView = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div id="single-run-view-screen">
            <div id="single-run-view-container">
                <div id="single-run-view-header">
                    <p>RUN NAME</p>
                    <button onClick={goBack}><IoIosArrowRoundBack size={30} /></button>
                </div>
                <div id="single-run-view-content">
                    <div className='single-run-section'>
                        <p><strong>RUN NAME</strong></p>
                        <p>NAME HERE</p>
                    </div>
                    <div className='single-run-section'>
                        <p><strong>RUN CREATOR</strong></p>
                        <p>CREATOR NAME</p>
                    </div>
                    <div className='single-run-section'>
                        <p><strong>RUN CHAT</strong></p>
                        <p>CHAT LINK</p>
                    </div>
                </div>
                <div id="single-run-view-content">
                    <div className='single-run-section'>
                        <p><strong>RUN STATUS</strong></p>
                        <RunStatus runStatus={'IN_PROGRESS'} />
                    </div>
                    <div className='single-run-section'>
                        <p><strong>MVP WINNER</strong></p>
                        <MvpVoteStatus votingStatus={'NOT_STARTED'} />
                    </div>
                </div>
                <div className='single-run-location-section'>
                    <div id="location-text">
                        <h4><strong>Location</strong></h4>
                        <MdOutlineLocationOn size={20} />
                    </div>
                    <div id="map">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "USE_PROCESS_ENV" }}
                            defaultCenter={{
                                lat: 10.99835602,
                                lng: 77.01502627
                            }}
                            defaultZoom={11}
                        >
                        </GoogleMapReact>

                    </div>
                </div>

            </div>
        </div>
    )
}


const RunStatus = ({ runStatus }) => {
    if (runStatus == 'NOT_STARTED') {
        return (<div className='in-progress'>
            <div className="light"></div>
            <p>Starting 8/3/2029 @ 3:30</p>
        </div>)
    } else if (runStatus == 'IN_PROGRESS') {
        return <div className='complete'>
            <div className="light"></div>
            <p>This run is happening now!</p>
        </div>
    } else {
        return (<div className='not-started'>
            <div className="light"></div>
            <p>This run ended 8/3/2029 @ 3:30</p>
        </div>)
    }
}


const MvpVoteStatus = ({ votingStatus }) => {
    if (votingStatus == 'NOT_STARTED') {
        return (<div className='not-started'>
            <div className="light"></div>
            <p>Not Started Yet</p>
        </div>)
    } else if (votingStatus == 'IN_PROGRESS') {
        return <div className='in-progress'>
            <div className="light"></div>
            <div className='extra-text'>
                <p>Voting Underway!</p>
                <p>Click here to vote</p>
            </div>
        </div>
    } else {
        return (<div className='complete'>
            <div className="light"></div>
            <p>Big Terrence</p>
        </div>)
    }
}

export default SingleRunView;