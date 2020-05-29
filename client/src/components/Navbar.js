import React, {useContext, useEffect, useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {UserContext} from "../App";
import M from 'materialize-css'

const NavBar = () => {
    const searchModal = useRef(null)
    const {state, dispatch} = useContext(UserContext)
    const [search, setSearch] = useState("")
    const [userDetails, setUserDetails] = useState([])
    const history = useHistory()

    useEffect(() => {
        M.Modal.init(searchModal.current)
    }, [])

    const renderList = () => {
        if (state) {
            return [
                <li key="1"><i data-target="modal1" className="large material-icons modal-trigger"
                               style={{color: "black"}}>search</i></li>,
                <li key="2"><Link to="/profile">Profile</Link></li>,
                <li key="3"><Link to="/create">Create Post</Link></li>,
                <li key="4"><Link to="/myFollowingPost">My following Posts</Link></li>,
                <li key="5">
                    <button className="btn waves-effect  red darken-2"
                            onClick={() => {
                                localStorage.clear()
                                dispatch({type: "CLEAR"})
                                history.push('/signin')
                            }}>
                        Logout
                    </button>
                </li>
            ]
        } else {
            return [
                <li key="6"><Link to="/signin">Sign in</Link></li>,
                <li key="7"><Link to="/singup">Sign up</Link></li>
            ]
        }
    }

    const fetchUsers = (query) => {
        setSearch(query)
        fetch('/search_user', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query})
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setUserDetails(result.user)
            })
    }

    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/signin"} className="brand-logo left">Jnstagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}
                </ul>
            </div>
            <div id="modal1" className="modal" ref={searchModal} style={{color: "black"}}>
                <div className="modal-content">
                    <input
                        type="text"
                        placeholder="Search user"
                        value={search}
                        onChange={(e => fetchUsers(e.target.value))}
                    />
                    <ul className="collection">
                        {userDetails.map(item => {
                            return <Link to={item._id !== state._id ?
                                "/profile" + item._id : '/profile'}
                                         onClick={() => {
                                             M.Modal.getInstance(searchModal.current).close()
                                         }}>
                                <li className="collection-item">{item.email}</li>
                            </Link>
                        })}

                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat"
                            onClick={() => setSearch('')}>Close
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar