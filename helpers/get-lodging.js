export default function getLodging(id, lodgings) {
    const lodging = lodgings.filter(lodging => lodging.id == id);
    console.log(lodging, id, lodgings);
    return lodging[0]?.name;
}