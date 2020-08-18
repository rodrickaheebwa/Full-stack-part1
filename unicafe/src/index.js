import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = () => <h1>Give Feedback</h1>

const Button = ({text, handleClick}) => <button onClick = {handleClick} > {text} </button>

const Buttons = ({data}) => {
  return (
    <div>
      <Button text = {data.good.text} handleClick = {data.good.handleClick} />
      <Button text = {data.neutral.text} handleClick = {data.neutral.handleClick} />
      <Button text = {data.bad.text} handleClick = {data.bad.handleClick} />
    </div>
  )
}

const Display = () => <h2>Statistics</h2>

const Statistic = ({text, value}) =>   <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({data}) => {
  if(data.total.value <= 0) return ( <div>No feedback given.</div> )
  return (
    <div>
      <table>
        <tbody>
          <Statistic text = {data.good.text} value = {data.good.value} />
          <Statistic text = {data.neutral.text} value = {data.neutral.value} />
          <Statistic text = {data.bad.text} value = {data.bad.value} />
          <Statistic text = {data.total.text} value = {data.total.value} />
          <Statistic text = {data.average.text} value = {data.average.value} />
          <Statistic text = {data.positive.text} value = {data.positive.value + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setTotal(total + 1)
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setTotal(total + 1)
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setTotal(total + 1)
    setBad(bad + 1)
  }

  const data = {
    good : { text : 'good' , value : good , handleClick : handleGood },
    bad : { text : 'bad' , value : bad , handleClick : handleBad },
    neutral : { text : 'neutral' , value : neutral , handleClick : handleNeutral },
    total : {text : 'all' , value : total },
    average : {text: 'average', value : ((good - bad)/total) },
    positive : {text : 'positive', value : (good/total * 100) }
  }

  return(
    <div>
      <Header/>
      <Buttons data = {data} />
      <Display/>
      <Statistics data = {data} />
    </div>
  )
}

ReactDOM.render( <App />, document.getElementById('root'))