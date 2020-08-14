import React,{useEffect,useState} from 'react';
import './App.css';

const apiUrl = 'http://localhost:3001/notes/1';


function App() {
  const [text,setText] = useState('');

  useEffect(()=>{
    window.fetch(apiUrl).then(data => {
      data.json().then(res => {
        setText(res.text);
      })
    })
  },[]);

  const handleChangeText = (e) =>{
    e.preventDefault();
    setText(e.target.value);
  }

  return (
    <div className="App">
      <textarea
        value={text}
        onChange={handleChangeText}
        cols="30"
        rows="10"/>
    </div>
  );
}

export default App;
