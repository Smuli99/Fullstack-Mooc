import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Note from './Note';
import Notification from './Notification';
import NoteForm from './NoteForm';
import LoginForm from './LoginForm';
import Togglable from './Togglable';

import noteService from '../services/notes';
import loginService from '../services/login';

const NoteList = ({ notes }) => {
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  // const noteFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedNoteappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

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

  // const handleLogout = () => {
  //   window.localStorage.clear();
  //   noteService.setToken('');
  //   setUser(null);
  // };

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm login={login} />
    </Togglable>
  );

  // const noteForm = () => (
  //   <Togglable buttonLabel='new note' ref={noteFormRef}>
  //     <NoteForm createNote={addNote} />
  //   </Togglable>
  // );

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NoteList;