const Persons = ({ newFilter, persons }) => {
  return (
    <div>
      {newFilter.length == 0
        ? persons.map((person, i) => (
            <div key={i}> {person.name + " " + person.number}</div>
          ))
        : persons
            .filter((person) => person.name.includes(newFilter))
            .map((person, i) => (
              <div key={i}>{person.name + " " + person.number}</div>
            ))}
    </div>
  );
};

export default Persons;
