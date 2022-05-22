import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import React, { useState, useEffect } from 'react';
import './App.css';
import MainPage from './Components/MainPage/MainPage';


const firebaseConfig = { 
  apiKey: "AIzaSyCyw-Z3dl-9BAF5Y6GtwsI7l01w9KeYYV8",
  authDomain: "to-do-app-devs.firebaseapp.com",
  projectId: "to-do-app-devs",
  storageBucket: "to-do-app-devs.appspot.com",
  messagingSenderId: "726684151650",
  appId: "1:726684151650:web:63206fa50d3030b289463b",
  measurementId: "G-1RP30X8QTN"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {
  // Initialise useState hook for storing and updating new notes
  const [allNotes, setAllNotes] = useState([]);
  
  useEffect(() => {
    const getNotes = async () => {
      const notesRef = collection(db, 'notes');
      const notesSnapShot = await getDocs(notesRef)
      const notesList = notesSnapShot.docs.map( snapShot => {
        return {
          ...snapShot.data(),
          ref: snapShot.ref
        }
      });
      setAllNotes(notesList)
    }
    getNotes()
  }, []);



  return (
    <div className="App">
      <MainPage allNotes={allNotes} setAllNotes={setAllNotes} />
    </div>
  );
}

export default App;
