import './styles/create-a-run.scss'
import { IoCloseOutline } from "react-icons/io5";
import { useRef, useState } from 'react';
import { TimeComponent, StartDateCalendar } from './RunStartDateAndTime';
import { AnimatePresence } from 'framer-motion';

const CreateRunsModal = ({ closeModalFunction }) => {
    const startDateInputRef = useRef(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);

    const startDateValSet = useRef(null);
    const startTimeValSet = useRef(null)

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
                {showStartTime && <TimeComponent inputRef={startTimeValSet} handleClose={() => setShowStartTime(false)} />}
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
                        <div 
                            ref={startTimeValSet}
                            onClick={() => setShowStartTime(true)}
                            style={startDateStyle} >Start time</div>
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


export default CreateRunsModal;

// run name
// associated chat
// start and end time
// location
// Should post---
// chose friends to invite
// chose chats to invite

// more modals for this stuff