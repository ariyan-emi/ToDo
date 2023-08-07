
async function ApiWeather() {
    try {
        const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e9599cefeamshbc7374c5a4657fap1ee92fjsn276533db2cd3',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const result = await response.json();
        try {
            if (response.status === 200) {
                return result
            } else {
                return false
            }
        } catch (e) {

        }
    }catch (e){
        return false
    }
}
export {ApiWeather}
