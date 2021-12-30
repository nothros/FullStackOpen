import React from 'react'

const Person = ({person, removePerson}) =>{
    return (
    
    <p key={person.name} >
      {person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>
    </p>
    )
  }

export default Person