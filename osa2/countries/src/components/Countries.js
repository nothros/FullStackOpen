import React from "react";
import Country from "./Country";
import Weather from "./Weather";

const Countries = ({countries, setCountries}) => {

    const amount = countries.length
    console.log(countries[0])
    if (amount > 10){
      return (
        <p>
          Too many matches, specify another filter
        </p>
      )
    }
    
    else if (amount < 10 && amount >1 | amount ===0 ){
      return(
      <ul>
   {countries.map((country, i) =>
              <div key={i}> {country.name}  
              <button onClick={() => setCountries([country])}>show</button>
             </div>
            )}
  
      </ul>
      )
    }
    else {
      return (
        <>
          <Country country={countries[0]} /> 
          <Weather country={countries[0]} />
          </>
    )
      }
    
  }


export default Countries