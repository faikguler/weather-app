const COUNTRIES_API = 'https://countriesnow.space/api/v0.1/countries';

let countriesData = [];

function getCountriesData() {
    fetch(COUNTRIES_API)
        .then(response => response.json())
        .then(data => {

            countriesData = data.data;
            
            data.data.forEach(country => {
                console.log(`${country.country} (${country.iso2})`);
            });
            
            return data.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getCitiesData(countryName) {

    const country = countriesData.find(c => 
        c.country.toLowerCase() === countryName.toLowerCase()
    );
    
    if (country && country.cities) {

        country.cities.forEach((city) => {
            console.log(city);
        });
    } else {
        console.error(`Cities not found for: ${countryName}`);
    }
}

getCountriesData();

setTimeout(() => {
    getCitiesData('Turkey');  
}, 2000);
