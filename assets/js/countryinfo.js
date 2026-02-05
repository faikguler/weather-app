// Taken from class example and repurposed for project

document.getElementById("fetchInfo").addEventListener("click", onfetchInfo);

function onfetchInfo() {
  const country = document.getElementById("country").value;

  if (country) {
    // GitHub API endpoint for fetching country info
    const url = `https://restcountries.com/v3.1/name/${country}`;

    // Make a GET request to the GitHub API
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Country not found");
        }
        return response.json();
      })
      .then((data) => {
        renderPopulation(data);
        renderRegion(data);
        renderCapital(data);
        // renderPopulation(data);
        // renderMap(data);
        // renderLanguage(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  } else {
    console.log("Please enter a country.");
  }
}


//       const map = country.maps.googleMaps
//   const languages = country.languages

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
  const countryPopEl = document.getElementById("capital");
  let html = "";
  
  country.forEach((countries) => {
    const countryCapital = countries.capital;
    html += `<li>Capital: ${countryCapital}</li>`;
  });

  countryPopEl.innerHTML = html;
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
