import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import M from "materialize-css";

const NewPassword = () => {
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = () => {
        if (newPassword !== password) {
            M.toast({html: "Password is not match", classes: "red accent-4"})
            return
        }

        fetch("/newPassword", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                token
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({html: data.error, classes: "red accent-4"})
                } else {
                    M.toast({html: data.message, classes: "green darken-1"})
                    history.push('/signin')
                }
            }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>Jnstagram</h2>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e => setPassword(e.target.value))}
                />
                <input
                    type="password"
                    placeholder="Enter again"
                    value={newPassword}
                    onChange={(e => setNewPassword(e.target.value))}
                />
                <button className="btn waves-effect  blue lighten-2"
                        onClick={() => PostData()}>
                    Change Password
                </button>
            </div>
        </div>
    )
}

export default NewPassword