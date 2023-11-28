import axios from "axios";
import { useEffect, useState } from "react";
import WheatherDetail from "./assets/components/WheatherDetail";

function App() {
  const [weather, setWeather] = useState(null);

  const success = (pos) => {
    const {
      coords: { latitude, longitude },
    } = pos;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b1a7b49098225ce6586991c2a55dce5f&lang=sp&units=metric`
      )
      // &lang=es,sp

      .then(({ data }) => setWeather(data))

      .catch((err) => console.log(err));

    //
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const bgImages = {
    "01d": "bg-[url(/images/Untitledimage.png)]",

    "01n": "bg-[url(/images/clearskynigth.jpg)]",

    "02d": "bg-[url(/images/Untitledimage.png)]",

    "02n": "bg-[url(/images/clearskynigth.jpg)]",

    "03d": "bg-[url(/images/Untitledimage.png)]",

    "03n": "bg-[url(/images/clearskynigth.jpg)]",

    "04d": "bg-[url(/images/Untitledimage.png)]",

    "04n": "bg-[url(/images/clearskynigth.jpg)]",

    "09d": "bg-[url(/images/Untitledimage.png)]",

    "09n": "bg-[url(/images/clearskynigth.jpg)]",

    "10d": "bg-[url(/images/Untitledimage.png)]",

    "10n": "bg-[url(/images/clearskynigth.jpg)]",

    "11d": "bg-[url(/images/Untitledimage.png)]",

    "11n": "bg-[url(/images/clearskynigth.jpg)]",

    "12d": "bg-[url(/images/Untitledimage.png)]",

    "12n": "bg-[url(/images/clearskynigth.jpg)]",
  };

  // : <span>Cargando...</span> }
  // "flex justify-center items-center h-screen  bg-black text-white bg-cover"
  // bg-[url(/)]para imagenes
  return (
    <main
      className={`flex justify-center items-center h-screen  bg-black text-white bg-cover rounded-xl 
    ${bgImages[weather?.weather[0].icon]} `}
    >
      {weather ? (
        <WheatherDetail weather={weather} />
      ) : (
        <span>Cargando...</span>
      )}
    </main>
  );
}

export default App;
