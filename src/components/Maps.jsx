import React from "react"
const Mapa = () => {
    return (

        <div className="mapaCont">
            
            <div ><h1>NUESTRA UBICACIÓN</h1></div>
            <iframe
                src="https://www.google.com/maps/embed/v1/place?q=puntarenas+/+techfix&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                width="100%"
                height="400px"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"

            ></iframe>
        </div>
    )
}
export default Mapa


