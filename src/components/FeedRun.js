import './styles/feed-run.scss'
import { useNavigate } from 'react-router-dom';

import { FiInfo } from "react-icons/fi";

const FeedRun = ({ run }) => {
    const navigate = useNavigate();

    return (
        <div id="feed-run-container">
            {/* make this go to the actual run */}

            <div id="content-section">
                <div className='feed-run-section' onClick={() => navigate(`/run/${run._id}`)}>
                    <p><strong>Run Name</strong></p>
                    <p
                        onClick={() => navigate(`/run/${run._id}`)}
                        id="run-name"
                        style={{ cursor: 'pointer' }}
                    >{run.runName}</p>
                </div>
                <div className='feed-run-section'>
                    <p><strong>Run Creator</strong></p>
                    <div style={{display:'flex', flexDirection:'row', gap:'4px'}} id="run-creator-section">
                        <img height={"25px"} width={"25px"} style={{borderRadius:'45px'}} src={run.runCreator.profilePhoto}/>
                        <p onClick={() => navigate(`/profile/${run.runCreator.authId}`)}>{run.runCreator.username}</p>
                    </div>

                </div>
                <div className='feed-run-section'>
                    <p><strong>{`${run.players.length}`}</strong>{` participating players`}</p>
                </div>
                <div className='feed-run-section'>
                    <p><strong>Run Status</strong></p>
                    <p>{run.runStatus}</p>
                </div>
                <div className='feed-run-section'>
                    <p><strong>Location</strong></p>
                    <p>{run.location}</p>
                </div>
                {run.mvpVotingStatus == "IN_PROGRESS" &&
                    <div className='feed-run-section'>
                        <p>
                            MVP VOTING STARTED
                        </p>
                    </div>
                }
                {run.mvpVotingStatus == "COMPLETE" &&
                    <div className='feed-run-section'>
                        <p>
                            MVP VOTING COMLETE (not iimpl view winer)
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default FeedRun;