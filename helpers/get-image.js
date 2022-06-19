export default async function getBase64(url, ref) {
    const data = await fetch(
        'https://cors-everywhere.herokuapp.com/' + url,
        {
            headers: {
                'Accept': 'application/json',
                "origin": "http://meatmarketdanish.com",
                "x-requested-with": "XMLHttpRequest",
            }
        });
    var base64data = "Nothing";
    const blob = await data.blob();
    new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            base64data = reader.result;
            resolve(base64data);
            ref.current.src = base64data;
        }
    });
}