function fetchCountries() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://restcountries.com/v3.1/all", true);
        
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject("Failed to fetch data");
            }
        };
        
        xhr.onerror = function () {
            reject("Network Error");
        };
        
        xhr.send();
    });
}

function displayCountries(countries) {
    const countriesContainer = document.getElementById("countries");
    //countriesContainer.style.display = "flex";

    

    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.png}" alt="${country.name.common} Flag">
            
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Lat/Lng:</strong> ${country.latlng.join(", ")}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Currency:</strong> ${country.currencies ? Object.keys(country.currencies)[0] : "N/A"}</p>
            <p><strong>Currency Name:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : "N/A"}</p>
            <p><strong>Currency Symbol:</strong> ${country.currencies ? Object.values(country.currencies)[0].symbol : "N/A"}</p>
        `;
        
        countriesContainer.appendChild(card);
    });
}

fetchCountries()
    .then(data => displayCountries(data))
    .catch(error => console.error(error));
