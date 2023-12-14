import Delete from "./Delete";

const Persons = ({ newFilter, persons, deletePerson }) => {
  return (
    <div>
      {newFilter.length == 0
        ? persons.map((person, i) => (
            <div>
              <div key={i}>
                {" "}
                {person.name + " " + person.number}
                &nbsp;&nbsp;
                <Delete deletePerson={deletePerson} personId={person.id} />
              </div>
            </div>
          ))
        : persons
            .filter((person) => person.name.includes(newFilter))
            .map((person, i) => <div key={i}>{person.name + " " + person.number}</div>)}
    </div>
  );
};

export default Persons;
