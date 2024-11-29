import React, { useState } from "react";
import "/src/index.css";
import clearimg from "./assets/images/clear.png";
import cloudsimg from "./assets/images/clouds.png";
import drizzleimg from "./assets/images/drizzle.png";
import mistimg from "./assets/images/mist.png";
import rainimg from "./assets/images/rain.png";
import snowimg from "./assets/images/snow.png";

const App = () => {
  const [input, setInput] = useState("");
  const [value, setValue] = useState(null);
  const handle = async () => {
    if (!input) return;
    try {
      const apikey = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=fc67731a8ebafd1846bc27fd4df75cf2`;
      const data = await fetch(apikey);
      const a = await data.json();
      if (a.cod === "404") {
        alert("City not found!");
      } else {
        setValue(a);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const weatherImages = {
    Clouds: cloudsimg,
    Clear: clearimg,
    Drizzle: drizzleimg,
    Rain: rainimg,
    Snow: snowimg,
    Mist: mistimg,
    Default: cloudsimg,
  };
  return (
    <div className="flex justify-center items-center h-svh bg-gray-400 ">
      <div className="container rounded-2xl  mx-5 md: w-100 h-fit bg-white ">
        <div className="inputbox my-5 flex justify-center">
          <input
            type="text"
            placeholder="Enter city name"
            className="border-2 border-gray-300 rounded-md w-8/12 px-2 mr-2 py-2  focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="rounded-md  px-5 py-2 bg-red-500 text-white"
            onClick={handle}
          >
            Search
          </button>
        </div>
        <div className="img h-44 flex justify-center">
          <img
            src={
              weatherImages[value?.weather[0]?.main] || weatherImages.Default
            }
            alt="images"
          />
        </div>
        <div className="details flex items-center flex-col">
          <h2 className="temperature text-7xl mt-4 ">
            {Math.round(value?.main?.temp - 273.15 || 0)}
            <span className="text-6xl ">°c</span>
          </h2>
          <p className="place text-3xl my-5 ">{value?.name || "Enter city"}</p>
        </div>
        <div className=" flex justify-between mx-8 mt-12 mb-5">
          <p>
            Wind: <span>{value?.wind?.speed || 0}km/hr</span>
          </p>
          <p>
            Humidity: <span>{value?.main?.humidity || 0}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
