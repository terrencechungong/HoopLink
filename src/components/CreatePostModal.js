import './styles/create-a-post.scss'
import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { IoLocationOutline, IoCloseCircleSharp  } from "react-icons/io5";
import { useRef } from 'react';
import ReactDOM from 'react-dom/client'
import CloseFileButton from './CloseFileButton';

const CreatePostModal = ({ closeModalFunction }) => {
    const reachedMax = useRef(false);
    const fileInputRef = useRef(null);
    const addFile = useRef(null);
    const STORE_FILE = 'store-file';
    const STORE_FILE_HEADER = 'store-file-header';

    const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/vnd.microsoft.icon', 'image/apng', 'application/pdf', 'video/mp4',
        'video/webm',
        'video/ogg'];
    const supportedVideoTypes = [
        'video/mp4',
        'video/webm',
        'video/ogg'
    ];

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

    const createHeader = (parent) => {
        const header = document.createElement('div');
        header.className = STORE_FILE_HEADER;
        let modal = <CloseFileButton/>;
        const modalDiv = document.createElement('div');
        let modalRoot = ReactDOM.createRoot(modalDiv);
        modalRoot.render(modal);
        header.appendChild(modalDiv);
        parent.appendChild(header);
    }

    const handleFileChange = (event) => {
        const file = fileInputRef.current.files[0];
        if (file) {
            console.log('Selected file:', file.name);
            // You can now perform actions with the selected file, such as uploading it or reading its content
            if (file && supportedTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (supportedVideoTypes.includes(file.type)) {
                        const video = document.createElement('video');
                        video.src = e.target.result;
                        video.controls = true;
                        video.style.width = '100%';
                        const videoContainer = document.createElement('div');
                        videoContainer.className = STORE_FILE;
                        createHeader(videoContainer);
                        videoContainer.appendChild(video);
                        addFile.current.appendChild(videoContainer);
                    } else if (file.type === 'application/pdf') {
                        const pdf = document.createElement('iframe');
                        pdf.src = e.target.result;
                        pdf.style.width = '100%';
                        pdf.style.height = '600px';

                        const pdfContainer = document.createElement('div');
                        pdfContainer.className = STORE_FILE;
                        createHeader(pdfContainer);
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
                        imgContainer.className = STORE_FILE;
                        createHeader(imgContainer);
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