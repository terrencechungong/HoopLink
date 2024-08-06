import './styles/create-a-run.scss'
import { IoCloseOutline } from "react-icons/io5";
import { useRef, useState } from 'react';
import { TimeComponent, StartDateCalendar } from './RunStartDateAndTime';
import { AnimatePresence } from 'framer-motion';
import pic from './ChatSettingComponents/piccy.png'

const CreateRunsModal = ({ closeModalFunction }) => {
    const startDateInputRef = useRef(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [friendInviteFocused, setFriendInvitesFocused] = useState(false)
    const startDateValSet = useRef(null);
    const startTimeValSet = useRef(null);
    const personSeletorRef = useRef(null);

    const startDateStyle = {
        backgroundColor: 'rgb(201, 223, 255)',
        padding: '4px',
        cursor: 'pointer',
        borderRadius: '7px'
    }
    // fix
    let peopleOptions = [];
    for (let i = 0; i <= 4; i++) {
        peopleOptions.push(
            <div data-key={`${i}`} className='individual-dropdown-selection'
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation()
                    personSeletorRef.current.focus();
                    console.log(Number(e.currentTarget.getAttribute('data-key')));
                    peopleOptions.splice(Number(e.currentTarget.getAttribute('data-key')), 1)
                }}
            >
                <img src={pic} />
                <p>
                   {`${i}`}
                </p>
            </div>)
    }

    // keep div focused


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

            <div id="create-a-run-modal" onClick={() => setFriendInvitesFocused(false)}>
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
                    {/* add end time */}
                    <div className='create-run-content-section'>
                        <label>Location</label>
                        <input type="text" placeholder='Court Address...' />
                    </div>
                    <div className='create-run-content-section' style={{ position: 'relative' }}>
                        <label>Choose Friends to Invite</label>
                        <div className="editable-friends-to-invite-div" contentEditable={true}
                            tabIndex={0} ref={personSeletorRef} type="text" placeholder='gONNA BE LIKE THE META PERSON SELECTOR' onClick={(e) => {
                                e.stopPropagation()
                                setFriendInvitesFocused(true)}}></div>
                        {friendInviteFocused && <div className='selection-options-dropdown' onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation()
                            personSeletorRef.current.focus();
                        }}>
                            {peopleOptions}
                        </div>}
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