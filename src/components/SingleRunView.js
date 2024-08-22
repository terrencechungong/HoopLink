import './styles/single-run-view.scss';
import { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import ReactDOM from 'react-dom/client';
import { globalVariables } from '..';
import { MdOutlineLocationOn } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import MakeMvpVoteModal from './MakeMvpVoteModal';
import { motion, AnimatePresence } from 'framer-motion'
import MvpVoteProgressModal from './MvpVoteProgressModal';
import { useParams } from 'react-router-dom';
import { GET_RUN_DATA } from './graphql/queries/RunQueries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { CREATE_VOTE_OBJECT_MUTATION } from './graphql/mutations/RunMutations';

const SingleRunView = () => {
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const modalDiv = useRef(false);
    const [isUp, setIsUp] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const { runId } = useParams();
    const [hasVoted, setHasVoted] = useState(false);
    const { data, loading, error } = useQuery(GET_RUN_DATA, {
        variables: {
            runId: runId
        }
    });
    const [createVoteMutation, createVoteMutationData] = useMutation(CREATE_VOTE_OBJECT_MUTATION)
    const userObj = JSON.parse(localStorage.getItem('user_object'));


    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }
    const reload = () => { navigate(0); }

    const closeModal = () => {
        parentRef.current.removeChild(parentRef.current.firstChild);  // Remove the DOM element
        modalLoaded.current = false;
        globalVariables.makeMvpVoteModalEffect = false;
        setIsUp(false);
    }

    useEffect(() => {
        if (!loading) {
            for (const player of data.run.mvpVotes) {
                if (player.voter._id == userObj._id) {
                    setHasVoted(true);
                    return
                }
            }
        }
    }, [loading])

    useEffect(() => {
        globalVariables.makeMvpVoteModalHasBeenShown = false;
        const func = function (event) {
            if (globalVariables.makeMvpVoteModalEffect === true) {
                const middleDiv = document.getElementById('make-a-vote-modal');
                if (middleDiv) {
                    if (isUp === false) {
                        setIsUp(true);
                        return;
                    }
                    if (!middleDiv.contains(event.target)) {
                        closeModal();
                    }
                }
            }
        }
        document.addEventListener('click', func);
        return () => {
            document.removeEventListener('click', func);
        };
    })

    const showProgModal = () => {
        setShowProgress(true);
    }

    const hideVotingProgress = () => {
        setShowProgress(false)
    }


    const showModal = () => {
        let modal = <MakeMvpVoteModal
            closeModalFunction={closeModal} reload={reload}
            players={data.run.players}
            createVote={createVoteMutation} 
            voterId={userObj._id}
            runId={data.run._id}
            />;
        if (globalVariables.makeMvpVoteModalHasBeenShown == false) {
            modalDiv.current = document.createElement('div');
            modalDiv.current.id = "make-a-vote-modal-container";
            modalRoot.current = ReactDOM.createRoot(modalDiv.current);
            modalRoot.current.render(modal);
            globalVariables.makeMvpVoteModalHasBeenShown = true;
        }
        parentRef.current.insertBefore(modalDiv.current, parentRef.current.firstChild);
        modalLoaded.current = true;
        globalVariables.makeMvpVoteModalEffect = true;
    }

    if (loading) {

    } else {
        console.log(data, error);
        // const hasUserVoted = data.run.mvpVotes.

        return (
            <div id="single-run-view-screen" ref={parentRef}>
                <AnimatePresence
                    initial={false}
                    mode="wait"
                >
                    {showProgress && < MvpVoteProgressModal handleClose={hideVotingProgress} />}
                </AnimatePresence>
                <div id="single-run-view-container">
                    <div id="single-run-view-header">
                        <p>Run Details</p>
                        <button onClick={goBack}><IoIosArrowRoundBack size={30} /></button>
                    </div>
                    <div id="single-run-view-content">
                        <div className='single-run-section'>
                            <p><strong>Run Name</strong></p>
                            <p>{data.run.runName}</p>
                        </div>
                        <div className='single-run-section'>
                            <p><strong>Run Creator</strong></p>
                            <div id="run-creator-name-and-picture" onClick={() => navigate(`/profile/${data.run.runCreator.authId}`)} >
                                <img height={"25px"} width={"25px"} style={{ borderRadius: '45px' }} src={data.run.runCreator.profilePhoto} />
                                <p >{data.run.runCreator.username}</p>
                            </div>
                        </div>
                        <div className='single-run-section' style={{ cursor: 'pointer' }}>
                            <p style={{
                                color: "rgb(65, 65, 65)",
                                backgroundColor: 'rgb(224, 224, 224)',
                                padding: '4px',
                                borderRadius: '6px',
                                boxShadow: '1px 1px 4px rgb(100, 100, 100, 0.42)'
                            }}><strong>View Players</strong></p>
                        </div>
                    </div>
                    <div id="single-run-view-content">
                        <div className='single-run-section'>
                            <p><strong>Run Status</strong></p>
                            <RunStatus
                                runStatus={data.run.runStatus}
                                startDate={data.run.startDate}
                                startTime={data.run.startTime}
                            />
                        </div>
                        <div className='single-run-section'>
                            <p><strong>Mvp Winner</strong></p>
                            <MvpVoteStatus votingStatus={"IN_PROGRESS"} showModal={showModal} showVoteProgress={showProgModal} userHasVoted={hasVoted} />
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
}


const RunStatus = ({ runStatus, startDate, startTime }) => {
    if (runStatus == 'NOT_STARTED') {
        return (<div className='in-progress' style={{ maxWidth: '170px', overflowWrap: 'anywhere' }}>
            <div className="light"></div>
            <p>Starting {`${startDate}`} @{` ${startTime}`}</p>
        </div>)
    } else if (runStatus == 'IN_PROGRESS') {
        return (
            <div className='complete'>
                <div className="light"></div>
                <p>Ongoing</p>
            </div>)
    } else {
        return (<div className='not-started'>
            <div className="light"></div>
            <p>This run ended 8/3/2029 @ 3:30</p>
        </div>)
    }
}


const MvpVoteStatus = ({ votingStatus, showModal, showVoteProgress, userHasVoted }) => {
    // const voted = true;
    const voted = userHasVoted;

    if (votingStatus == 'NOT_STARTED') {
        return (<div className='not-started'>
            <div className="light"></div>
            <p>Not Started Yet</p>
        </div>)
    } else if (votingStatus == 'IN_PROGRESS') {
        if (voted) {
            return <div className='alr-voted'>
                <div className="light"></div>
                <div className='extra-text' onClick={() => showVoteProgress()}>
                    <p>View voting progress</p>
                </div>
            </div>
        } else {
            return <div className='in-progress'>
                <div className="light"></div>
                <div className='extra-text' onClick={() => showModal()}>
                    <p>Voting Underway!</p>
                    <p>Click here to vote</p>
                </div>
            </div>
        }

    } else {
        return (<div className='complete'>
            <div className="light"></div>
            <p>Big Terrence</p>
        </div>)
    }
}

export default SingleRunView;