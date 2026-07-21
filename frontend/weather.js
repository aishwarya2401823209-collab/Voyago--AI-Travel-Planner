const apiKey = "dfbebc14751659ffa2239497d241d545";


async function getWeather(city){

    try{

        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


        const response = await fetch(url);

        const data = await response.json();


        console.log(data); // check response


        document.getElementById("weatherCity").innerText =
        data.name;


        document.getElementById("temperature").innerText =
        Math.round(data.main.temp) + "°C";


        document.getElementById("weatherCondition").innerText =
        data.weather[0].description;


        document.getElementById("humidity").innerText =
        data.main.humidity + "%";


        document.getElementById("wind").innerText =
        data.wind.speed + " km/h";


    }
    catch(error){

        console.log(error);

    }

}



document.addEventListener("DOMContentLoaded",()=>{


    let trip =
    JSON.parse(localStorage.getItem("currentTrip"));


    if(trip){

        getWeather(trip.destination);

    }


});