import React from 'react'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  
  const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
      }
  const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
      }
  const handleFilterChange = (event) => {
        setFilter(event.target.value)
      }
  const notify = (message, type='notify') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  


  const removePerson = (id) => {
        const toDeleted = persons.find(person => person.id === id)
        const ok = window.confirm(`Delete ${toDeleted.name}`)
        if (ok){
          personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
          })
        }
      }

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(person => person.name === newName)
    if (exists){
      const updatedperson = {
        name: exists.name,
        number: newNumber,
      }
      personService
      .update(exists.id, updatedperson)
      .then(response => {
        setPersons(persons.concat(response))
        notify(`Updated ${newName}`)

      }).catch(error => {
        notify(error.response.data.error)
        console.log(error.response.data.error)
      })

      window.alert(`${newName} is already added to phonebook`);
    }
        else{
        const personObject = {
          name: newName,
          number: newNumber,
        }
        personService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response))
            notify(`Added ${newName}`)

          }).catch(error => {
            notify(error.response.data.error)
            console.log(error.response.data.error)
          })
      }
      
      setNewName('')
      setNewNumber('')
    }

  const personsToShow = filterString.length === 0 ?
    persons : 
    persons.filter(p => p.name.toLowerCase().includes(filterString.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      filter shown with:
      <Filter
        value={filterString}
        onChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
        <Persons persons={personsToShow}
        removePerson={removePerson} />
    </div>
  )

}


export default App