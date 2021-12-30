import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import './index.css'


const Header = ({text}) => {
  return (
    <h2>
      {text}
    </h2>
  )
}

const Notification = ({ message}) => {
  if (message === null) {
    return null
  }

  if (message.includes('ERROR')) {
    return (
    <div className="error">
    {message}
  </div>
  
    )
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(null);
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const addNew = (event) => {
    event.preventDefault()
    const isAdded = persons.find((person) => person.name === newName);
    if (isAdded){
      if (window.confirm(`${isAdded.name} is already added to the phonebook, replace the old number with a new one ?`)) {
        const updatePerson = { ...isAdded, number: newNumber}
        personService.update(updatePerson.id, updatePerson)
        .then(returnedPerson => {
          setPersons(persons.map(personObject => personObject.id !== updatePerson.id ? personObject : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.log(error)
          setMessage(`ERROR: Information of ${isAdded.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    }
    else {
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
  }
}

  const deletePerson = (id) => {
    const removedPerson = persons.find(person => person.id === id)
    const personName = removedPerson.name
    const personId = removedPerson.id
    if (window.confirm(`Delete ${personName} ?`)) {
      personService.remove(personId)
      console.log(`${personName} successfully deleted`)
      setPersons(persons.filter(person => person.id !== personId))
      setMessage(`Deleted ${personName}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      }
    }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value);
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredPersons(filtered);
  }

  return (
    <div>
      <Header text={"Phonebook"} />
      <Notification message={message} />

      <Filter value={newFilter} 
              onChange={handleSearchChange} 
      />
      <Header text={"add a new"} />
      <PersonForm onSubmit={addNew} 
                  handlePersonChange={handlePersonChange}
                  newName={newName} newNumber={newNumber}
                  handleNumberChange={handleNumberChange} 
      />

      <Header text={"Numbers"} />
      <Persons
        filter={newFilter}
        persons={persons}
        filteredPersons={filteredPersons}
        removePerson={deletePerson}
      />
       </div>
  )
 

}


export default App
