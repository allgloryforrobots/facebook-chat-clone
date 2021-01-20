import Button from "@material-ui/core/Button";
import firebase from 'firebase/app'
import 'firebase/auth'
import React from 'react'

function SignIn() {
    function githubSignin() {
        var provider = new firebase.auth.GithubAuthProvider()
        firebase.auth().signInWithPopup(provider)

            .then(function(result) {
                var token = result.credential.accessToken
                var user = result.user

                console.log(token)
                console.log(user)
            }).catch(function(error) {
            var errorCode = error.code
            var errorMessage = error.message

            console.log(error.code)
            console.log(error.message)
        })
    }

    return (
        <Button
            onClick={() => githubSignin()}
            color="primary"
            variant="outlined">
            Авторизация
        </Button>
    )
}

export default SignIn