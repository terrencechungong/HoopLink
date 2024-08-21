import './styles/runs-feed.scss'
import { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CreateRunsModal from './CreateRunsModal';
import { globalVariables } from '..';
import FeedRun from './FeedRun';
import GlobalSideBar from './GlobalSideBar';
import { Navbar } from './constants';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { CREATE_RUN_OBJECT_MUTATION } from './graphql/mutations/RunMutations';
import { useMutation } from '@apollo/client';
import { GET_USERS_FRIENDS } from './graphql/queries/UserQueries';
import { GET_USER_RUNS_LIST } from './graphql/queries/RunQueries';

const RunsFeed = () => {
    const parentRef = useRef(null);
    const [isUp, setIsUp] = useState(false);
    const modalRoot = useRef(null);
    const modalDiv = useRef(false);
    const navigate = useNavigate();
    const userObj = JSON.parse(localStorage.getItem('user_object'));
    const { data, loading, error } = useQuery(GET_USERS_FRIENDS, {
        variables: {
            userId: userObj._id
        }
    });
    const { data: runsData, loading: loadingRunsData, error: errorLoadingRunsData } = useQuery(GET_USER_RUNS_LIST, {
        variables: {
            userId: userObj._id
        }
    });
    const [createRunObject, createRunObjectData] = useMutation(CREATE_RUN_OBJECT_MUTATION)

    // IF MODAL IS ALREADY UP MAKE DISPLAY NOT NONE

    useEffect(() => {
        console.log(userObj)

        if (!userObj) {
            navigate('/login')
        }
    })

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
    });

    const createRunExecute = async (data) => {
        await createRunObject({
            variables: {
                run: data
            }
        });


    }

    const showModal = () => {
        let modal = <CreateRunsModal
            closeModalFunction={closeModal}
            createRun={createRunExecute}
            userFriends={data.getUserFriends}
            creatorId={userObj._id}
        />;
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

    if (loadingRunsData || loading) {
        return <p> loading....</p>
    }
    console.log(runsData)
    return (
        <div id="runs-feed-container" ref={parentRef}>
            <GlobalSideBar selected={Navbar.RUNS_FEED} />
            <div id="runs-feed">
                <CreateARun clickFunction={() => showModal()} profilePicure={userObj.profilePhoto} />
                {runsData.getUserRuns.map((run) =>
                    <FeedRun run={run} />
                )}
            </div>
        </div>
    )
}

const CreateARun = ({ clickFunction, profilePicure }) => {
    return (
        <div className='create-a-run'>
            <div className='top-half'>
                <img src={profilePicure} />
                <input
                    type="text"
                    placeholder="Create a new Run"
                    onClick={clickFunction} />
            </div>
        </div>
    )
}

export default RunsFeed;