import './styles/create-a-post.scss'
import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { IoLocationOutline, IoCloseCircleSharp } from "react-icons/io5";
import { useRef } from 'react';
import ReactDOM from 'react-dom/client'
import CloseFileButton from './CloseFileButton';
import { globalVariables } from '..';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import { AnimatePresence, motion } from 'framer-motion';

const CreatePostModal = ({ closeModalFunction }) => {
    const fileInputRef = useRef(null);
    const addFile = useRef(null);
    const STORE_FILE = 'store-file';
    const STORE_FILE_HEADER = 'store-file-header';
    const [files, setFiles] = useState({})  // { divId: { fileName, fileContent } }   FUCKEDDD
    const [isAnimating, setIsAnimating] = useState(false);
    const [suggLocas, setSuggLocas] = useState([]);
    const [postLoca, setPostLoca] = useState("");
    const [postsIsNone, setPostsIsNone] = useState(false);
    const [locationIsNone, setLocationIsNone] = useState(true);
    const [prevStep, setPrevStep] = useState(0);
    const [filesArray, setFilesArray] = useState([]);

    const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/vnd.microsoft.icon', 'image/apng', 'application/pdf', 'video/mp4',
        'video/webm',
        'video/ogg'];
    const supportedVideoTypes = [
        'video/mp4',
        'video/webm',
        'video/ogg'
    ];
    // maybe just change height

    useEffect(() => {
        if (!locationIsNone) {
            console.log(globalVariables.postsShowingPostsModal)
            const textarea = document.getElementById('expandingTextarea');

            textarea.addEventListener('input', function () {
                // Reset height to allow shrinking
                this.style.height = 'auto';
                // Set the height to the scroll height of the element
                this.style.height = (this.scrollHeight) + 'px';
                console.log(this.style.height);
            });

            const autocomplete = new GeocoderAutocomplete(
                document.getElementById("autocomplete"),
                '120d28881d9141068d5c67d968ae112f',
                { /* Geocoder options */ });

            autocomplete.on('select', (location) => {
                // check selected location here 
            });

            autocomplete.on('suggestions', (suggestions) => {
                setSuggLocas(suggestions.map(s => s.properties.address_line1 + ', ' + s.properties.address_line2))
            });
        }
    }, [locationIsNone]);

    const handleInputChange = (e, manual = null) => {
        let value;
        if (manual !== null) {
            let inputField = document.getElementById('location-text-input');
            value = manual;
            if (inputField) {
                inputField.value = value;
            }
        } else {
            value = e.target.value;
        }

        const input = document.getElementsByClassName('geoapify-autocomplete-input')[0];
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(input, value);
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
        setPostLoca(value);
    }

    const toggleScreen = () => {
        if (postsIsNone) {
            setPrevStep(2);
            setPostsIsNone(false);
            setLocationIsNone(true);
        } else {
            setPrevStep(1);
            setPostsIsNone(true);
            setLocationIsNone(false);
        }
    }

    const addPostSection = () => {
        if (!globalVariables.postsShowingPostsModal) {
            // handleToggle();
        }
        console.log("add post");
        fileInputRef.current.click();
    }

    const addLocation = () => {
        console.log("Add location");
    }

    function waitForTwoSeconds() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    const removeFile = async (divId) => {
        globalVariables.postModalEffect = false;
        if (window.confirm("Are you sure you want to remove this file from the post?")) {
            const childDiv = document.getElementById(divId);
            if (addFile.current && childDiv) {
                addFile.current.removeChild(childDiv);
            }
            console.log(Object.keys(files));
            if (Object.keys(files).includes(divId)) {
                const { [divId]: _, ...newObj } = files;
                console.log(Object.keys(files).length);

                console.log(Object.keys(newObj).length);
            }
        }
        await waitForTwoSeconds();
        globalVariables.postModalEffect = true;
    }

    const createHeader = (file, fileContent, className) => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
       
        // header.className = STORE_FILE_HEADER;
        // let modal = <CloseFileButton divId={timeString} removeFunction={removeFile} />;
        const modalDiv = <div>
             <CloseFileButton divId={timeString} removeFunction={removeFile} />
        </div>
        // let modalRoot = ReactDOM.createRoot(modalDiv);
        // modalRoot.render(modal);
        const header = 
        <div className={STORE_FILE_HEADER}>
            {modalDiv}
        </div>
        // header.appendChild(modalDiv);
        // parent.appendChild(header);
      
        const obj = {
            fileName: file.name,
            fileType: file.type,
            fileContent: fileContent
        };
        setFiles({ ...files, [timeString]: obj });
        console.log(Object.keys(files).length);
        return [header, timeString];
    }

    // do display none for location

    const handleFileChange = (event) => {
        const file = fileInputRef.current.files[0];
        if (file) {
            console.log('Selected file:', file.name);
            // You can now perform actions with the selected file, such as uploading it or reading its content
            if (file && supportedTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (supportedVideoTypes.includes(file.type)) {
                     
                        // const video = document.createElement('video');
                        // video.src = e.target.result;
                        // video.controls = true;
                        // video.style.width = '100%';
                        // const videoContainer = document.createElement('div');
                        // videoContainer.className = STORE_FILE;
                        let childId = createHeader(file, e.target.results);
                        let vid =
                            (<div className={STORE_FILE}   id={childId[1]}>
                                {childId[0]}
                                <video src={e.target.result} controls width="100%">
                                </video>
                            </div>)
                        // videoContainer.appendChild(video);
                        setFilesArray([...filesArray, vid]);
                        console.log(filesArray);
                    } else if (file.type === 'application/pdf') {
                        const pdf = document.createElement('iframe');
                        pdf.src = e.target.result;
                        pdf.style.width = '100%';
                        pdf.style.height = '600px';
                        const pdfContainer = document.createElement('div');
                        pdfContainer.className = STORE_FILE;
                        createHeader(pdfContainer, file, e.target.result);
                        pdfContainer.appendChild(pdf);

                        setFilesArray([...filesArray, pdfContainer]);
                        console.log(filesArray);

                    } else {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = file.name;
                        img.style.maxWidth = '100%'; // Adjust as needed
                        const imgContainer = document.createElement('div');
                        imgContainer.className = STORE_FILE;
                        createHeader(imgContainer, file, e.target.result);
                        imgContainer.appendChild(img);

                        setFilesArray([...filesArray, imgContainer]);
                        console.log(filesArray);

                    }
                };
                reader.readAsDataURL(file);
            } else {
                console.error('Please select a PNG file.');
            }
        }
    };

    // style={{display: (postsIsNone ? 'none' : 'flex')}}
    // style={{display: (locationIsNone ? 'none' : 'flex')}}
    const postsSlideIn = {
        hidden: {
            x: ('-400px')
        },
        visible: {
            x: '0',
            transition: {
                duration: 0.13
            }
        },
        exit: {
            x: ('-425px')
        }

    }

    const locationSlideIn = {
        hidden: {
            x: ('+400px')
        },
        visible: {
            x: '0',
            transition: {
                duration: 0.13
            }
        },
        exit: {
            x: ('+400px')
        }

    }

    return (
        <div id="create-a-post-modal-container">
            <div id="create-a-post-modal">
                <div id="create-a-post-header">
                    <h2><strong>Create A Post</strong></h2>
                    <button onClick={closeModalFunction}><IoCloseOutline size={32} /></button>
                </div>
                <div id="text-area-wrapper">
                    <AnimatePresence
                        initial={false}
                        mode="sync"
                    >
                        {!postsIsNone && <motion.div
                            variants={postsSlideIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit" id="text-area" ref={addFile} >
                            <textarea id="expandingTextarea"></textarea>
                            {filesArray.map((file) => file)}
                        </motion.div>}
                    </AnimatePresence>
                    <AnimatePresence
                        initial={false}
                        mode="sync"
                    >
                        {!locationIsNone && <motion.div id="location-area" variants={locationSlideIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit" >
                            <p>What is your location?</p>
                            <div id="autocomplete" style={{ display: 'none' }}>
                            </div>
                            <input type='text' onChange={handleInputChange} id="location-text-input" />
                            <div>
                                {suggLocas.map((location) => {
                                    return <p className='suggested-loc' onClick={() => handleInputChange("", location)}>{location}</p>
                                })}
                            </div>
                        </motion.div>}
                    </AnimatePresence>
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
                            <button className='transparent-button' onClick={() => toggleScreen()}>
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