const responce = await fetch("https://restcountries.com/v3.1/all");
const data = await responce.json();

const ul = document.getElementById("countryList");

data.forEach((element) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <img
      class="country-image"
      alt="${element["name"]["common"]} flag"
      src="${element["flags"]["png"]}"
       />
    <div class="country-title">${element["name"]["common"]}</div>
    <a href="/detail.html?country=${element["name"]["common"]}" class="country-btn">More information</a>`;

  li.classList.add("country");

  ul.appendChild(li);
});
