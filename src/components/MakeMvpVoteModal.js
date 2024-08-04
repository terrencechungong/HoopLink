import './styles/makemvpvote.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react';

const MakeMvpVoteModal = ({ closeModalFunction }) => {
    const [step, setStep] = useState(1);
    const [prevStep, setPrevStep] = useState(1);
    const [stepTwo, setStepTwo] = useState(null);
    const [hidden, setHidden] = useState(0);
    const [exit, setExit] = useState(0);
    const [oneNone, setOneNone] = useState(false);
    const [twoNone, setTwoNone] = useState(true);
    const [threeNone, setThreeNone] = useState(true);

    function waitForTwoSeconds() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 200);
        });
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
            return;
        }
    }

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

    return (
        <div id="make-a-vote-modal" className='open-modal'>
            <div id="step-of-vote">
                <div id="onsie" className={step == 2 ? `slideBack` : (step == 1 && prevStep == 2 ? 'slideIn' : '')}
                    style={{ width: '320px',zIndex:100, display: (oneNone ? 'none' : 'flex'), position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <StepOne />
                </div>
                <div id="twosie" className={step == 3 ? `slideBack` : ((step == 2 && prevStep == 1) ? 'slideBackIn' : (step == 1 && prevStep == 2 ? 'slideFor' : (step == 2 && prevStep == 3 ? 'slideIn' : '')))}
                    style={{ width: '320px', display: (twoNone ? 'none' : 'flex'),  position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <StepTwo />
                </div>
                <div id="threesie" className={step == 2 ? `slideFor` : 'slideBackIn'}
                    style={{ width: '320px', display: (threeNone ? 'none' : 'flex'),  position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <StepThree />
                </div>
            </div>
            <div id="nav-buttons">
                <button onClick={backwards} className='back-button'>back</button>
                <button className='forward-button' onClick={forward}>forward</button>
            </div>


        </div>
    )
}

const StepOne = ({ }) => {
    return (
        <div id="vote-step-one">
            <h2>Pick your vote for mvp</h2>
            <input type="text" />
        </div>
    )

}

const StepTwo = ({ currentStep, prevStep }) => {

    return (
        <div id="vote-step-two">
            <h3>Why does name deserve MVP?</h3>
            <textarea></textarea>
        </div>
    )
}

const StepThree = ({ currentStep, prevStep }) => {
    return (
        <div id="vote-step-three">
            <h2>Vote Confirmation</h2>
            <p>Are you sure you want to pick NAME as MVP? Once you vote you may not change your decision.</p>
        </div>
    )

}

export default MakeMvpVoteModal;