import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from "react-firebase-hooks/firestore"
import './Landing.css'
import regeneratorRuntime from "regenerator-runtime"
import moment from "moment"

import TextField from "@material-ui/core/TextField"
import SignOut from "./SignOut"
import SignIn from "./SignIn"
import ChatMessage from "./ChatMessage"

const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId,
	measurementId: process.env.measurementId,
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
				<h3 style={{position: 'absolute', color: 'black', left: 250}}>Facebook Messenger Clone</h3>
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
		const { uid, photoURL } = firebase.auth().currentUser
		await messagesRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoUrl: photoURL || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			momentDate: moment().format('h:mm')
		})

		setFormValue('')
		dummy.current.scrollIntoView({ behavior: 'smooth' })
	}


	return (
		<div style={{margin: 0, padding: 0}}>
			<main>
				{messages && messages.map((msg, index) => {
					return (
						<div key={msg.id}>
							{
								index % 10 === 0  ? <span>{msg.momentDate}</span> : null
							}
								<ChatMessage  message={msg}/>
						</div>
						)
				})}

				<div ref={dummy}/>
			</main>

			<div>
				<form onSubmit={sendMessage}>
					<TextField
						id="standard-basic"
						value={formValue}
						style={{
							margin: '0 auto',
							width: 700
						}}
						onChange={e => setFormValue(e.target.value)}
						label="Отправить сообщение" />

				</form>
			</div>
		</div>
	)
}




