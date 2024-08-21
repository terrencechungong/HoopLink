import './styles/create-a-run.scss';
import './styles/add-and-display-users.scss';
import { IoCloseOutline } from "react-icons/io5";
import { useRef, useState } from 'react';
import { TimeComponent, StartDateCalendar } from './RunStartDateAndTime';
import { AnimatePresence } from 'framer-motion';
import pic from './ChatSettingComponents/piccy.png'
import { AddedUserDisplay, AddedUsersDropdown } from './AddUsersDropdown';
import { useEffect } from 'react';
import { isTimeBefore } from './utils/utility';

const CreateRunsModal = ({ closeModalFunction, createRun, userFriends, creatorId }) => {
    const startDateInputRef = useRef(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false)
    const [friendInviteFocused, setFriendInvitesFocused] = useState(false)
    const startDateValSet = useRef(null);
    const startTimeValSet = useRef(null);
    const endTimeValSet = useRef(null);
    const personSeletorRef = useRef(null);
    const [addedUsers, setAddedUsers] = useState([]);
    const [userFocused, setUserFocused] = useState(false);
    const [userOptions, setUserOptions] = useState(userFriends);
    const index = useRef(0);

    useEffect(() => {
        const func = function (event) {
            if (userFocused) { setUserFocused(false) }
        }
        document.addEventListener('click', func);

        return () => {
            document.removeEventListener('click', func);
        };
    });

    const startDateStyle = {
        backgroundColor: 'rgb(201, 223, 255)',
        padding: '4px',
        cursor: 'pointer',
        borderRadius: '7px'
    };
    const buttonStyle = { backgroundColor: 'black',
        color: 'white',
        alignSelf: 'center',
        padding: '8px',
        borderRadius: '4px' }
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
    const createRunHandler = async () => {
        // get data
        if (startDateValSet.current.innerText == 'Start date') {
            alert('Please enter a start date')
            return;
        } 
        if (startTimeValSet.current.innerText == 'Start time') {
            alert('Please enter a start time')
            return;
        } 
        if (endTimeValSet.current.innerText == 'End time') {
            alert('Please enter a end time')
            return;
        } 
        if (!isTimeBefore(startTimeValSet.current.innerText, endTimeValSet.current.innerText)) {
            alert('Start time must be before end times')
            return;
        } 
        const location = document.getElementById('run-location-run-modal').value;
        const runName = document.getElementById('run-name-run-modal').value;
        if (location == "") {
            alert('Please enter a location')
            return;
        }
        if (runName == "") {
            alert('Please enter a location')
            return;
        }

        // worry about location accuracy later, just make it work
        const data = {
            runName: runName,
            runCreator: creatorId,
            startDate: startDateValSet.current.innerText,
            startTime: startTimeValSet.current.innerText,
            endTime: endTimeValSet.current.innerText,
            location: location,
            players: addedUsers.map(user => user._id).concat([creatorId]),
        }
        // call function
        // do something
        await createRun(data);
    }

    const removeFromUserSection = (userId) => {
        const user = addedUsers.find(user => user._id === userId);
        setAddedUsers(addedUsers.filter(user => user._id !== userId));
        if (index.current == 2) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '246px';
        }
        if (index.current == 1) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '126px';
        }
        index.current -= 1;
        // addUserToOptions(user)
    }

    return (
        <div id="create-a-run-modal-container">
            {/* shows calendar */}
            <AnimatePresence
                initial={false}
                mode="wait"
            >
                {showStartTime && <TimeComponent inputRef={startTimeValSet} handleClose={() => setShowStartTime(false)} />}
                {showEndTime && <TimeComponent inputRef={endTimeValSet} handleClose={() => setShowEndTime(false)} />}
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
                        <input id="run-name-run-modal" type="text" placeholder='Ex: Saturday Bump' />
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
                        <label>End Time</label>
                        <div
                            ref={endTimeValSet}
                            onClick={() => setShowEndTime(true)}
                            style={startDateStyle} >End time</div>
                    </div>
                    {/* add end time */}
                    <div className='create-run-content-section'>
                        <label>Location</label>
                        <input id="run-location-run-modal" type="text" placeholder='Court Address...' />
                    </div>
                    <div >

                        <AddedUserDisplay
                            addedUsers={addedUsers}
                            removeFromUserSection={removeFromUserSection}
                            setUserFocused={setUserFocused}
                            modalType={"new run"} />
                        <div style={{ position: 'relative' }}>
                            {userFocused && <AddedUsersDropdown
                                userOptionState={[userOptions, setUserOptions]}
                                addedUsersState={[addedUsers, setAddedUsers]}
                                index={index}
                            />
                            }
                        </div>
                    </div>

                    <br></br>
                    <button onClick={() => createRunHandler()} style={buttonStyle}>Create Run</button>
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