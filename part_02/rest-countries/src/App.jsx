import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css'
import Countries from './components/Countries.jsx'

function App() {
  const [countries, setCountries] = useState([])
  // const [inputVal, setInputValue] = useState('')
  const [countToShow, setCountToShow] = useState([])
  const [searchText, SetSearchText] = useState('')
  const [manyMatches, setManyMatches] = useState(false)
  const [singleMatch, setSingleMatch] = useState(false)
  const [noMatch, setNoMatch] = useState(false)

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

  const handleChangeInput = (event) => {
    event.preventDefault();
    const val_ = event.target.value;
    SetSearchText(val_);
  }
  const handleCountries = (event) => {
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

  return (
    <div>
      <span>
        <div>Find Countries</div>
        <div>
          <form onSubmit={handleCountries}>
            <input type='text' value={searchText} onChange={handleChangeInput} />
          </form>
        </div>
      </span>
      <div className='noBullet'>
        <Countries
          countToShow={countToShow}
          noMatch={noMatch}
          singleMatch={singleMatch}
          manyMatches={manyMatches}
          setManyMatches={setManyMatches}
          setNoMatch={setNoMatch}
          setSingleMatch={setSingleMatch}
          setCountToShow={setCountToShow} />
      </div>
    </div>
  );
}

export default App
