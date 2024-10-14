import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IKContext, IKUpload } from 'imagekitio-react';

function Administrador() {
    const [stock, setStock] = useState('');
    const [desc, setDesc] = useState('');
    const [nombre, setNombre] = useState('');
    const [modelo, setModelo] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [productos, setProductos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [modelos, setModelos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const handleImageUploadSuccess = (response) => {
        setImageUrl(response.url);
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

    const fetchModelosYCategorias = async () => {
        try {
            const responseModelos = await fetch('http://localhost:8000/api/model/');
            const dataModelos = await responseModelos.json();
            setModelos(dataModelos);

            const responseCategorias = await fetch('http://localhost:8000/api/category/');
            const dataCategorias = await responseCategorias.json();
            setCategorias(dataCategorias);
        } catch (error) {
            console.error('Error fetching models and categories:', error);
        }
    };

    const authenticator = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/imagekit-auth/');
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };

    const handleSubmit = async () => {
        const productData = {
            producto_nombre: nombre,
            producto_descripcion: desc,
            stock: stock,
            modelo: modelo,
            precio: precio,
            categoria: categoria,
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
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData),
                });

            if (response.ok) {
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
        fetchModelosYCategorias();
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
                            authenticator={authenticator}
                        >
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
                            {modelos.map((modelo) => (
                                <option key={modelo.modelo_id} className='option' value={modelo.modelo_id}>
                                    {modelo.nombre_modelo}
                                </option>
                            ))}
                        </select>
                        <select className='inputField' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option className='option' value="">Selecciona la categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.categoria_id} className='option' value={categoria.categoria_id}>
                                    {categoria.nombre_categoria}
                                </option>
                            ))}
                        </select>

                        <input className='inputField' type='number' placeholder='stock' onChange={(e) => setStock(e.target.value)} />
                        <input className='inputField' placeholder='descripcion' onChange={(e) => setDesc(e.target.value)} />
                        <input className='inputField' placeholder='nombre' onChange={(e) => setNombre(e.target.value)} />
                        <input className='inputField' type='number' placeholder='precio' onChange={(e) => setPrecio(e.target.value)} />
                    </div>
                    <button className='submitButton' onClick={handleSubmit}>{isEditing ? 'Actualizar' : 'Agregar'}</button>
                </div>
            </div>

            {/* Lista de productos */}
            <div className='productList'>
                <h2>Lista de Productos</h2>
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <div key={producto.producto_id} className='productItem'>
                            <h3>{producto.producto_nombre}</h3>
                            <p>Descripción: {producto.producto_descripcion}</p>
                            <p>Modelo: {producto.modelo}</p>
                            <p>Precio: {producto.precio} CRC</p>
                            <p>Stock: {producto.stock}</p>
                            <p>Categoría: {producto.categoria}</p>
                            <img src={producto.imagen} alt={producto.producto_nombre} className='productImage' />
                            <button onClick={() => handleEdit(producto)}>Editar</button>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );
}

export default Administrador;
