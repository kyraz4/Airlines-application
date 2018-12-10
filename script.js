const url = `https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48`;

const airportCoord = {
    x: 55.410307,
    y: 37.902451,
};

const changeScreen = (element) => {
const tableContainer = document.querySelector('.table-data');
    tableContainer.innerHTML = ``;
    tableContainer.appendChild(element.cloneNode(true));
  };

const getElementFromTeamplate = (temp) => {
    const newDom = document.createElement(`table`);
    newDom.innerHTML = temp;
    return newDom;
  };

const makeTable = arr => {
    const info = {
        coordX : 1,
        coordY : 2,
        speed : 5,
        heigth : 4,
        course : 3,
        departureAirport:11,
        arrivalAirport:12,
        number: 13,
    };
    const str = arr.reduce((acc, el) => {
        return acc + `<tr>
        <th>${el[info.coordX]} , ${el[info.coordY]}</th>
        <th>${el[info.speed]}</th>
        <th>${el[info.course]}</th>
        <th>${el[info.heigth]}</th>
        <th>${el[info.departureAirport]} - ${el[info.arrivalAirport]}</th>
        <th>${el[info.number]}</th>
                     </tr>`;
    }, ``);

    const table = getElementFromTeamplate(str);
    changeScreen(table);
};  

const distance = (el) => {
    const coordX = 1;
    const coordY = 2;
    return Math.sqrt(Math.pow(airportCoord.x - el[coordX],2) + Math.pow(airportCoord.y - el[coordY],2));
};

const sortRise = arr => arr.sort((a,b) => a[a.length-1] - b[b.length-1]);

const getData = () => fetch(url).then(response => response.json()).
then(data => Object.values(data).slice(2)).
then(data => {
    data.forEach(el => {
        el.push(distance(el));  
    });
    return sortRise(data);
}).
then(sortedData => makeTable(sortedData));

getData();
setInterval(() => {getData()}, 2500);