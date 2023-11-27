import axios from "axios";
import { useState } from "react";
import copy2 from "./copy2";    

const copy = () => {
    const [citysWheather, setCitysWheather] = useState(null);

    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${citysWheather}&appid=b1a7b49098225ce6586991c2a55dce5f&lang=sp&units=metric`)
      // .then(({ data }) => setCitys(data))
      .then(({ data }) => {
        setCitysWheather({
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

      









  return (

    <main
    className={`flex justify-center items-center h-screen  bg-black text-white bg-cover
    ${bgImages[citysWheather?.citysWheather.data]} `}
    >
      {citysWheather ? (
          <copy2 weather={citysWheather} />
          ) : (
              <span>Cargando...</span>
              )}
              < copy2 />
    </main>
  )

}

export default copy
