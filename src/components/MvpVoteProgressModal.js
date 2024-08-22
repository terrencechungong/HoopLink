import { useEffect, useState, useRef } from "react";
import Backdrop from "./Backdrop"
import './styles/mvp-vote-progress.scss'
import { IoIosCloseCircleOutline } from "react-icons/io";


const MvpVoteProgressModal = ({ handleClose, players, votes }) => {
    const total = players.length;
    const people = useRef({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let peeps = {};
        for (const player of players) {
            peeps[player.username] = 0;
        }
        for (const player of votes) {
            peeps[player.nominee.username] += 1
        }
        people.current = peeps;
        setLoading(false)
    })

    if (loading) {
        return <p>loading</p>
    } else {
        return (
            <Backdrop closeModal={handleClose}>
                <div id="mvp-vote-progress-container"
                    onClick={(e) => e.stopPropagation()}>
                    <IoIosCloseCircleOutline style={{ cursor: 'pointer' }} size={32} onClick={handleClose} />
                    <h3 style={{ backgroundColor: 'white' }}>RUN NAME Voting Progress{' '}
                        {String.fromCodePoint('0x1F3C6')}</h3>
                    {/* add info about stats */}
                    <p style={{ color: 'grey' }}>{`${votes.length}/${total}`} votes completed</p>
                    <div id="mvp-vote-users">
                        {Object.entries(people.current).map(([key, value], index) =>{ 
                            return(
                            <div className="person-progress-cell">
                                <p key={index}>{`(${String((value / total) * 100)}%) -- ${key} ${index == 0 ? String.fromCodePoint(0x1F451) : ''}`}</p>
                                <div className="progress-bar-section" style={{ width: `${String((value / total) * 100)}%` }}></div>
                            </div>
                        )})}
                    </div>
                </div>
            </Backdrop>
        )
    }
}

export default MvpVoteProgressModal;