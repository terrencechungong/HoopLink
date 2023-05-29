import { ChatRequest } from "../backend/ChatRequest";
import { Home } from "./Home"
import { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContexts";
import axios from "axios";

export function AddFriends() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        let allPeople = []
        // Make the API request
        axios.get('https://api.chatengine.io/chats/', {
            headers: {
                "project-id": "02a9053b-e45f-463f-9628-a8ea4b4f4164",
                "user-name": user.email,
                "user-secret": user.uid
            }
        }).then((response) => {
            for (var chats of response.data) {
                //avoid duplicates
                for (var personData of chats.people) {
                    allPeople.push({ "firstName": personData.person.first_name, "lastName": personData.person.last_name, "email": personData.person.username, "chat": chats.title })
                }
            }
            setData(allPeople)
            setIsLoading(false)
        })
            .catch((error) => {
                alert("Nah bro")
                console.log(error.message)
            })

        //api call logic
    }, []);

    const callAddFriend = (i) => {
        ChatRequest.addFriend(i, data, user);
    }

    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator or placeholder
    }

    //Use states to set page settings



    return (
        <div>
            <Home />
            <div className="main-content" id="panel" style={{ width: "60%", margin: "auto" }}>
                <div className="container-fluid pt-3">
                    <div className="card mb-4">
                        <div className="card-header pb-0" style={{ display: "inline", }}>
                            <h6 style={{ display: "inline", cursor: "pointer" }}>Friends&nbsp;</h6>
                            <h6 style={{ display: "inline", cursor: "pointer" }}>&nbsp;Sent Requests&nbsp;</h6>
                            <h6 style={{ display: "inline", cursor: "pointer" }}>&nbsp;Received Request&nbsp;</h6>
                            <h6 style={{ display: "inline", cursor: "pointer" }}>&nbsp;Recommended Friends&nbsp;</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Chat</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                            <th className="text-secondary opacity-7"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((person, i) => (
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
                                                    <button
                                                        style={{ background: "none", border: "none" }}
                                                        onClick={callAddFriend.bind(null, i)}><span className="badge badge-sm bg-gradient-success">Add Friend</span></button>
                                                </td>
                                                <td className="align-middle text-center">
                                                    <span className="text-secondary text-xs font-weight-bold">Figure out</span>
                                                </td>
                                                <td className="align-middle">
                                                    <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                        Figure out
                                                    </a>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
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