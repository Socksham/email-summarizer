import "../index.css";
import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import {Stack, Typography} from '@mui/material';

export default function EmailList({emailInfo}) {
    const generateMails = emailInfo.map((email) => {
        return (
            <Stack>
                <Typography variant="h5">
                    {email.title}
                </Typography>
                <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }} variant="body1">
                    {email.preview}
                </Typography>
            </Stack>
        )
    })
    return (
        <Stack>
            {generateMails}
        </Stack>
    )
}
