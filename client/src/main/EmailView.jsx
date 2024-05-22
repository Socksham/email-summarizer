import "../index.css";
import {useState} from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import {Stack, Typography, CircularProgress} from '@mui/material';

export default function EmailLoader(callbackStruct) { // EmailID within the database
    const [actions, setActions] = useState();
    const [actionsReady, setActionsReady] = useState(false)

    fetch("email-sysgte.firebaseapp.com/api/recommender", {method: "POST", body: callbackStruct.emailBody}).then(response => {
        console.log(response)
        response.json().then(data => console.log(data), err => console.log(err))
    })

    return (
        <EmailView />
    )
}

function EmailView(email, actions, actionsReady) {
    return (
        <Stack>
            <Typography variant="h4">
                {email.title}
            </Typography>
            <Typography variant="h5">
                Author: {email.author}
            </Typography>
            <Typography variant="body1">
                {email.body}
            </Typography>
            <Stack direction="row">

            </Stack>
        </Stack>
    )
}
