import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/persons";
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const checkPersonObject = persons.find((person) => person.name === newName);
    if (typeof checkPersonObject != "undefined") {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const newPersonObject = { ...checkPersonObject, number: newNumber };
        personService.update(checkPersonObject.id, newPersonObject).then((returnPerson) => {
          setPersons(persons.map((person) => (person.id !== checkPersonObject.id ? person : returnPerson)));
          setErrorMessage('Change ' + returnPerson.name + `'s number to ` +  returnPerson.number)
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1,
      };
      console.log(personObject);
      personService.create(personObject).then((returnPerson) => {
        setPersons(persons.concat(returnPerson));
        setErrorMessage('Added ' + returnPerson.name)
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (event, id) => {
    event.preventDefault();
    const personObject = persons.find((person) => person.id === id);
    if (window.confirm("Delete " + personObject.name + " ?")) {
      personService.deletePerson(id).then((status) => {
        if (status !== "error") {
          setPersons(persons.filter((person) => person !== personObject));
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage !== '' ?<Notification message={errorMessage}/>:null}
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons newFilter={newFilter} persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
