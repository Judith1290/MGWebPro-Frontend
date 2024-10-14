import Carousel from 'react-bootstrap/Carousel';
import React from 'react';


const Carrusel = () => {

    const images = [
        { src: "/img/imagen.png", alt: "SET DIJES" },
        { src: "/img/imagen1.png", alt:"SET DIJES" },
        { src: "img/imagen2.png", alt: "SET DIJES" },
        { src: "img/imagen3.png", alt: "SET DIJES" },
        ]
        
    return (
        <div>

            <Carousel data-theme="white" className='Carrusel'>
                {images.map((imagen, index) => (
                    <Carousel.Item key={index} className='CarruselItems'>
                        <img
                            className="d-block w-100"
                            src={imagen.src}
                            alt={imagen.alt}
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                        <h1>{imagen.alt}</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

        </div>

    );
}

export default Carrusel