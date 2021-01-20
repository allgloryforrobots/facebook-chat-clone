import firebase from 'firebase/app'
import Button from "@material-ui/core/Button"
import 'firebase/auth'
import React from 'react'

function SignOut() {
    function githubSignout(){
        firebase.auth().signOut()

            .then(function() {
                console.log('Signout successful!')
            }, function(error) {
                console.log('Signout failed')
            })
    }

    return firebase.auth().currentUser && (
        <Button
            onClick={() => githubSignout()}
            color="primary"
            variant="outlined">
            Выход
        </Button>
    )
}

export default SignOut