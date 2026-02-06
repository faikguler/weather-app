const COUNTRIES_API = 'https://countriesnow.space/api/v0.1/countries';

let countriesData = [];
let selectedCountry = '';
let selectedCity = '';

document.addEventListener('DOMContentLoaded', function() {

        const countrySelect = document.getElementById('country-select');
        const citySelect = document.getElementById('city-select');
        const submitBtn = document.getElementById('submit-btn');

        function getCountriesData() {
            fetch(COUNTRIES_API)
                .then(response => response.json())
                .then(data => {

                    countriesData = data.data;
                    if (countrySelect) {
                        data.data.forEach(country => {
                            //console.log(`${country.country} (${country.iso2})`);
                            const option = document.createElement('option');
                            option.value=country.country;
                            option.textContent=country.country;
                            countrySelect.appendChild(option);

                        });
                    }
                    
                  AllCitiesList();

                })
                .catch(error => {
                    console.error('Error:', error);
                    if (countrySelect) {
                        countrySelect.innerHTML = '<option value="">Error</option>';
                    }
                });
        }

        function getCitiesData(countryName) {
            if (!citySelect) return;

            citySelect.disabled = true;

            const country = countriesData.find(c => 
                c.country.toLowerCase() === countryName.toLowerCase()
            );
            
            if (country && country.cities) {

                citySelect.innerHTML = '';// 

                country.cities.forEach((city) => {
                    //console.log(city);
                        const option = document.createElement('option');
                        option.value = city;
                        option.textContent = city;
                        citySelect.appendChild(option);
                });

                citySelect.disabled = false;
                //console.log('cities loaded.');

            } else {
                //console.error(`Cities not found for: ${countryName}`);
                alert('Cities not found');

            }
        }
/*
        setTimeout(() => {
            getCitiesData('Turkey');  
        }, 2000);
*/

            getCountriesData();
            
        if (countrySelect) {
            countrySelect.addEventListener('change', function(e) {
                selectedCountry = e.target.value;
                
                if (selectedCountry) {
                    getCitiesData(selectedCountry);
                    selectedCity = ''; 
                } else {
                    citySelect.innerHTML = '<option value="">Select Country</option>';
                    citySelect.disabled = true;
                    submitBtn.disabled = true;
                }
            });
        }
        
        if (citySelect) {
            citySelect.addEventListener('change', function(e) {
                selectedCity = e.target.value;
                
                if (selectedCity) {
                    submitBtn.disabled = false;
                } else {
                    submitBtn.disabled = true;
                }
            });
        }


        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                if (selectedCountry && selectedCity) {
                    alert(`Select Country: ${selectedCountry} Selected City: ${selectedCity}`);
                    
                } else {
                    alert('Please Select Country and City!');
                }
            });
        }







    // Search Input
        const citySearch = document.getElementById('city-search');
        const submitSearch = document.getElementById('submit-search');

            function AllCities() {
                const allCities = [];

                if (!countriesData || countriesData.length === 0) {
                    console.log('Countries data not loaded yet');
                    return allCities;
                }

                countriesData.forEach(country => {
                    if (country.cities) {
                        country.cities.forEach(city => {
                            allCities.push(city);
                        });
                    }
                });
            return allCities;
        }

    



        function AllCitiesList() {

            const datalist = document.getElementById('all-cities-list');

            if (!datalist) return; 

            const allCities = AllCities();

            datalist.innerHTML = '';
            
            allCities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                datalist.appendChild(option);
            });
        }
        
        if (citySearch) {
            citySearch.setAttribute('list', 'all-cities-list');
        }
        
    if (submitSearch) {
        submitSearch.addEventListener('click', function() {
            const searchedCity = citySearch.value.trim();
            if (searchedCity) {
                alert(`Search City: ${searchedCity}`);
                
                const country = countriesData.find(c => 
                    c.cities && c.cities.some(city => 
                        city.toLowerCase() === searchedCity.toLowerCase()
                    )               
                );

                
                if (country) {
                    
                    alert('This City from '+ country.country +' country');
                }
                else
                {
                    alert("Invalid Data");
                }
            } else {
                alert('Enter city please');
            }
        });
    }


});