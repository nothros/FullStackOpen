import React from 'react'
import Person from './Person'

const Persons = ({filter, persons, filteredPersons, removePerson}) => {
    return(
      <>
      {filter === ""
          ? persons.map(person => (
            <Person
              key={person.name}
              person={person}
              removePerson={removePerson}
            />
          ))
          : filteredPersons.map(person => (
            <Person
              key={person.name}
              person={person}
              removePerson={removePerson}
            />
      ))}
      </>
    )
    
}

export default Persons