import './styles/makemvpvote.scss'
import {motion, AnimatePresence} from 'framer-motion'
import {useState} from 'react';

const MakeMvpVoteModal = ({ closeModalFunction }) => {
    const [step, setStep] = useState(1);
    const [prevStep, setPrevStep] = useState(1);

    const forward= () => {
        if (step == 1) {
            setPrevStep(1);
            setStep(2);
        } else if(step == 2) {
            setPrevStep(2);
            setStep(3);
        } else {
            return;
        }
    }

    const backwards = () => {
        if (step == 1) {
            return
        } else if(step == 2) {
            setPrevStep(2);
            setStep(1);
        } else {
            setPrevStep(3);
            setStep(2);
        }
    }

    const StepTwo = ({ prevStep, currentStep }) => {

        const hidden = (prevStep == 1 ? 100 :
            (prevStep == 3) ? -100 : 0
        );

        const exited = (currentStep == 1 ? 100 : -100);
    
        const variants = {
            hidden: { x:  hidden  },
            visible: { x: 0 },
            exited: { x: exited }
        };
    
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exited"
                variants={variants} style={{ width: '300px', display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ overflowWrap: 'anywhere' }}>two</p>
            </motion.div>
        )
    
    }

    return (
        <div id="make-a-vote-modal" className='open-modal'>
            <button onClick={backwards}>back</button>
            <div id="step-of-vote">
                <AnimatePresence
                initial={false}
                mode='wait'>
                    {step == 1 && <StepOne prevStep={prevStep}/>}
                </AnimatePresence>
                <AnimatePresence
                initial={false}
                mode='wait'>
                    {step == 2 && <StepTwo currentStep={step} prevStep={prevStep}/>}
                </AnimatePresence>
                <AnimatePresence
                initial={false}
                mode='wait'>
                    {step == 3 && <StepThree prevStep={prevStep}/>}
                </AnimatePresence>
            </div>
            <button onClick={forward}>forward</button>


        </div>
    )
}

const StepOne = ({ currentStep, prevStep }) => {
    console.log(prevStep);
    const hidden = (prevStep == 1 ? 0 :
        (prevStep == 2) ? -100 : 0
    );

    const variants = {
        hidden: { x: hidden },
        visible: { x: 0 },
        exited: { x: -100 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exited"
            variants={variants} style={{ width: '300px', display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ overflowWrap: 'anywhere' }}>one</p>
        </motion.div>
    )

}

// const StepTwo = ({ currentStep, prevStep }) => {

//     const hidden = (prevStep == 1 ? 100 :
//         (prevStep == 3) ? -100 : 0
//     );

//     const variants = {
//         hidden: { x:  100  },
//         visible: { x: 0 },
//         exited: { x: -100 }
//     };

//     return (
//         <motion.div
//             initial="hidden"
//             animate="visible"
//             exit="exited"
//             variants={variants} style={{ width: '300px', display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
//             <p style={{ overflowWrap: 'anywhere' }}>two</p>
//         </motion.div>
//     )

// }

const StepThree = ({ currentStep, prevStep }) => {

    const variants = {
        hidden: { x: 100 },
        visible: { x: 0 },
        exited: { x: 100 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exited"
            variants={variants} style={{ width: '300px', display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ overflowWrap: 'anywhere' }}>three</p>
        </motion.div>
    )

}

export default MakeMvpVoteModal;