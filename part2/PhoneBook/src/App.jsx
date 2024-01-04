import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/api/persons").then((response) => {
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
        personService
          .update(checkPersonObject.id, newPersonObject)
          .then((returnPerson) => {
            setPersons(persons.map((person) => (person.id !== checkPersonObject.id ? person : returnPerson)));
            setError(false);
            setNotificationMessage("Change " + returnPerson.name + `'s number to ` + returnPerson.number);
          })
          .catch((error) => {
            setError(true);
            setNotificationMessage("Information of " + checkPersonObject.name + " has been removed from server");
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1,
      };
      personService.create(personObject).then((returnPerson) => {
        setPersons(persons.concat(returnPerson));
        setError(false);
        setNotificationMessage("Added " + returnPerson.name);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (event, id) => {
    event.preventDefault();
    const personObject = persons.find((person) => person.id === id);
    if (window.confirm("Delete " + personObject.name + " ?")) {
      personService
        .deletePerson(id)
        .then((status) => {
          setPersons(persons.filter((person) => person !== personObject));
        })
        .catch((error) => {
          setError(true);
          setNotificationMessage("Information of " + personObject.name + " has been removed from server");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} error={error} />
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
