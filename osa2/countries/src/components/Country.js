import React from "react";


const Country = ({country}) => {

    const languagesList = country.languages.map((lang) => {
      return <li key={lang.name}>{lang.name}</li>
    })
  return (
      <div key={country.alpha3Code}> 


      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages: </h2>
      <ul>
        {languagesList}
      </ul>
      <img alt={"Country Flag"} height={"100px"} src={country.flag}></img>
      </div>
)
}

export default Country