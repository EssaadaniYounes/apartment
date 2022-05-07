export default function groupData(payload) {
    const data = [
        { month: '1', count: 0 },
        { month: '2', count: 0 },
        { month: '3', count: 0 },
        { month: '4', count: 0 },
        { month: '5', count: 0 },
        { month: '6', count: 0 },
        { month: '7', count: 0 },
        { month: '8', count: 0 },
        { month: '9', count: 0 },
        { month: '10', count: 0 },
        { month: '11', count: 0 },
        { month: '12', count: 0 },
    ];

    payload.forEach(item => {
        // //get month and year from the item by the payment_date field
        const month = item.date_sale.split('-')[1].replace(0, '');
        const year = item.date_sale.split('-')[0];
        //check if the year is the same as the current year
        if (year == new Date().getFullYear()) {
            //Increment the month in the data object if is the same month as the month variable
            data[month - 1].count += 1;
        }
    })

    return data;
}