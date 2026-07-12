import { useState } from 'react';

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} vote{votes !== 1 ? "s" : ""}</p>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

// H1 component with given text
const Header = ({ text }) => <h1>{text}</h1>;

const AnecdoteOfTheDay = ({ anecdotes, selected, votes, handleNextAnecdote, handleVotes }) => {
  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote
        text={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button
        onClick={handleVotes}
        text="vote"
      />
      <Button
        onClick={handleNextAnecdote}
        text="next anecdote"
      />
    </div>
  );
};

const MostVotes = ({ anecdotes, votes, index }) => {
  return (
    <div>
      <Header text="Anecdote with most votes" />
      <Anecdote 
        text={anecdotes[index]}
        votes={votes[index]}
      />
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ];
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  
  const handleNextAnecdote = () => {
    let rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  };

  const handleVotes = () => {
    let copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };
  
  const mostVotesIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <AnecdoteOfTheDay 
        anecdotes={anecdotes}
        selected={selected}
        votes={votes}
        handleNextAnecdote={handleNextAnecdote} 
        handleVotes={handleVotes}
      />
      <MostVotes 
        anecdotes={anecdotes}
        votes={votes}
        index={mostVotesIndex}
      />
    </div>
  );
};

export default App;