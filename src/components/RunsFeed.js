import './styles/runs-feed.scss'
import pic from './ChatSettingComponents/piccy.png'
import { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CreateRunsModal from './CreateRunsModal';
import { globalVariables } from '..';
import FeedRun from './FeedRun';
import GlobalSideBar from './GlobalSideBar';
import { Navbar } from './constants';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_ID_FROM_AUTH_ID } from './graphql/queries/UserQueries';


const RunsFeed = () => {
    const parentRef = useRef(null);
    const [isUp, setIsUp] = useState(false);
    const modalRoot = useRef(null);
    const modalDiv = useRef(false);
    const navigate = useNavigate()
    const user = useRef(null);
    const [getUserWithAuthId, data] = useLazyQuery(GET_USER_ID_FROM_AUTH_ID);
    const getUser = useAuth().getUser;
    // IF MODAL IS ALREADY UP MAKE DISPLAY NOT NONE

    useEffect(() => {
        const setUser = async () => {
            if (!user.current) {
                user.current = await getUser();
                const userId = await getUserWithAuthId({
                    variables: {
                        authId: user.current.id
                    }
                });
                if (!user.current) {
                    // console.log(user)
                    console.log("no user");
                    navigate('/login');
                }
                // wait until its done
                console.log(userId.data.getUserWithAuthId._id)
                user.current = { ...user.current, dbId: userId.data.getUserWithAuthId._id }
                // console.log(user.current)

            }
        }
        console.log("run")
        setUser()
    }, [user.current]);

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