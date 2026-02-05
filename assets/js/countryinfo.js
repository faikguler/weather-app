// Taken from class example and repurposed for project

document.getElementById("fetchInfo").addEventListener("click", onfetchInfo);

function onfetchInfo() {
  
  document.getElementById("flag").innerHTML="";
  document.getElementById("language").innerHTML="";
  document.getElementById("population").innerHTML="";
  document.getElementById("region").innerHTML="";
  document.getElementById("capital").innerHTML="";
  document.getElementById("map").innerHTML="";

  const country = document.getElementById("country").value;

  if (country) {
    
    // GitHub API endpoint for fetching country info
    const url = `https://restcountries.com/v3.1/name/${country}`;

    // Make a GET request to the GitHub API
    fetch(url)
      .then((response) => {
        if (!response.ok) {
        //   throw new Error("Country not found");
          document.getElementById("flag").innerHTML = "Country not found";
          return;
        }
        return response.json();
      })
      .then((data) => {
        if(data[0].name.common.toLowerCase() != country.toLowerCase()){
            document.getElementById("flag").innerHTML = "Enter country full name"
            return;
            }
        renderPopulation(data);
        renderLanguage(data);
        renderRegion(data);
        renderCapital(data);
        renderFlag(data);
        renderMap(data);        
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  } else {
    console.log("Please enter a country.");
    document.getElementById("flag").innerHTML = "Please enter a country"
  }
}

const renderFlag = (country) => {
  const countryFlagEl = document.getElementById("flag");
  let html = "";
  
  country.forEach((countries) => {
    const countryFlag = countries.flags.png;
    html += `<img src=${countryFlag}>`;
  });

  countryFlagEl.innerHTML = html;
};

const renderMap = (country) => {
  const countryMapEl = document.getElementById("map");
  let html = "";
  
  country.forEach((countries) => {
    const countryMap = countries.maps.googleMaps;
    html += `<li><a href=${countryMap}>Google Map</a></li>`;
  });

  countryMapEl.innerHTML = html;
};

const renderPopulation = (country) => {
  const countryPopEl = document.getElementById("population");
  let html = "";
  
  country.forEach((countries) => {
    const countryPopulation = countries.population;
    html += `<li>Population: ${countryPopulation}</li>`;
  });

  countryPopEl.innerHTML = html;
};

const renderCapital = (country) => {
  const countryCapEl = document.getElementById("capital");
  let html = "";
  
  country.forEach((countries) => {
    const countryCapital = countries.capital.join(", "); // adds comma and spaces if more than one capital
    html += `<li>Capital: ${countryCapital}</li>`;
  });

  countryCapEl.innerHTML = html;
};

const renderRegion = (country) => {
  const countryRegEl = document.getElementById("region");
  let html = "";
  
  country.forEach((countries) => {
    const countryRegion = countries.region;
    html += `<li>Region: ${countryRegion}</li>`;
  });

  countryRegEl.innerHTML = html;
};

const renderLanguage = (country) => {
  const countryLangEl = document.getElementById("language");
  let html = "";

  country.forEach((countries) => {
    const countryLanguage = Object.values(countries.languages).join(", "); // Postman shows that Languages returns an object. Object.values returns an array of the values of an object
    html += `<li>Language: ${countryLanguage}</li>`;
    })

  countryLangEl.innerHTML = html;
};
