import './styles/create-a-post.scss'
import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useRef } from 'react';

const CreatePostModal = ({ closeModalFunction }) => {
    const reachedMax = useRef(false);
    const fileInputRef = useRef(null);
    const addFile = useRef(null);
    const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/vnd.microsoft.icon', 'image/apng', 'application/pdf'];

    useEffect(() => {
        const textarea = document.getElementById('expandingTextarea');

        textarea.addEventListener('input', function () {
            // Reset height to allow shrinking
            this.style.height = 'auto';
            // Set the height to the scroll height of the element
            this.style.height = (this.scrollHeight) + 'px';
            console.log(this.style.height);
        });
    });

    const addPostSection = () => {
        console.log("add post");
        fileInputRef.current.click();
    }

    const addLocation = () => {
        console.log("Add location");
    }

    const handleFileChange = (event) => {
        const file = fileInputRef.current.files[0];
        if (file) {
            console.log('Selected file:', file.name);
            // You can now perform actions with the selected file, such as uploading it or reading its content
            if (file && supportedTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (file.type === 'application/pdf') {
                        const pdf = document.createElement('iframe');
                        pdf.src = e.target.result;
                        pdf.style.width = '100%';
                        pdf.style.height = '600px';

                        const pdfContainer = document.createElement('div');
                        pdfContainer.appendChild(pdf);

                        if (addFile.current) {
                            addFile.current.appendChild(pdfContainer);
                        }
                    } else {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = file.name;
                        img.style.maxWidth = '100%'; // Adjust as needed

                        const imgContainer = document.createElement('div');
                        imgContainer.appendChild(img);

                        if (addFile.current) {
                            addFile.current.appendChild(imgContainer);
                        }
                    }
                };
                reader.readAsDataURL(file);
            } else {
                console.error('Please select a PNG file.');
            }
        }
    };

    return (
        <div id="create-a-post-modal-container">
            <div id="create-a-post-modal">
                <div id="create-a-post-header">
                    <h2><strong>Create A Post</strong></h2>
                    <button onClick={closeModalFunction}><IoCloseOutline size={32} /></button>
                </div>
                <div id="text-area" ref={addFile}>
                    <textarea id="expandingTextarea"></textarea>

                </div>
                <div id="bottom-section">
                    <div id="add-to-post-section">
                        <div>
                            Add to your post
                        </div>
                        <div id="add-to-post-buttons">
                            <button className='transparent-button' onClick={addPostSection}>
                                <MdOutlineAddToPhotos size={28} />
                            </button>
                            <button className='transparent-button' onClick={addLocation}>
                                <IoLocationOutline size={28} />
                            </button>
                            <input style={{ display: 'none' }} type='file' ref={fileInputRef} onChange={handleFileChange} />
                        </div>
                    </div>
                    <div id="post-button">
                        <button>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePostModal;