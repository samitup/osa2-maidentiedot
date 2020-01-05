import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState, useEffect } from 'react'
import axios from 'axios'



const App = () => {

    const hook = () => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
                setSelectCountry(response.data)
            }).catch(error => console.log(error.response))

    }

    useEffect(hook, [])


    const [inputValue, setInputValue] = useState('')
    const [countries, setCountries] = useState([])
    const [selectCountry, setSelectCountry] = useState([])
    const[weather, setWeather] = useState('')

    const handleInputValue = (event) => {
        setInputValue(event.target.value)
        setCountries(selectCountry.filter(c => c.name.toUpperCase().includes(event.target.value.toUpperCase())))
    }


    const selectCountryOnClick = name => setCountries(selectCountry.filter(c => c.name ===name))


    const filter = () => {
        return (
            countries.map(c =>
                <div> <h1 key={c.name}>{c.name}</h1>
                    <p key={c.name}>capital: {c.capital}</p>
                    <p key={c.name}>population: {c.population}</p>
                    {countries[0].languages.map(c => <li key={c.name}>{c.name}</li>)}
                    <img key={c.name} src={c.flag} width="200" />
                    <div></div>
                </div>)
        )
    }
    
    const search = () => {
        if (countries.length > 10) {
            return (
                <p>Too many countries to show try more specific filter</p>
            )
        } else if (countries.length < 10 && countries.length > 1) {
            return (
                countries.map(c => <div><p key={c.name}>{c.name} <button onClick={() => selectCountryOnClick(c.name)} >select</button></p></div>)
            )
        } else {
            return (
                filter()
            )
        }
    }
        

    return (
        <div>
            find countries: <input value={inputValue} onChange={handleInputValue}></input>
            <div>
                {search()}
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

