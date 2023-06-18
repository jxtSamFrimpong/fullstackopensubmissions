import './App.css'
import Countries from './components/Countries.jsx'
import {
  useField,
  useMatchNumber,
  useCountry
} from './hooks'


function App() {
  const search = useField('search', 'text')
  const countries = useCountry()
  const matchNumber = useMatchNumber()
  return (
    <div>
      <span>
        <div>Find Countries</div>
        <div>
          <form onSubmit={(event)=>{countries.handler(
            matchNumber.setNone,
            matchNumber.setSingle,
            matchNumber.setMany,
            search.value,
            event
          )}}>
            <input type='text' value={search.value} onChange={search.onChange} />
          </form>
        </div>
      </span>
      <div className='noBullet'>
        <Countries
          countToShow={countries.countToShow}
          noMatch={matchNumber.none}
          singleMatch={matchNumber.single}
          manyMatches={matchNumber.many}
          setManyMatches={matchNumber.setMany}
          setNoMatch={matchNumber.setNone}
          setSingleMatch={matchNumber.setSingle}
          setCountToShow={countries.setCountToShow} />
      </div>
    </div>
  );
}

export default App
