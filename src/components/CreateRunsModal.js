import './styles/create-a-run.scss'
import { IoCloseOutline } from "react-icons/io5";

const CreateRunsModal = ({ closeModalFunction }) => {
    return (
        <div id="create-a-run-modal-container">
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
                        <input type="text" placeholder='Dropdoen' />
                    </div>
                    <div className='create-run-content-section'>
                        <label>Start Time</label>
                        <input type="text" placeholder='Start Time' />
                    </div>
                    <div className='create-run-content-section'>
                        <label>Location</label>
                        <input type="text" placeholder='Location' />
                    </div>
                    <div className='create-run-content-section'>
                        <label>Create Post</label>
                        <input type="text" placeholder='YES OR NO BUTTON' />
                    </div>
                    <br></br>
                    <div className='create-run-content-section'>
                        <label>Choose Friends to Invite</label>
                        <input type="text" placeholder='YES OR NO BUTTON' />
                    </div>
                    <br></br>
                    <div className='create-run-content-section'>
                        <label>Choose Chats to Invite</label>
                        <input type="text" placeholder='YES OR NO BUTTON' />
                    </div>
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