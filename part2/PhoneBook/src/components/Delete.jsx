const Delete = ({ deletePerson, personId }) => {
  return (
    <>
      <button onClick={(e) => deletePerson(e, personId)}> Delete </button>
    </>
  );
};

export default Delete;
