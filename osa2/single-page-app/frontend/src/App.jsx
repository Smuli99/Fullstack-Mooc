import { useEffect, useState, useRef } from 'react';

import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';
import NoteForm from './components/NoteForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = 
      window.localStorage.getItem('loggedNoteappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);
  
  const addNote = async (note) => {
    try {
      noteFormRef.current.toggleVisibility();
      const savedNote = await noteService.create(note);
      setNotes(notes.concat(savedNote));
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important === true);

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
        console.log(error);
      });
  };

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );

      noteService.setToken(user.token);
      setUser(user);
    } catch {
      setErrorMessage('wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    noteService.setToken('');
    setUser(null);
  };

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm login={login} />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  );
};

export default App;