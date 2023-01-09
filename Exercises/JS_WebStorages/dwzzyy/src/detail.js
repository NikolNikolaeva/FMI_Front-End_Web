const body = document.getElementsByTagName("body")[0];
body.firstElementChild.remove();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const country = urlParams.get("country");
const responce = await fetch("https://restcountries.com/v3.1/all");
const data = (await responce.json()).filter(
  (c) => c["name"]["common"] === country
)[0];
console.log(data);

const div = document.createElement("div");
div.classList.add("column");

if (data["borders"] != null) {
  var borderesCodes = data["borders"].join(",");
  var responceBorders = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${borderesCodes}`
  );
  var dataBorders = (await responceBorders.json())
    .map((c) => c["name"]["common"])
    .join(", ");
} else {
  var dataBorders = "";
}
const responceUni = await fetch(
  `http://universities.hipolabs.com/search?country=${data["name"]["common"]}`
);
const dataUni = await responceUni.json();

div.innerHTML = `
<div class="detail-page-header">
        <img
          src="${data["flags"]["png"]}"
          class="detail-page-header-image"
          alt=""
        />
        <div class="detail-page-header-title">${data["name"]["official"]}</div>
        <button id="closeBtn">Close</button>
      </div>

      <div class="detail-page-content-box">
        <div>
          <div class="detail-page-content-box-title">Country details</div>
          <div class="detail-page-content-box-content">
            Capital: ${data["capital"]} <br />
            Region: ${data["region"]} <br />
            Subregion: ${data["subregion"]} <br />
            Country area: ${data["area"]} km2 <br />
            Borders: ${dataBorders}
          </div>
        </div>
      </div>

      <div class="detail-page-content-box">
        <div>
          <div class="detail-page-content-box-title">Additional details</div>
          <div class="detail-page-content-box-content">
            Population: ${data["population"]} <br />
            Language:  ${Object.values(data["languages"]).join(", ")}<br />
            Timezone: ${Object.values(data["timezones"]).join(", ")}  <br />
            Currency: ${Object.values(data["currencies"])
              .map((c) => c.name)
              .join(", ")}
          </div>
        </div>
      </div>

      <div class="detail-page-content-box">
        <div>
          <div class="detail-page-content-box-title">Univesrty list</div>
          <div class="detail-page-content-box-content">
            <ul id="universities-list">
            </ul>
          </div>
        </div>
      </div>
`;

body.appendChild(div);

const ulUnies = document.getElementById("universities-list");
dataUni.forEach((element) => {
  const li = document.createElement("li");
  li.innerHTML = `${element.name}`;
  ulUnies.appendChild(li);
});
