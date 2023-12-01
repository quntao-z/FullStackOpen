const Total = ({ content }) => {
  const total = content.reduce((sum, p) => sum + p.exercises, 0);
  return <h4>total of {total} exercises</h4>;
};

export default Total;
