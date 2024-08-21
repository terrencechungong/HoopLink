import { concatNameForDropDown } from "./utils/utility";
import { IoCloseCircleOutline } from "react-icons/io5";

export const AddedUsersDropdown = ({ userOptionState, addedUsersState, index }) => {
    const [addedUsers, setAddedUsers] = addedUsersState;
    const [userOptions, setUserOptions] = userOptionState;


    const addUserToSection = (userId) => {
        if (index.current == 0) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '246px';
        }
        if (index.current == 1) {
            const userSection = document.getElementById(`added-members-to-section`);
            userSection.style.width = '366px';
        }
        const user = userOptions.find(user => user._id === userId);
        setAddedUsers((prev) => [...prev, user]);
        index.current += 1;
        // removeUserFromOptions(userId)
    }




    return (
        <div className='selection-options-added-members' onClick={(e) => {
            e.preventDefault();
            e.stopPropagation()
        }}>
            {userOptions.filter(userOption => !addedUsers.some(addedUser => addedUser._id === userOption._id))
                .map((user, index) =>
                    <div key={user._id} id={`user-${index}`} className='individual-dropdown-selection'
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addUserToSection(user._id);
                        }}
                    >
                        <img src={user.profilePhoto} />
                        <p>
                            {`${concatNameForDropDown(user.username)}`}
                        </p>
                    </div>)}
        </div>
    )
}


export const AddedUserDisplay = ({ addedUsers, removeFromUserSection, setUserFocused, modalType }) => {

    return (
        <div>
            <h2><strong>Add members to your {modalType}: </strong></h2>
            <div id='added-members-to-section'>
                {addedUsers.map((user, index) => (
                    <div key={user._id} id={`added-person-${index}`} className='individual-dropdown-selection'
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation()
                            // removeUserFromOptions(user._id)
                        }}
                    >
                        <img src={user.profilePhoto} />
                        <p>
                            {`${concatNameForDropDown(user.username)}`}
                        </p>
                        <IoCloseCircleOutline size={15} onClick={() => { removeFromUserSection(user._id) }} />
                    </div>
                ))}
                <div className='individual-dropdown-selection'
                    onClick={(e) => {
                        setUserFocused(true);
                        e.stopPropagation()
                        e.stopPropagation()
                    }}
                >
                    <p>Choose friends to add</p>
                </div>
            </div>
        </div>
    )
}

