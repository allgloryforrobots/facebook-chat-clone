import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from "react-firebase-hooks/firestore"
import './Landing.css'
import regeneratorRuntime from "regenerator-runtime"

import TextField from "@material-ui/core/TextField";
import SignOut from "./SignOut";
import SignIn from "./SignIn";
import ChatMessage from "./ChatMessage";

const firebaseConfig = {
	apiKey: "AIzaSyAqEEtoXfwWBXUoyXe2yULS5ANujlZNz_E",
	authDomain: "facebook-chat-clone-react.firebaseapp.com",
	projectId: "facebook-chat-clone-react",
	storageBucket: "facebook-chat-clone-react.appspot.com",
	messagingSenderId: "402640362652",
	appId: "1:402640362652:web:efdf0f4c9d788c527ae159",
	measurementId: "G-K4L8RJ4EEJ"
}


//Initialize Firebase
if (!firebase.apps.length) {
	try {
		firebase.initializeApp(firebaseConfig)
	} catch (err) {
		console.error('Firebase initialization error raised', err.stack)
	}
}


const auth = firebase.auth()
const firestore = firebase.firestore()

function Landing() {
	const [user] = useAuthState(auth)

	return (
		<div className="App">

			<header>
				{user ? <SignOut/> : null}
			</header>

			<section>
				{user ? <ChatRoom/> : <SignIn/>}
			</section>

		</div>
	)
}

export default Landing

function ChatRoom() {
	const dummy = React.useRef()


	const messagesRef = firestore.collection('messages')
	const query = messagesRef.orderBy('createdAt').limit(25)

	const [messages] = useCollectionData(query, {idField: 'id'})

	const [formValue, setFormValue] = React.useState('')

	const sendMessage = async(e) => {
		e.preventDefault()
		const { uid, photoURL } = auth.currentUser
		await messagesRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoUrl: photoURL || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
		})

		setFormValue('')
		dummy.current.scrollIntoView({ behavior: 'smooth' })
	}


	return (
		<div>
			<main>
				{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

				<div ref={dummy}/>
			</main>

			<div>
				<form onSubmit={sendMessage}>
					<TextField
						id="standard-basic"
						value={formValue}
						onChange={e => setFormValue(e.target.value)}
						label="Отправить сообщение" />

				</form>
			</div>
		</div>
	)
}




