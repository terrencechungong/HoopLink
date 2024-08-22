import './styles/makemvpvote.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client'
import MvpVoteBeingSent from './MvpVoteProcessing';
import { concatNameForDropDown } from './utils/utility';

const MakeMvpVoteModal = ({ closeModalFunction, reload, players, createVote, voterId, runId }) => {
    const [step, setStep] = useState(1);
    const [prevStep, setPrevStep] = useState(1);
    const [stepTwo, setStepTwo] = useState(null);
    const [hidden, setHidden] = useState(0);
    const [exit, setExit] = useState(0);
    const [oneNone, setOneNone] = useState(false);
    const [twoNone, setTwoNone] = useState(true);
    const [threeNone, setThreeNone] = useState(true);
    const parentRef = useRef(null);
    const modalLoaded = useRef(false);
    const modalRoot = useRef(null);
    const modalDiv = useRef(false);
    const userVoteInput = useRef({ "username": "", "_id": "" });
    const reasonVoteInput = useRef("");
    const canForward = useRef(false)


    function waitForTwoSeconds() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 200);
        });
    }

    function waitForThreeSeconds() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2500);
        });
    }

    function waitForOneSeconds() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    const processVote = async (userVote) => {
        setThreeNone(true);
        let modal = <MvpVoteBeingSent />;
        modalDiv.current = document.createElement('div');
        modalRoot.current = ReactDOM.createRoot(modalDiv.current);
        modalRoot.current.render(modal);
        parentRef.current.insertBefore(modalDiv.current, parentRef.current.firstChild);
        // await waitForThreeSeconds();
        // use create vote mutation
        await createVote({
            variables: {
                vote: {
                    voter: voterId,
                    nominee: userVote.current._id,
                },
                run: runId,
            }
        })
        parentRef.current.removeChild(parentRef.current.firstChild);
        modalRoot.current.unmount();
        modal = <p>Your vote has been submitted!</p>;
        modalDiv.current = document.createElement('div');
        modalRoot.current = ReactDOM.createRoot(modalDiv.current);
        modalRoot.current.render(modal);
        parentRef.current.insertBefore(modalDiv.current, parentRef.current.firstChild);
        await waitForOneSeconds();
        reload();
    }

    const forward = async () => {
        if (step == 1) {
            setPrevStep(1);
            setStep(2);
            setTwoNone(false);
            await waitForTwoSeconds();
            setOneNone(true);
        } else if (step == 2) {
            setHidden()
            setExit(-100);
            setPrevStep(2);
            setStep(3);
            setThreeNone(false);
            await waitForTwoSeconds();
            setTwoNone(true);
        } else {

            processVote(userVoteInput);
        }
    }

    // refactor tansitions

    const backwards = async () => {
        if (step == 1) {
            return
        } else if (step == 2) {
            setPrevStep(2);
            setStep(1);
            setOneNone(false);
            await waitForTwoSeconds();
            setTwoNone(true);
        } else {
            setPrevStep(3);
            setStep(2);
            setTwoNone(false);
            await waitForTwoSeconds();
            setThreeNone(true);
        }
    }
    console.log(players)

    return (
        <div id="make-a-vote-modal" className='open-modal' onClick={(e) => e.stopPropagation()}>
            <div id="step-of-vote" ref={parentRef} className={`${(oneNone && twoNone && threeNone) ? 'processing-vote' : ''}`}>
                <div id="onsie" className={step == 2 ? `slideBack` : (step == 1 && prevStep == 2 ? 'slideIn' : '')}
                    style={{ width: '320px', zIndex: 100, display: (oneNone ? 'none' : 'flex'), position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <StepOne players={players} userVote={userVoteInput} canForward={canForward} />
                </div>
                <div id="twosie" className={step == 3 ? `slideBack` : ((step == 2 && prevStep == 1) ? 'slideBackIn' : (step == 1 && prevStep == 2 ? 'slideFor' : (step == 2 && prevStep == 3 ? 'slideIn' : '')))}
                    style={{ width: '320px', display: (twoNone ? 'none' : 'flex'), position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <StepTwo usersVote={userVoteInput} />
                </div>
                <div id="threesie" className={step == 2 ? `slideFor` : 'slideBackIn'}
                    style={{ width: '320px', display: (threeNone ? 'none' : 'flex'), position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <StepThree usersVote={userVoteInput} />
                </div>
            </div>
            <div id="nav-buttons">
                <button onClick={backwards} className='back-button'>back</button>
                <button className='forward-button' onClick={() => {
                    if (canForward.current) {
                        forward()
                    }
                }}>forward</button>
            </div>


        </div>
    )
}

const StepOne = ({ players, userVote, canForward }) => {
    const [playerSet, setPlayerSet] = useState(players);

    const handleInputChange = (input) => {
        if (canForward.current) {
            canForward.current = false
        }
        setPlayerSet((current) => {
            const lowerCaseInput = input.toLowerCase();
            return players.filter(player => player.username.toLowerCase().startsWith(lowerCaseInput));
        })
    }

    return (
        <div id="vote-step-one">
            <h2>Pick your vote for mvp</h2>
            <input
                id="user-vote-input-field"
                type="text"
                style={{ border: '2px solid black' }}
                onChange={(e) => {
                    handleInputChange(e.target.value);
                }}
            />
            <div style={{ width: '80%', height: '120px', overflowY: 'scroll', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px', overflowX: 'hidden', backgroundColor: 'rgb(202, 202, 202)', alignItems: 'center', borderRadius: '4px' }}>
                {playerSet.map((player) => (
                    <div
                        onClick={() => {
                            const input = document.getElementById("user-vote-input-field");
                            userVote.current = { "username": player.username, "_id": player._id }
                            handleInputChange(player.username)
                            if (input) {
                                input.value = player.username
                            }
                            canForward.current = true
                        }}
                        style={{ backgroundColor: 'grey', display: 'flex', flexDirection: 'row', gap: '2px', alignItems: 'center', padding: '3px', width: '95%' }}>
                        <img width={"25px"} height={"25px"} style={{ borderRadius: '25px' }} src={player.profilePhoto} />
                        <p style={{ fontSize: '12px' }}>{concatNameForDropDown(player.username, 21)}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}

const StepTwo = ({ usersVote }) => {
    console.log(usersVote)

    return (
        <div id="vote-step-two">
            <h3>{`Why does ${usersVote.current.username} deserve MVP?`}</h3>
            <textarea style={{ border: '2px solid black' }}></textarea>
        </div>
    )
}

const StepThree = ({ currentStep, prevStep, usersVote }) => {
    return (
        <div id="vote-step-three">
            <h2><strong>Vote Confirmation</strong></h2>
            <p>{`Are you sure you want to pick `} <strong>{`${usersVote.current.username}`}</strong> {` as MVP? Once you vote you may not change your decision.`}</p>
        </div>
    )

}

export default MakeMvpVoteModal;