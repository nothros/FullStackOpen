import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'



const Header = ({text}) => {
  return (
    <h2>
      {text}
    </h2>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(null);

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setNotes(response.data)
      })
  }, [])



  const addNew = (event) => {
    event.preventDefault()
    const isAdded = persons.find((person) => person.name === newName);
    if (isAdded){
      window.alert(`${newName} is already added to phonebook`);
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      />
       </div>
  )
 

}

export default App
