export default async function getBase64(url, ref = null, id = null) {
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
            ref && (ref.current.src = base64data);
            id && (document.querySelector(`#${id}`).src = base64data);
        }
    });
    return base64data;
}