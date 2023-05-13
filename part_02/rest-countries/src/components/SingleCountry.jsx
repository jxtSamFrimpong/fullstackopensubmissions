/* eslint-disable react/prop-types */
import Weather from "./Weather";

const SingleCountry = ({ country }) => {
    console.log('log single cout to show', country);
    return (
        <div>
            <h1>{country.name.common}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Capital</td>
                        <td>{country.capital[0]}</td>
                    </tr>
                    <tr>
                        <td>Area</td>
                        <td>{country.area}</td>
                    </tr>
                </tbody>
            </table>
            <ul>
                <em>Languages</em>
                {Object.values(country.languages).map(lang => {
                    return (<li key={lang}>{lang}</li>)
                })}
            </ul>
            <img src={country.flags.svg} alt={country.flags.alt} height={80} width={120} />
            <Weather country={country} />

        </div>
    );
}

export default SingleCountry;