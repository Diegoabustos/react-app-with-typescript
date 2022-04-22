import { useEffect, useRef, useState } from 'react';
import './App.css';
import List from './components/List'
import Form from './components/Form';
import {Sub, SubsResponseFromApi} from './types'
import axios from 'axios'




interface AppState {
  subs: Array<Sub>;
  newSubsNumber: number;
}

function App() {

  const [subs, setSubs] = useState<AppState["subs"]>([])
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0)

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSubs = (): Promise<SubsResponseFromApi> => {
      return axios
      .get('http://localhost:3001/subs')
      .then(response => response.data)
    }

    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi):Array<Sub> => {
      return apiResponse.map(SubFromApi => {
        const {
          months: subMonths,
          profileUrl: avatar,
          nick,
          description
        }= SubFromApi

        return (
          nick,
          description,
          avatar,
          subMonths
        )
      })
    }
    
    fetchSubs()
      .then(mapFromApiToSubs)
      setSubs(setSubs)
    })
  }, []) 

  const handleNewSub = (newSub: Sub): void  => {
    setSubs(subs => [...subs, newSub])
    setNewSubsNumber(n => n+1)
  }

  return (
    <div className="App" ref={divRef} >
      <h1>midu subs</h1>
      <List subs={subs} />
      New subs: {newSubsNumber}
      <Form onNewSub={handleNewSub}/>

    </div>
  );
}

export default App;
