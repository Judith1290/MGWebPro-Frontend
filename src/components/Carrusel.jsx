import Carousel from 'react-bootstrap/Carousel';
import React from 'react';


const Carrusel = () => {

    const images = [
        { src: "/img/imagen.png", alt: "prueba" },
        { src: "/img/imagen1.png", alt: "soli" },
        { src: "img/imagen2.png", alt: "lala" },
        

    ]
    return (
        <div>

            <Carousel data-theme="white" className='Carrusel'>
                {images.map((imagen, index) => (
                    <Carousel.Item key={index} className='CarruselItems'>
                        <img
                            className="d-block w-400"
                            src={imagen.src}
                            alt={imagen.alt}
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                        <h3>{imagen.alt}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

        </div>

    );
}

export default Carrusel