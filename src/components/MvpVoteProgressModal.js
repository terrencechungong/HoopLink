import Backdrop from "./Backdrop"
import './styles/mvp-vote-progress.scss'
import { IoIosCloseCircleOutline } from "react-icons/io";

const MvpVoteProgressModal = ({ handleClose }) => {
    const total = 100;
    const people = {
        'Terrence C.': 70,
        'Jeremy Pac': 15,
        'Robert Johnson': 15
    }
    return (
        <Backdrop closeModal={handleClose}>
            <div id="mvp-vote-progress-container"
                onClick={(e) => e.stopPropagation()}>
                    <IoIosCloseCircleOutline style={{cursor:'pointer'}}  size={32} onClick={handleClose}/>
                <h3 style={{ backgroundColor: 'white' }}>RUN NAME Voting Progress{' '}
                    {String.fromCodePoint('0x1F3C6')}</h3>
                    {/* add info about stats */}
                    <p style={{color:'grey'}}>100/200 votes completed</p>   
                <div id="mvp-vote-users">
                    {Object.entries(people).map(([key, value], index) => (
                        <div className="person-progress-cell">
                            <p key={index}>{`(${String((value / total) * 100)}%) -- ${key} ${index == 0 ? String.fromCodePoint(0x1F451) : ''}`}</p>
                            <div className="progress-bar-section" style={{ width: `${String((value / total) * 100)}%` }}></div>
                        </div>
                    ))}

                </div>
            </div>
        </Backdrop>
    )
}

export default MvpVoteProgressModal;