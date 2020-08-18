import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({data}) => {
  const {anecdotes, bestAnecdote, maxVotes, votes, selected, handleClick, handleVote} = data
  return (
    <div>
      <h1> Anecdote of the day. </h1>
      <p> {anecdotes[selected]} </p>
      <p> has {votes[selected]} votes </p>
      <button onClick = {handleVote} >Vote anecdote</button>
      <button onClick = {handleClick} >Next anecdote</button>
      <h1> Anecdote with most votes </h1>
      <p> {bestAnecdote} </p>
      <p> has {maxVotes} votes </p>
    </div>
  )
}

const App = (props) => {
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(10))

  const handleClick = () => {
    setSelected(Math.floor(Math.random()*5))
  }
  const mostVotes = (votes) => {
    let maxVotes = votes.reduce((max,current) => max = (current>max) ? current : max)
    let bestAnecdote = anecdotes[votes.indexOf(maxVotes)]
    return [maxVotes, bestAnecdote]
  }
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes([...copy])
  }

  const data = {
    anecdotes : props.anecdotes,
    bestAnecdote : mostVotes(votes)[1],
    maxVotes : mostVotes(votes)[0],
    votes : votes,
    selected : selected,
    handleClick : handleClick,
    handleVote : handleVote
  }

  return (
    <div>
      <Display data = {data} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more',
  'Adding man power to a late software project makes it later',
  'Any fool can write code that a computer can understand, good programmers write code that humans can understand',
  'Premature optimization is the source of all evil',
  'Debugging is twice as hard as writing the code in the first place'
]

ReactDOM.render( <App anecdotes = {anecdotes} /> , document.getElementById('root'))