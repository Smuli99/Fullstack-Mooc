import { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Button } from '@mui/material';

import noteService from './services/notes';
import NoteList from './components/NoteList';
import Home from './components/Home';
import Footer from './components/Footer';
import NoteForm from './components/NoteForm';
import Note from './components/Note';
import Notification from './components/Notification';

import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await noteService.getAll();
      setNotes(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedNoteappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = async (noteObject) => {
    try {
      const savedNote = await noteService.create(noteObject);
      setNotes(note.concat(savedNote));
      setNotification({
        text: `Note '${savedNote.content}' added!`,
        type: 'success'
      });
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await noteService.remove(id);
      setNotes(notes.filter(n => n.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleImportanceOf = async (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    try {
      const updatedNote = await noteService.update(id, changedNote);
      setNotes(notes.map(note => note.id !== id ? note : updatedNote));
    } catch (error) {
      setNotification({
        text: `Note '${note.content}' was already removed from server`,
        type: 'error'
      });
      setTimeout(() => setNotification(null), 5000);
      console.log('Error:', error.message);
    }
  };

  const match = useMatch('/notes/:id');
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null;

  const style = { '&:hover' : { bgcolor: 'rgba(255,255,255,0.3)' } };

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/' sx={style}>
            home
          </Button>
          <Button color='inherit' component={Link} to='/notes' sx={style}>
            notes
          </Button>
          <Button color='inherit' component={Link} to='/create' sx={style}>
            new note
          </Button>
        </Toolbar>
      </AppBar>

      <Notification notification={notification} />

      <Routes>
        <Route path="/notes" element={
          <NoteList notes={notes} />
        } />
        <Route path="/notes/:id" element={
          <Note
            note={note}
            toggleImportanceOf={toggleImportanceOf}
            deleteNote={deleteNote}
          />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote}/>
        } />
        <Route path="/" element={
          <Home />
        } />
      </Routes>

      <Footer />
    </Container>
  );
};

export default App;