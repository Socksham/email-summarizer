import React, { useState, useRef } from 'react';
import { CssBaseline, Container, TextField, Button, Typography, AppBar, Toolbar, IconButton, Slider, Stack, Card, CardContent, CardActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { doc, setDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { useAuth } from '../../context/AuthContext';
import { db } from '../../config/firebase';

import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor
} from "mui-tiptap";

function EmailWriter({compose}) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [suggestions, setSuggestions] = useState([])
  const richText = useRef(null);

  const { user, loading } = useAuth();
  const handleSend = async () => {
    const html = richText.current?.editor?.getHTML()
    await addDoc(collection(db, "inbox"), { // auto-generated id
      subject: subject,
      receiverEmail: to,
      senderEmail: user?.email,
      content: html,
      timestamp: serverTimestamp()
    });
    compose(false)

  };

  const getSuggestions = async () => {
    let obj = {
      content: richText.current?.editor?.getText()
    }
    console.log(obj)
    // richText.current?.editor?.getText() // prompt injection, with a little bit of manipulation
    let response = await fetch("http://localhost:8001/generate-suggestions",
                               {method: "POST",
                                headers: {"Content-Type": "application/json"}, body: JSON.stringify(obj)})
    let js = await response.json()
    setSuggestions(js.suggestions)
  }

  const insertSuggestion = (num) => {
    richText.current?.editor?.commands.insertContent(suggestions[num])
  }

  const renderSuggestion = () => {
    let suggestions_list = suggestions.map((sugg, idx) => (
      <Card key={idx}>
        <CardContent>
          <Typography variant="h5" color="text.primary">
            Suggestion
          </Typography>
          <Typography sx={{color: 'text.secondary'}}>
            {sugg}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => insertSuggestion(idx)}>Insert Suggestion</Button>
        </CardActions>
      </Card>
    ))
    return (
      <Stack direction="row" sx={{color: 'text.secondary'}}>
        {suggestions_list}
      </ Stack>
    )
  };

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Stack>
        <Stack direction="row">
          <Typography variant="h5" gutterBottom>
            New Email
          </Typography>
          <IconButton onClick={() => compose(false)}><CloseIcon /></IconButton>
        </Stack>
        <TextField
          label="To"
          fullWidth
          margin="normal"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <TextField
          label="Subject"
          fullWidth
          margin="normal"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <RichTextEditor
          ref={richText}
          extensions={[StarterKit]} // Or any Tiptap extensions you wish!
          content="<p>Message Body:</p>"
          renderControls={() => (
            <MenuControlsContainer>
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
            </MenuControlsContainer>
          )}
        />
        {renderSuggestion()}
      </Stack>
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
      <Button onClick={() => getSuggestions()}>
        Suggest Tips
      </Button>
      </Container>
    </>
  );
}

export default EmailWriter;
