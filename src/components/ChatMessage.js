import React from "react"
import firebase from "firebase"
import 'firebase/auth'

function ChatMessage(props) {
    const {text, uid, photoUrl} = props.message
    const messageClass = uid === firebase.auth().currentUser.uid ? 'sent' : 'received'

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoUrl}
                 alt=""/>
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage