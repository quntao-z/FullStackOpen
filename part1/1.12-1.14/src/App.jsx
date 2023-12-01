import { useState } from "react";

const MostVotesAncedote = ({ anecdotes, allVotes }) => {
  const mostVotes = Math.max(...allVotes);
  const indexOfMostVotes = allVotes.indexOf(mostVotes);

  return (
    <>
      {anecdotes[indexOfMostVotes]}
      <div />
      has vote {mostVotes}
    </>
  );
};

const App = () => {
  const anecdotesAndVotes = {
    "If it hurts, do it more often.": 0,
    "Adding manpower to a late software project makes it later!": 0,
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.": 0,
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.": 0,
    "Premature optimization is the root of all evil.": 0,
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.": 0,
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.": 0,
    "The only way to go fast, is to go well.": 0,
  };

  const anecdotes = Object.keys(anecdotesAndVotes);
  const votes = Object.values(anecdotesAndVotes);

  const [selected, setSelected] = useState(0);
  const [allVotes, setAllVotes] = useState(votes);

  const handleAnecdotes = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const copyVotes = [...allVotes];
    copyVotes[selected] += 1;
    setAllVotes(copyVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div />
      has vote {allVotes[selected]}
      <div />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleAnecdotes}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <MostVotesAncedote anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  );
};

export default App;
