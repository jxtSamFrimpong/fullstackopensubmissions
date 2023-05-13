/* eslint-disable react/prop-types */
import SingleCountry from "./SingleCountry";
const Countries = ({ countToShow, noMatch, singleMatch, manyMatches, setManyMatches, setNoMatch, setSingleMatch, setCountToShow }) => {

    const inputHandler = (event, country) => {
        event.preventDefault();
        console.log(event);
        setManyMatches(false);
        setNoMatch(false);
        setCountToShow([country]);
        setSingleMatch(true);

    }

    if (noMatch) {
        return (
            <div>No Match, Try another String</div>
        );
    }
    else if (singleMatch) {
        return (
            <div>
                <SingleCountry country={countToShow[0]} />
            </div>
        );
    }
    else if (manyMatches) {
        return (
            <div>
                Too many matches, try another filter
            </div>
        );
    }
    else {
        return (
            <div>
                {countToShow.map((country) => {
                    return (
                        <div key={country.flag} className='countryCard'>
                            <div>{country.name.common}
                                <input type="button" value="show" onClick={(event) => { inputHandler(event, country) }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Countries