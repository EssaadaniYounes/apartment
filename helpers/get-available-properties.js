export const getAvailableProperties = (lodging, properties) => {
    console.log(lodging, properties);
    const availableProperties = [];
    const CurrentLodgingProperties = properties.filter(property => property.lodging_id == lodging.id);
    for (let i = 1; i <= lodging.number_elements; i++) {
        const isAvailable = CurrentLodgingProperties.find(property => +property.num_apartment == i) == undefined;
        if (isAvailable) {
            availableProperties.push(i);
        }
    }
    return availableProperties;
}