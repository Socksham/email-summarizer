import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import {Stack, AppBar, Grid} from '@mui/material';
import EmailList from "./EmailList";
import EmailView from "./EmailView";
import Email from "../components/home/Email";
import LeftBar from "../components/home/LeftBar";
import MainBar from "../components/home/MainBar";
import ShowEmail from "../components/home/ShowEmail";
import { EmailType } from "../types/EmailType";

function Home() {
  const navigate = useNavigate();

  const { user, loading } = useAuth();
  const [emailClicked, setEmailClicked] = useState(true);
  const [emailSelected, setEmailSelected] = useState<EmailType>();

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log(user)
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  }, [user, loading, navigate]);

  async function signout() {
    signOut(auth);
  }

  
  return (
    <div className="h-screen max-h-screen flex bg-black">
      <LeftBar />
      <MainBar setSelected={setEmailSelected}/>

      {
        emailClicked && emailSelected !== undefined &&
        <ShowEmail content={emailSelected!.content} receiverEmail={emailSelected!.receiverEmail} senderEmail={emailSelected!.senderEmail} subject={emailSelected!.subject} timestamp={emailSelected!.timestamp}/>
      }
    </div>
  );
}

export default Home;
