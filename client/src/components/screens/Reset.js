import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import M from "materialize-css";

const Reset = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({html: "Invalid email", classes: "red accent-4"})
            return
        }
        fetch("/resetPassword", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
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
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e => setEmail(e.target.value))}
                />
                <button className="btn waves-effect  blue lighten-2"
                        onClick={() => PostData()}>
                    Reset password
                </button>
            </div>
        </div>
    )
}

export default Reset