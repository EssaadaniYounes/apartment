export default function getLodging(id, lodgings) {
    const lodging = lodgings.filter(lodging => lodging.id == id);

    return lodging[0].name;
}