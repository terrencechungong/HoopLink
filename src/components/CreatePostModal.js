import './styles/create-a-post.scss'
import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

const CreatePostModal = ({ closeModalFunction }) => {

    useEffect(() => {
        const textarea = document.getElementById('expandingTextarea');

        textarea.addEventListener('input', function () {
            // Reset height to allow shrinking
            this.style.height = 'auto';
            // Set the height to the scroll height of the element
            this.style.height = (this.scrollHeight) + 'px';
        });
    })

    return (
        <div id="create-a-post-modal-container">
            <div id="create-a-post-modal">
                <div id="create-a-post-header">
                    <h2><strong>Create A Post</strong></h2>
                    <button onClick={closeModalFunction}><IoCloseOutline size={32} /></button>
                </div>
                <div>
                    <hr></hr>
                </div>
                <div id="text-area">
                    <textarea id="expandingTextarea"></textarea>
                </div>
                <div id="add-to-post-section">
                    Add to your post
                </div>
                <div id="post-button">
                    <button>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePostModal;