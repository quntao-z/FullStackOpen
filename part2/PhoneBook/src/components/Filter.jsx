const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with
      <input value={newFilter} onChange={(e) => handleFilterChange(e)} />
    </div>
  );
};

export default Filter;
