import React from 'react';
import {  MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
const Maps=(props)=>{  
    console.log(props)  
    const position = [props.piso.latitud, props.piso.longitud]
    return (
        <div className="leaflet-container">
            <MapContainer
                center={position}
                zoom={13}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        {props.piso.nombre}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
export default Maps;