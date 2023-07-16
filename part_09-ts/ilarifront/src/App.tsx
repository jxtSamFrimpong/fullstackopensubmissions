import React from 'react';
import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from './types'
import { getAllDiaries, addDiary } from './services/diaryServices';
import toNewDiaryEntry from './utils/toTypes'

const ErrorNotif = ({ error, setError }: { error: Error, setError: Function }) => {
  console.log(typeof error);
  setTimeout(() => {
    setError(null);
  }, 3000)
  return (
    error ?
      <div className='error'>{error.message}</div>
      : null
  )
}

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])
  const [formDate, setFormDate] = useState('')
  const [formWeather, setFormWeather] = useState('')
  const [formViibility, setFormVisibility] = useState('')
  const [formComment, setFormComment] = useState('')
  const [errorMessage, setErrorMessage] = useState<any>(null);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, [])

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('submitting')
    try {
      const _NewDiaryEntry: NewDiaryEntry = toNewDiaryEntry(
        {
          weather: formWeather,
          visibility: formViibility,
          date: formDate,
          comment: formComment
        }
      );
      const addedDiary: NonSensitiveDiaryEntry = await addDiary(_NewDiaryEntry);//.then(result => result);
      setDiaries(diaries.concat(addedDiary))
    }
    catch (err) {
      console.log(err);
      setErrorMessage(err);
    }
  }
  return (
    <div >
      <ErrorNotif error={errorMessage} setError={setErrorMessage} />
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        weather <input type='text' value={formWeather} onChange={(e) => { setFormWeather(e.target.value) }} />
        visibility <input type='text' value={formViibility} onChange={(e) => { setFormVisibility(e.target.value) }} />
        date <input type='date' value={formDate} onChange={(e) => { setFormDate(e.target.value) }} />
        comment <input type='text' value={formComment} onChange={(e) => { setFormComment(e.target.value) }} />
        <button type='submit'>add</button>
      </form>
      <h2>Diaries Entries</h2>
      {diaries.map(d => <article key={d.id}>
        <strong>{d.date}</strong>
        <br />
        <p>visibility: {d.visibility}</p>
        <p>weather: {d.weather}</p>
      </article>)}
    </div>
  );
}

export default App;
