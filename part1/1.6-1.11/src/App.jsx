import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticsLine = ({ statName, stats }) => (
  <p>
    {statName} {stats}
  </p>
);

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <>
        <StatisticsLine statName={"good"} stats={props.good} />
        <StatisticsLine statName={"neutral"} stats={props.neutral} />
        <StatisticsLine statName={"bad"} stats={props.bad} />
        <StatisticsLine statName={"all"} stats={props.all} />
        <StatisticsLine statName={"average"} stats={props.average} />
        <StatisticsLine statName={"positive"} stats={props.positive} />
      </>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleStatClick = (buttonName) => {
    if (buttonName === "good") {
      setGood(good + 1);
    } else if (buttonName === "neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
    setAll(all + 1);
  };

  const calculateAverage = () => {
    return (good - bad) / all;
  };

  const calculatePositive = () => {
    return (good / all) * 100 + " %";
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleStatClick("good")} text="good" />
      <Button handleClick={() => handleStatClick("neutral")} text="neutral" />
      <Button handleClick={() => handleStatClick("bad")} text="bad" />
      <h1>statistics</h1>
      <Statistics
        all={all}
        good={good}
        neutral={neutral}
        bad={bad}
        average={calculateAverage()}
        positive={calculatePositive()}
      />
    </div>
  );
};

export default App;
