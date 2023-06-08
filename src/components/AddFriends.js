import { ChatRequest } from "../backend/ChatRequest";
import { Home } from "./Home"
import { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContexts";
import axios from "axios";
import { FriendRequests } from "../backend/FriendRequest";
import { auth, database } from "../backend/firebase"
import { ref, set, child, update, remove, orderByChild, equalTo, query, get } from "firebase/database";
import { FriendRequests } from "../backend/FriendRequest";
import { auth, database } from "../backend/firebase"
import { ref, set, child, update, remove, orderByChild, equalTo, query, get } from "firebase/database";

export function AddFriends() {
    const [friends, setFriends] = useState({});
    const [noConnection, setNoConnection] = useState({});
    const [receivedRequests, setReceivedRequests] = useState({});
    const [sentRequests, setSentRequests] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTd, setSelectedTd] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const [noConnection_, sentRequests_, receivedRequests_, friends_, userFullName] = await FriendRequests.getRelationshipData();
            setSentRequests({ data: sentRequests_, show: false });
            setReceivedRequests({ data: receivedRequests_, show: false });
            setFriends({ data: friends_, show: false }); //in friends list
            setNoConnection({ data: noConnection_, show: true }); //not in any list
            setSelectedTd('Recommended Friends')
            setIsLoading(false);
        };

        fetchData().catch((error) => {
            alert("Error occurred: " + error.message);
            console.log(error);
        });
        fetchData().catch((error) => {
            alert("Error occurred: " + error.message);
            console.log(error);
        });
    }, []);

    const selectedTdStyle = { borderBottomColor: "blue", borderBottomWidth: "4px" }

    const showFriends = () => {
        setSentRequests({ data: sentRequests.data, show: false });
        setReceivedRequests({ data: receivedRequests.data, show: false });
        setFriends({ data: friends.data, show: true }); //in friends list
        setNoConnection({ data: noConnection.data, show: false }); //not in any list
    }

    const showNoConnection = () => {
        setSentRequests({ data: sentRequests.data, show: false });
        setReceivedRequests({ data: receivedRequests.data, show: false });
        setFriends({ data: friends.data, show: false }); //in friends list
        setNoConnection({ data: noConnection.data, show: true }); //not in any list
    }

    const showReceivedRequests = () => {
        setSentRequests({ data: sentRequests.data, show: false });
        setReceivedRequests({ data: receivedRequests.data, show: true });
        setFriends({ data: friends.data, show: false }); //in friends list
        setNoConnection({ data: noConnection.data, show: false }); //not in any list
    }

    const showSentRequests = () => {
        setSentRequests({ data: sentRequests.data, show: true });
        setReceivedRequests({ data: receivedRequests.data, show: false });
        setFriends({ data: friends.data, show: false }); //in friends list
        setNoConnection({ data: noConnection.data, show: false }); //not in any list
    }


    const callAddFriend = (i) => { FriendRequests.sendRequest(i, userFullName); }

    const callAccept = (i) => { FriendRequests.acceptRequest(i); }

    const callRemove = (i) => { FriendRequests.removeFriend(i) }

    const callDeny = (i) => { FriendRequests.denyRequest(i) }

    const callWithdraw = (i) => { FriendRequests.withdrawRequest(i) }

    const toggleSelected = (event) => {
        const clickedTd = event.target.innerText;
        if (clickedTd == 'Friends')
            showFriends()
        if (clickedTd == 'Sent Requests')
            showSentRequests()
        if (clickedTd == 'Received Request')
            showReceivedRequests()
        if (clickedTd == 'Recommended Friends')
            showNoConnection()
        setSelectedTd(clickedTd);
    }

    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator or placeholder
    }

    return (
        <div>
            <Home />
            <div className="main-content" id="panel" style={{ width: "60%", margin: "auto" }}>
                <div className="container-fluid pt-3">
                    <div className="card mb-4" >
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <h6>Friends</h6>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <h6>Sent Requests</h6>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <h6>Received Request</h6>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <h6>Recommended Friends</h6>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <tbody>
                                        <tr>
                                            <td onClick={toggleSelected} style={selectedTd === 'Friends' ? selectedTdStyle : {}}>
                                                <div className="d-flex px-2 py-1">
                                                    <h6>Friends</h6>
                                                </div>
                                            </td>
                                            <td onClick={toggleSelected} style={selectedTd === 'Sent Requests' ? selectedTdStyle : {}}>
                                                <div className="d-flex px-2 py-1">
                                                    <h6>Sent Requests</h6>
                                                </div>
                                            </td>
                                            <td onClick={toggleSelected} style={selectedTd === 'Received Request' ? selectedTdStyle : {}}>
                                                <div className="d-flex px-2 py-1">
                                                    <h6>Received Request</h6>
                                                </div>
                                            </td>
                                            <td onClick={toggleSelected} style={selectedTd === 'Recommended Friends' ? selectedTdStyle : {}}>
                                                <div className="d-flex px-2 py-1">
                                                    <h6 >Recommended Friends</h6>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                {friends.show && <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {friends.data.map((person, i) => (
                                            <tr>
                                                <td>
                                                    <div className="d-flex px-2 py-1">
                                                        <div>
                                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard/assets/img/team-2.jpg" className="avatar avatar-sm me-3" />
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm" id={`full_name_${i}`}>{`${person.first_name} ${person.last_lame}`}</h6>
                                                            <p className="text-xs text-secondary mb-0" id={`email_${i}`}>{`${person.email}`}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {/* <p className="text-xs font-weight-bold mb-0">{`${person.chat}`}</p> */}
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <button
                                                        style={{ background: "none", border: "none" }}
                                                    ><span className="badge badge-sm bg-gradient-info">Send Message</span></button>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <button
                                                        style={{ background: "none", border: "none" }}
                                                        onClick={callRemove.bind(null, i)}><span className="badge badge-sm bg-gradient-danger">Remove Friend</span></button>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>}

                                {sentRequests.show && <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sentRequests.data.map((request, i) => (
                                            <tr>
                                                <td>
                                                    <div className="d-flex px-2 py-1">
                                                        <div>
                                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard/assets/img/team-2.jpg" className="avatar avatar-sm me-3" />
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm" id={`full_name_${i}`}>{`${request.reciever_full_name}`}</h6>
                                                            <p className="text-xs text-secondary mb-0" id={`email_${i}`}>{`${request.receiver}`}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {/* <p className="text-xs font-weight-bold mb-0">{`${person.chat}`}</p> */}
                                                </td>
                                                <td className="align-middle text-center text-sm">

                                                </td>
                                                <td className="align-middle text-center">
                                                </td>
                                                <td className="align-middle text-center">
                                                    <button
                                                        style={{ background: "none", border: "none" }}
                                                        onClick={callWithdraw.bind(null, i)}><span className="badge badge-sm bg-gradient-danger">Withdraw</span></button>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>}

                                {receivedRequests.show && <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {receivedRequests.data.map((request, i) => (
                                            <tr>
                                                <td>
                                                    <div className="d-flex px-2 py-1">
                                                        <div>
                                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard/assets/img/team-2.jpg" className="avatar avatar-sm me-3" />
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm" id={`full_name_${i}`}>{`${request.sender_full_name}`}</h6>
                                                            <p className="text-xs text-secondary mb-0" id={`email_${i}`}>{`${request.sender}`}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {/* <p className="text-xs font-weight-bold mb-0">{`${person.chat}`}</p> */}
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <button
                                                        style={{ background: "none", border: "none" }}
                                                        onClick={callAccept.bind(null, i)}><span className="badge badge-sm bg-gradient-success">Accept</span></button>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <button
                                                        style={{ background: "none", border: "none" }}
                                                        onClick={callDeny.bind(null, i)}><span className="badge badge-sm bg-gradient-danger">Ignore</span></button>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>}

                                {noConnection.show && <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Chat</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {noConnection.data.map((person, i) => (
                                            <tr>
                                                <td>
                                                    <div className="d-flex px-2 py-1">
                                                        <div>
                                                            <img src="https://demos.creative-tim.com/soft-ui-dashboard/assets/img/team-2.jpg" className="avatar avatar-sm me-3" />
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm" id={`full_name_${i}`}>{`${person.firstName} ${person.lastName}`}</h6>
                                                            <p className="text-xs text-secondary mb-0" id={`email_${i}`}>{`${person.email}`}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">{`${person.chat}`}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    
                                                </td>
                                                <td className="align-middle text-center">
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <button
                                                        style={{ background: "none", border: "none" }}
                                                        onClick={callAddFriend.bind(null, i)}><span className="badge badge-sm bg-gradient-success">Add Friend</span></button>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* +++++++++++++++++++++++++++++++++++++++++++++++++++ Make a custom footer ++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
            <footer className="footer pt-3 pb-4">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                © 2021, made with
                                <a href="https://www.creative-tim.com/product/soft-ui-dashboard" className="font-weight-bold text-capitalize" target="_blank"> Soft UI Dashboard</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                <li className="nav-item">
                                    <a href="javascript:;" className="nav-link text-muted" target="_blank">Creative Tim</a>
                                </li>
                                <li className="nav-item">
                                    <a href="javascript:;" className="nav-link text-muted" target="_blank">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a href="javascript:;" className="nav-link text-muted" target="_blank">Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a href="javascript:;" className="nav-link pe-0 text-muted" target="_blank">License</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}



//let em send individual chats and see how it looks
//set up game feature next
//learn how to do this with aws
//profile pictures
//requested, sent, etc, etc next