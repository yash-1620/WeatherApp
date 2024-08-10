import { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { WiHumidity, WiStrongWind } from "react-icons/wi";

function App() {
  const [weatherData, setweatherData] = useState(null)
  const inputRef = useRef()
  const search = async(city)=> {
    if(city === "")
    {
      alert("Enter a city name")

    }
    try{
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setweatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location:data.name,
        iconId:data.weather[0].icon
      })

      console.log(iconId);
    }
    catch(error){
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <div className='flex justify-center h-screen bg-zinc-700'>
      <div className='bg-gradient-to-r from-indigo-500 to-blue-700 w-72 h-96 rounded-lg shadow-2xl shadow-black mt-24 z-50'>
        <div className='search box  mt-8 space-x-2 flex items-center justify-center'>
          <input className='rounded' ref={inputRef} type="text" placeholder=' Search'/>
          <FaSearch onClick={()=>search(inputRef.current.value)}/>
          
        </div>

    
      {weatherData && (
        <>
        <div className='weatherInfo text-2xl text-white mt-8 flex-col flex items-center'>
          <img  src={`https://openweathermap.org/img/wn/${weatherData.iconId}@2x.png`}/>
          <h1 >{weatherData.temperature} c</h1>
          <h1>{weatherData.location}</h1>
        </div>


      <div className='px-4 mt-4 flex justify-between'>
      
        <div className='mt-8 text-white flex flex-col'>
        <span className='text-xs'>Humidity</span>
        <div className='flex items-center'>
      
        <WiHumidity className='size-5'/>
          <span>{weatherData.humidity}%
          </span>
          </div>
          
          

        </div>
        <div className='mt-8 text-white flex flex-col'>
        <span className='text-xs'>windspeed</span>
          <div className='flex items-center'>
      
        <WiStrongWind className='size-5'/>
        <span>{weatherData.windSpeed} Kmph</span>
        </div>
          


        </div>
        </div>
        </>
      )}
        </div>

        </div>


  
  )
}

export default App
