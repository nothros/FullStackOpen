import React from 'react'
import Person from './Person'

const Persons = ({filter, persons, filteredPersons}) => {
    return(
      <>
      {filter === ""
          ? persons.map(person => (
            <Person
              key={person.name}
              person={person}
            />
          ))
          : filteredPersons.map(person => (
            <Person
              key={person.name}
              person={person}
            />
      ))}
      </>
    )
    
}

export default Persons