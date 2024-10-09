import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';

function Administrador() {
    const [modelo, setModelo] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [productos, setProductos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageUploadSuccess = (response) => {
        setImageUrl(response.url); // Guarda la URL de la imagen cargada
        Swal.fire({
            icon: 'success',
            title: 'Imagen cargada exitosamente',
            text: 'La imagen se ha subido correctamente',
        });
    };

    const handleImageUploadError = (error) => {
        console.error('Error al cargar la imagen:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al cargar imagen',
            text: 'Ocurrió un error al subir la imagen. Inténtalo de nuevo.',
        });
    };

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/product/'); 
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSubmit = async () => {
        const productData = {
            modelo,
            precio,
            categoria,
            imagen: imageUrl,
        };

        try {
            const response = isEditing
                ? await fetch(`http://localhost:8000/api/product/${editingId}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData),
                })
                : await fetch('http://localhost:8000/api/product/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData),
                });

            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: isEditing ? 'Producto actualizado' : 'Producto agregado',
                    text: `El producto ha sido ${isEditing ? 'actualizado' : 'agregado'} exitosamente`,
                });
                setModelo('');
                setPrecio('');
                setCategoria('');
                setImageUrl('');
                setIsEditing(false);
                fetchProductos(); // Refresca la lista de productos
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorData.detail || 'Ocurrió un error al guardar el producto.',
                });
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al enviar los datos. Inténtalo de nuevo.',
            });
        }
    };

    const handleEdit = (product) => {
        setModelo(product.modelo);
        setPrecio(product.precio);
        setCategoria(product.categoria);
        setImageUrl(product.imagen);
        setEditingId(product.producto_id);
        setIsEditing(true);
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div className='administrador'>
            <div className='formContainer'>
                <h2>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
                <div className='formSection'>
                    <div className='imageContainer'>
                        <IKContext
                            publicKey="public_jQbYnV75+ohlENFlgG1cAyQdQA4="
                            urlEndpoint="https://ik.imagekit.io/MGWebPro"
                            transformationPosition="path"
                            authenticationEndpoint="http://www.yourserver.com/auth"
                        >
                            <IKImage
                                path={imageUrl}
                                transformation={[{ height: "300", width: "400" }]}
                            />
                            <IKUpload
                                fileName="my-upload"
                                onError={handleImageUploadError}
                                onSuccess={handleImageUploadSuccess}
                            />
                        </IKContext>
                    </div>
                    <div>
                        <select className='inputField' value={modelo} onChange={(e) => setModelo(e.target.value)}>
                            <option className='option' value="">Selecciona el modelo</option>
                            <option className='option' value="samsung">Samsung</option>
                            <option className='option' value="huawei">Huawei</option>
                            <option className='option' value="iphone">iPhone</option>
                            <option className='option' value="xiaomi">Xiaomi</option>
                        </select>
                        <select className='inputField' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option className='option' value="">Selecciona la categoría</option>
                            <option className='option' value="Cargadores">Cargadores</option>
                            <option className='option' value="Cables USB">Cables USB</option>
                            <option className='option' value="Cubo">Cubo</option>
                            <option className='option' value="Temperados">Temperados</option>
                            <option className='option' value="AROS DE LUZ">AROS DE LUZ</option>
                            <option className='option' value="Audifono">Audifono</option>
                            <option className='option' value="Celulares">Celulares</option>
                        </select>
                        <input className='inputField' type='number' placeholder='Precio en CR' value={precio} onChange={(e) => setPrecio(e.target.value)} />
                        <input onClick={handleSubmit} className='submitButton' type="button" value={isEditing ? "Actualizar" : "Agregar"} />
                        {isEditing && (
                            <input onClick={() => setIsEditing(false)} className='closeButton' type="button" value="Cancelar" />
                        )}
                    </div>
                    <button variant="outline-success"><Link to='/'>Regresar</Link></button>
                </div>
            </div>
        </div>
    );
}

export default Administrador;
