import React from 'react'

function SaleCard({ data }) {
    return (
        <div className="rounded-br-md shadow-md p-6">

            <Card>
                <SmallInfos label="Client" value={data.name} />
                <SmallInfos label="Mobel" value={data.lodging} />
            </Card>
            <Card>
                <SmallInfos label="Ville" value={data.city} />
                <SmallInfos label="Propertié adresse" value={data.address} />
            </Card>
            <Card>
                <SmallInfos label="Prix de vente" value={data.agreed_amount+'DH'} />
                <SmallInfos label="Reste" value={data.rest+'DH'} />
            </Card>
        </div >
    )
}
const Card = (props) => {
    return (
        <div className="w-full">
            {props.children}
        </div>)
}
const SmallInfos = ({ label, value }) => {
    return (
        <div className="flex items-center gap-2 my-2">
            <h2 className="font-semibold text-[17px]">{label} :</h2>
            <p className="capitalize">{value}</p>
        </div>
    )
}
export default SaleCard