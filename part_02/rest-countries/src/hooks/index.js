import { useState, useEffect } from "react";
import axios from "axios";

export const useField =(name,type)=>{
    const [value, setValue] = useState('')

    const onChange = (event)=> {
        setValue(event.target.value)
    }

    return {
        name,
        type,
        value,
        setValue,
        onChange
    }

}

export const useMatchNumber =()=>{
    const [many, setMany] = useState(false)
  const [single, setSingle] = useState(false)
  const [none, setNone] = useState(false)

  return {
    many,
    setMany,
    single,
    setSingle,
    none,
    setNone
  }
}

export const useCountry = ()=>{
    const [countries, setCountries] = useState([])
    const [countToShow, setCountToShow] = useState([])

    const fetchCountries = () => {
        //event.preventDefault();
        console.log('handle finding countries');
        axios.get('https://restcountries.com/v3.1/all')
          .then((response) => {
            console.log(response.data.length);
            setCountries(response.data)
          })
    
      }
      useEffect(fetchCountries, [])

    const handler =(setNoMatch,setSingleMatch,setManyMatches, searchText, event)=>{
        event.preventDefault();
    const allCountries = countries;
    const _countriesToShow = allCountries.filter((country) => {
      const searchText_ = searchText;
      const subText = new RegExp(searchText_.toLowerCase());
      return subText.test(country.name.common.toLowerCase())
    }
    );
    if (_countriesToShow.length > 1 && _countriesToShow.length <= 10) {
      setNoMatch(false);
      setSingleMatch(false);
      setManyMatches(false);
      setCountToShow(_countriesToShow);
    }
    else if (_countriesToShow.length > 10) {
      setSingleMatch(false);
      setNoMatch(false);
      setManyMatches(true);
    }
    else if (_countriesToShow.length === 1) {
      setManyMatches(false);
      setNoMatch(false);
      setSingleMatch(true);
      setCountToShow(_countriesToShow);
    }
    else {
      setSingleMatch(false)
      setManyMatches(false)
      setNoMatch(true)
    }
    }

    return {
        countries,
        setCountries,
        countToShow,
        setCountToShow,
        handler,
        fetchCountries
    }
    
}