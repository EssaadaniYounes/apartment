export default function calcBought(apartments) {
    let count = 0;
    apartments.forEach(apartment => {
        if (apartment.status == 'soldé') {
            count++;
        }
    });
    return count;
}
