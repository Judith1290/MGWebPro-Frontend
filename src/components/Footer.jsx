import Card from 'react-bootstrap/Card';
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Mapa from './maps';

const Footer = () => {

    const whatsappLink = () => {
        const mensaje = `Consulta desde la página web: MG Technology%0AAsunto: Consulta%0AMensaje: Estoy interesado en sus productos.`;
        return `https://wa.me/50661581636?text=${mensaje}`;
    };

    return (
        <div className='contenedorFo'>
            <Card className='contenedor'>
                <Card.Header className='footer1'>Información</Card.Header>
                <Card.Body>
                    <div className="row">

                        <div className="col-md-6  mt-2">
                            <Mapa />
                        </div>


                        <div className="col-md-6 mt-5 text-center">

                            <Card.Title>MG TECHNOLOGY</Card.Title>
                            <Card.Text>
                                Nuestra misión en MG Technology es proporcionar productos de alta calidad que impulsen el crecimiento y
                                la eficiencia de nuestros clientes. Nos comprometemos a ofrecer productos y servicios excepcionales.
                            </Card.Text>
                            <Card.Text>
                                Estamos ubicado en Puntarenas centro, frente a grupo mutual a un costado de la farmacia Don Gerardo.
                            </Card.Text>


                            <div className='text-center'>
                                <p className='titulo'>Síguenos en nuestras redes sociales</p>
                                <div className='iconos'>
                                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                                        <FaWhatsapp className='redes fs-1' />
                                    </a>
                                    <Link to={'https://www.facebook.com/MGtechnology2417?mibextid=ZbWKwL'}>
                                        <FaFacebookF className='redes fs-1' /> {/* fs-1 es el tamaño más grande */}
                                    </Link>
                                    <Link to={'https://www.instagram.com/mgtechnology2417?igshid=cjZhYjVwYzQyM3Rm'}>
                                        <FaSquareInstagram className='redes fs-1' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Footer;
