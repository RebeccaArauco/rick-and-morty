
import { useEffect, useRef, useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch';
import LocationData from './components/LocationData';
import ResidentCard from './components/ResidentCard';

function App() {

  const [inputValue, setInputValue] = useState(Math.floor(Math.random() * 126) + 1);

  const [location, getLocation, isLoading, hasError] = useFetch();

  
  useEffect (() => {
    
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue]);

    const textInput = useRef ();

    const handleSubmit = (event)=> {
      event.preventDefault();
      setInputValue(textInput.current.value.toLowerCase().trim());
      textInput.current.value = '';
    }

    //console.log(location);

    const bannerUrl = 'https://www.logoshirt-shop.de/out/pictures/generated/category/thumb/1140_250_100/rick-und-morty-t-shirts-logoshirt-shop.jpg'

  return (
    <>
  
    {
      isLoading ?
      <h2>Loading...</h2>
    :
   <div className='app'>
  <img src={bannerUrl} alt="Rick and Morty Banner" className="app__banner"/>
   <h1>Rick and Morty</h1>
   <form className='app__form' onSubmit={handleSubmit}>
    <input className='app__input' type="text" ref={textInput}/>
    <button className='app__btn'>Search</button>
   </form>
   {
    hasError || inputValue ==='0'?
    <h2>❌Hey! you must provide an id from 1 to 126 🥺</h2>
    :
    <>
      <LocationData
        location={location}
      />
      <div className='app__container'>
        {
          location?.residents.map(resident => (
            <ResidentCard
            key ={resident}
            url={resident}
            />
          ))
        }
      </div>
   </>
   }
      
   </div>
}
   </>
  )
}

export default App;
