const axios = require("axios");

const harryPotterBookISBN = "0590353427";
const obamaBookISBN = "1524763169";
const sonicBookISBN = "1879794902";
const tenISBN = "0688135749";
const inuBookISBN = "0764147439";

getJsonValuesFromISBN(harryPotterBookISBN)
getJsonValuesFromISBN(obamaBookISBN)
getJsonValuesFromISBN(sonicBookISBN)
getJsonValuesFromISBN(tenISBN)
getJsonValuesFromISBN(inuBookISBN)

async function getJsonValuesFromISBN(inputISBN) {

    // let baseUrl = "http://127.0.0.1:8080/"
    // // Filter interface:
    let baseUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
    let urlWithInputISBN = baseUrl + inputISBN;
    console.log(urlWithInputISBN);
    let responseRawJSON = await axios.get(urlWithInputISBN);
    let responseDataJSON = responseRawJSON.data;
    // console.log(responseRawJSON)
    // console.log(responseDataJSON)
    console.log(responseDataJSON.items[0].volumeInfo.title)
    console.log(responseDataJSON.items[0].volumeInfo.authors[0])
    console.log(responseDataJSON.items[0].volumeInfo.imageLinks.thumbnail)

}
