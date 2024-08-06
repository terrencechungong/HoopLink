import './styles/create-a-run.scss'
import { IoCloseOutline } from "react-icons/io5";
import { useRef, useState } from 'react';
import { Calendar } from "@nextui-org/calendar";
import { parseDate } from '@internationalized/date';
import { today, getLocalTimeZone } from "@internationalized/date";
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from './Backdrop';
import { duration } from '@mui/material';

const CreateRunsModal = ({ closeModalFunction }) => {
    const startDateInputRef = useRef(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const startDateValSet = useRef(null)
    const startDateStyle = {
        backgroundColor:'rgb(201, 223, 255)',
        padding: '4px',
        cursor: 'pointer',
        borderRadius: '7px'
    }


    return (
        <div id="create-a-run-modal-container">
            {/* shows calendar */}
            <AnimatePresence
                initial={false}
                mode="wait"
            >
                {showCalendar && <StartDateCalendar inputRef={startDateValSet} handleClose={() => setShowCalendar(false)} />}
            </AnimatePresence>
            <div id="create-a-run-modal">
                <div id="create-a-run-header">
                    <h2><strong>Create A Run</strong></h2>
                    <button onClick={closeModalFunction}><IoCloseOutline size={32} /></button>
                </div>
                <div id="create-run-content">
                    <div className='create-run-content-section'>
                        <label>Run Name</label>
                        <input type="text" placeholder='Ex: Saturday Bump' />
                    </div>
                    <div className='create-run-content-section'>
                        <label>Associated Chat</label>
                        <input type="text" placeholder='gONNA BE LIKE THE META PERSON SELECTOR' />
                    </div>
                    <div className='create-run-content-section' >
                        <label>Start Date</label>
                        <div 
                            ref={startDateValSet}
                            onClick={() => setShowCalendar(true)}
                            style={startDateStyle} >Start date</div>
                    </div>
                    <div className='create-run-content-section'>
                        <label>Start Time</label>
                        <input type="text" placeholder='Start Time' />
                    </div>
                    <div className='create-run-content-section'>
                        <label>Location</label>
                        <input type="text" placeholder='Court Address...' />
                    </div>
                    <div className='create-run-content-section'>
                        <label>Choose Friends to Invite</label>
                        <input type="text" placeholder='gONNA BE LIKE THE META PERSON SELECTOR' />
                    </div>
                    <br></br>
                    <div className='create-run-content-section'>
                        <label>Choose Chats to Invite</label>
                        <input type="text" placeholder='gONNA BE LIKE THE META PERSON SELECTOR' />
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
    )
}

const StartDateCalendar = ({ handleClose, inputRef }) => {
    const dropIn = {
        hidden: {
            y: "+10px"
        },
        visible: {
            y: "0",
            transition: {
                duration: 0.2,
            }
        },
        exit: {
            y: "+10px"
        }
    }

    const formatBeforeParse = (date) => {
        const dateObj = new Date(`${date.year}-${date.month}-${date.day}`);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    }

    return (
        <Backdrop closeModal={(e) => {
            e.stopPropagation();
            handleClose();
        }}>
            <motion.div
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}>
                <Calendar
                    onFocusChange={(date) => { inputRef.current.innerText = (formatBeforeParse(date)) }}
                    defaultValue={today(getLocalTimeZone())}
                    minValue={today(getLocalTimeZone())}
                />
            </motion.div>
        </Backdrop>
    )
}

export default CreateRunsModal;

// run name
// associated chat
// start and end time
// location
// Should post---
// chose friends to invite
// chose chats to invite

// more modals for this stuff