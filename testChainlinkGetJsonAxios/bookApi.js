const axios = require("axios");

getJsonValues()

async function getJsonValues() {

    // let baseUrl = "http://127.0.0.1:8080/"
    // // Filter interface:
    let baseUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

    const sonicBookISBN = 1879794902;
    let sonicBookUrl = baseUrl + sonicBookISBN.toString();
    console.log(sonicBookUrl);
    let responseRawJSON = await axios.get(sonicBookUrl);
    let responseDataJSON = responseRawJSON.data;
    // console.log(responseRawJSON)
    // console.log(responseDataJSON)
    console.log(responseDataJSON.items[0].volumeInfo.title)
    console.log(responseDataJSON.items[0].volumeInfo.authors[0])
    console.log(responseDataJSON.items[0].volumeInfo.imageLinks.thumbnail)

}