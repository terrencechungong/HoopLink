import './styles/runs-feed.scss'
import pic from './ChatSettingComponents/piccy.png'
import { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CreateRunsModal from './CreateRunsModal';
import { globalVariables } from '..';
import FeedRun from './FeedRun';
import GlobalSideBar from './GlobalSideBar';
import { Navbar } from './constants';

const RunsFeed = () => {
    const parentRef = useRef(null);
    const [isUp, setIsUp] = useState(false);
    const modalRoot = useRef(null);
    const modalDiv = useRef(false);

    let feedRuns = [];
    for (let i = 0; i <= 40; i++) {
        feedRuns.push(<FeedRun />);
    }

    const closeModal = () => {
        parentRef.current.removeChild(parentRef.current.firstChild);  // Remove the DOM element
        globalVariables.createRunsModalEffect = false;
        setIsUp(false);
    }

    useEffect(() => {
        globalVariables.createRunModalHasBeenShown = false;
        const func = function (event) {
            if (globalVariables.createRunsModalEffect === true) {
                const middleDiv = document.getElementById('create-a-run-modal');
                // console.log(event.target);
                if (middleDiv) {
                    if (isUp === false) {
                        setIsUp(true);
                        return;
                    }
                    if (!middleDiv.contains(event.target)) {
                        closeModal();
                    }
                }
            }
        }
        document.addEventListener('click', func);
        return () => {
            document.removeEventListener('click', func);
        };
    })

    const showModal = () => {
        let modal = <CreateRunsModal closeModalFunction={closeModal} />;
        if (globalVariables.createRunModalHasBeenShown == false) {
            modalDiv.current = document.createElement('div');
            modalDiv.current.id = "runs-modal-div-root";
            modalRoot.current = ReactDOM.createRoot(modalDiv.current);
            modalRoot.current.render(modal);
            globalVariables.createRunModalHasBeenShown = true;
        }
        if (parentRef.current !== null) {
            console.log(parentRef.current)
            parentRef.current.insertBefore(modalDiv.current, parentRef.current.firstChild);
            globalVariables.createRunsModalEffect = true;
        }
       
    }


    return (
        <div id="runs-feed-container" ref={parentRef}>
            <GlobalSideBar selected={Navbar.RUNS_FEED}/>
            <div id="runs-feed">
                <CreateARun clickFunction={() => showModal()} />
                {feedRuns}
            </div>
        </div>
    )
}

const CreateARun = ({ clickFunction }) => {
    return (
        <div className='create-a-run'>
            <div className='top-half'>
                <img src={pic} />
                <input
                    type="text"
                    placeholder="Create a new Run"
                    onClick={clickFunction} />
            </div>
        </div>
    )
}

export default RunsFeed;