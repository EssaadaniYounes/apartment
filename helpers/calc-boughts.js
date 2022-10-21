export default function calcBought(apartments) {
    let count = 0;
    apartments.forEach(apartment => {
        if (apartment.status == 'soldé') {
            count++;
        }
    });
    return count;
}
export function getLastPayment(id, payments) {
    if (payments.length > 0) {
        const commun = payments.filter(payment => payment.id == id);
        return commun[commun.length - 1].next_payment
    }
    return ' '
}

export function calcTotal(items, key) {
    return items.reduce((prev, cur) => prev + +cur[key], 0)
}