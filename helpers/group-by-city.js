export default function groupByCity(data) {
    const keys = [];
    let isExist = false;
    data.map((item, i) => {

        const obj = {
            city: item.city,
            free: item.status == "soldé" ? 0 : 1,
            sold: item.status == "soldé" ? 1 : 0
        };
        keys.forEach(key => {
            if (key.city == item.city) {
                key.free = item.status == "soldé" ? key.free : key.free += 1;
                key.sold = item.status == "soldé" ? key.sold += 1 : key.sold;
                isExist = true;
                return;
            }
        })
        if (!isExist) {
            keys.push(obj);
        }
        isExist = false;
    })
    console.log(keys)
    return keys;
}