// got to top of page and disable scrolling when doing post uis

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
import { ThreeDots } from 'react-loader-spinner';
import { waitForNSeconds } from './utils/utility';
import { useNavigate } from 'react-router-dom';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiError } from "react-icons/bi";
import { updateUserObj } from '../supabase-conf/authUtils';

const CreatePostModal = ({ closeModalFunction, filesState, captionState, textAreaHeightState, uploadPost, fileData, captionRef, postLocation }) => {
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
    const [filesArray, setFilesArray] = filesState;
    const [localFilesArray, setLocalFilesArray] = useState(filesArray)
    const [caption, setCaption] = captionState;
    const [textAreaHeight, setTextAreaHeight] = textAreaHeightState;
    const textAreaRef = useRef(null);  // Creates a ref object
    const [posting, setPosting] = useState(false);
    const [postSuccessful, setPostSuccessFul] = useState(false);
    const [postError, setPostError] = useState(false);
    const refreshOnClick = useRef(null);

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
        if (textAreaRef.current) {
            textAreaRef.current.value = captionRef.current;
            textAreaRef.current.style.height = textAreaHeight;
        }
        if (!postsIsNone) {
            console.log(globalVariables.postsShowingPostsModal)
            const textarea = document.getElementById('expandingTextarea');

            textarea.addEventListener('input', function () {
                // Reset height to allow shrinking
                this.style.height = 'auto';
                // Set the height to the scroll height of the element
                this.style.height = (this.scrollHeight) + 'px';
                setTextAreaHeight(this.style.height);
                console.log(this.style.height);
            });
        }
        if (!locationIsNone) {
            const autocomplete = new GeocoderAutocomplete(
                document.getElementById("autocomplete"),
                '120d28881d9141068d5c67d968ae112f',
                { /* Geocoder options */ });

            autocomplete.on('select', (location) => {
                console.log(location);
            });

            autocomplete.on('suggestions', (suggestions) => {
                setSuggLocas(suggestions.map(s => s.properties.address_line1 + ', ' + s.properties.address_line2))
            });
            if (postLocation.current !== "") {
                handleInputChange("", postLocation.current);
            }
        }
    }, [locationIsNone, postsIsNone]);

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
            postLocation.current = value;
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

    const handleUploadPost = async () => {
        setPosting(true);
        const postCompleted = await uploadPost();
        // show something for erro and success
        //
        if (postCompleted) {
            setPosting(false);
            setPostSuccessFul(true);
            await waitForNSeconds(0.7);
            refreshOnClick.current.click();
        } else {
            setPosting(false);
            setPostError(true);
            await waitForNSeconds(0.7);
            setPostError(false)
            setPostsIsNone(false);
        }
    }
    // 9254683000
    // 7134079848 
    //altairmeta@mycwt.com


    const addPostSection = () => {
        if (postsIsNone) {
            toggleScreen();
        }
        console.log("add post");
        fileInputRef.current.click();
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

    const createHeader = (file, fileContent) => {
        const now = new Date();
        const id = now.toLocaleTimeString('en-US', { hour12: false });
        const header =
            <div className={STORE_FILE_HEADER}>
                <div>
                    <CloseFileButton divId={id} removeFunction={removeFile} />
                </div>
            </div>
        const obj = {
            fileName: file.name,
            fileType: file.type,
            fileContent: fileContent
        };
        setFiles({ ...files, [id]: obj });
        return {
            header,
            id
        };
    }


    const handleFileChange = (event) => {
        const file = fileInputRef.current.files[0];
        if (file) {
            console.log('Selected file:', file.name);
            // You can now perform actions with the selected file, such as uploading it or reading its content
            if (file && supportedTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    let fileContentSection;
                    let componentValues = createHeader(file, e.target.results);
                    if (supportedVideoTypes.includes(file.type)) {
                        fileContentSection = <video src={e.target.result} controls width="100%"></video>
                    } else if (file.type === 'application/pdf') {
                        fileContentSection = <iframe style={{ width: '100%', height: '200px' }} src={e.target.result}></iframe>
                    } else {
                        fileContentSection = <img src={e.target.result} alt={file.name} style={{ maxWidth: '100%' }} />
                    }
                    let fileSection = (
                        <div className={STORE_FILE} id={componentValues.id}>
                            {componentValues.header}
                            {fileContentSection}
                        </div>)
                    setFilesArray([...filesArray, fileSection]);
                    setLocalFilesArray([...localFilesArray, fileSection]);
                    fileData.current.push(file);
                };
                reader.readAsDataURL(file);
            } else {
                console.error('Please select a valid file file.');
            }
        }
    };

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
                {/* <div className='test'>fdfdfdf</div> */}
                <div id="create-a-post-header">
                    <h2><strong>Create A Post</strong></h2>
                    <button onClick={closeModalFunction}><IoCloseOutline size={30} /></button>
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
                            <textarea
                                ref={textAreaRef}
                                id="expandingTextarea"
                                onInput={(e) => {
                                    setCaption(textAreaRef.current.value);
                                    captionRef.current = textAreaRef.current.value;
                                    console.log(textAreaRef.current.value)
                                }}></textarea>
                            {localFilesArray.map((file) => file)}
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
                    {(posting) &&
                        <div id="posting-in-progress">
                            Your Post is being uploaded
                            <ThreeDots
                                visible={true}
                                height="80"
                                width="80"
                                color="rgb(0, 102, 255)"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>

                    }
                    {(postSuccessful) &&
                        <div id="posting-success">
                            Post successful!
                            <IoIosCheckmarkCircleOutline />

                        </div>
                    }
                    {(postError) &&
                        <div id="posting-error">
                            There was an issue uploading your post, please try again.
                            <BiError />
                        </div>
                    }
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
                        <button onClick={() => handleUploadPost()}>Post</button>
                    </div>
                </div>
            </div>
            <a ref={refreshOnClick} href="/feed" style={{display:'none'}}></a>
        </div>
    )
}

export default CreatePostModal;