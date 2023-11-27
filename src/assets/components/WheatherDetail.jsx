import axios from "axios";
import { useState } from "react";


const WheatherDetail = ({ weather }) => {
  console.log(weather);

  const [isCelsius, setIsCelsius] = useState(true);
  const [citys, setCitys] = useState(true);
  console.log(citys);

  const handleTemperature = () => {
    setIsCelsius(isCelsius ? false : true); // Cambia entre Celsius y Fahrenheit
  };

  const celsiusToFahrenheit = (templeCelsius) => {
    const tempF = (templeCelsius * (9 / 5) + 32).toFixed(1);
    return tempF;
  };

  ///////////

  const handleSubmit = (e) => {
    e.preventDefault();
    const citysName = e.target.citysName.value.toLowerCase();

    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${citysName}&appid=b1a7b49098225ce6586991c2a55dce5f&lang=sp&units=metric`)
      // .then(({ data }) => setCitys(data))
      .then(({ data }) => {
        setCitys({
          city: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
      
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Ciudad no encontrada");
      });
  };

  

  return (
    <article className="text-center grid  gap-4  overflow-hidden sm:grid sm:grid-cols-2 max-w-[400px] ">
      <form
        className=" bg-white/30 p-1 rounded-xl  text-black  text-center"
        onSubmit={handleSubmit}
      >
        <input 
        
          className=" bg-white/90  p-black rounded-xl  text-black text-center"
          type="text"
          name="citysName"
          placeholder={" Nombre de la Ciud... "}
          autoComplete="off"
        />
        <button 
        type="submit">Buscar</button>

      </form>

      <h3 className=" bg-white/30 p-2 rounded-xl text-3xl  text-black grid justify-center items-center">
        {/* {weather.name}, {weather.sys.country} */}
      
        <h2>{citys.city}</h2>
          <h2>{citys.country}</h2>
      </h3>

      <div className="text-center text-black grid gap-4 ">
        {/* seccion1:temperatura, descripcion, e imagen */}
        <section className="bg-white/30 p-2 rounded-xl grid grid-cols-2 items-center">
          <h3 className="col-span-2 text-2xl">
            {/* {weather.weather[0].description} */}
            {citys.description}
          </h3>
          <span className="text-2xl ">{citys.temperature}°C</span>
          <div className=" grid justify-center items-center">
            <img
              className="block mx-auto"
              src={`https://openweathermap.org/img/wn/${citys.icon}@2x.png`}
              alt=""/>
          </div>
        </section>

        {/* seccion2:detayes adicionales del clima*/}
        <section
          className="grid  grid-cols-3 justify-items-center
        bg-white/40 p-3 rounded-xl "
        >
          <div className="felx gap-1">
            <div>
              <img src="/weather.svg" alt="" />
              <span>{citys.windSpeed}m/s</span>
            </div>
          </div>
          <div className="felx gap-1">
            <div>
              <img src="/raindrops.svg" alt="" />
              <span>{citys.humidity}%</span>
            </div>
          </div>
          <div className="felx gap-1">
            <div>
              <img src="/arrow.svg " alt="" />
              <span>{citys.pressure}hPa</span>
            </div>
          </div>
        </section>
      </div>

      <div className=" grid gap-2 ">
        {isCelsius ? (
          <div className=" bg-white/30 p-1 text-2xl  rounded-xl  text-black grid justify-center items-center">
         
            {celsiusToFahrenheit(citys.temperature)} °F
          </div>
        ) : (
          <div className=" bg-white/30 p-1 text-2xl rounded-xl  text-black grid justify-center items-center">
           
            {citys.temperature} °C
          </div>
        )}

        <button
          className=" bg-white/30 p-1 rounded-xl  text-black "
          onClick={handleTemperature}
        >
          Cambiar ° a
        </button>
      </div>
    </article>
  );
};

export default WheatherDetail;
