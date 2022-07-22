import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
require('dotenv').config()

const App = () => {
  const [countries, setCountries] =useState([])
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState("")

  const hook = () => {
    axios
    .get('https://restcountries.com/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setAllCountries(response.data)
    })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value);
    const filtered = allCountries.filter((country) =>
    country.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setCountries(filtered);
  }


  console.log(countries)

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App;
