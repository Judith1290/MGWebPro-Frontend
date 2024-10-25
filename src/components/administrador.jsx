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
    const [producto_id, setEditingId] = useState(null);
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
            const response = await fetch('http://localhost:8000/api/inventory/products/');
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchModelosYCategorias = async () => {
        try {
            const responseModelos = await fetch('http://localhost:8000/api/inventory/models/');
            const dataModelos = await responseModelos.json();
            setModelos(dataModelos);

            const responseCategorias = await fetch('http://localhost:8000/api/inventory/categories/');
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
            nombre: nombre,
            descripcion: desc,
            stock: stock,
            modelo: modelo,
            precio: precio,
            categoria: categoria,
            imagen: imageUrl,
        };

        try {
            const response = isEditing
                ? await fetch(`http://localhost:8000/api/inventory/products/${producto_id}/`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData),
                })
                : await fetch('http://localhost:8000/api/inventory/products/', {
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
                fetchProductos();
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

    const handleEdit = (producto) => {
        console.log("Editing product:", producto);
        console.log("Editing ID:", producto.producto_id);
        setModelo(producto.modelo || "");
        setPrecio(producto.precio);
        setCategoria(producto.categoria);
        setImageUrl(producto.imagen);
        setEditingId(producto.producto_id);
        setIsEditing(true);
    };

    useEffect(() => {
        fetchModelosYCategorias();
        fetchProductos();
    }, []);

    return (
        <div className="administrador-container container mt-5 p-4">
            <div className="administrador-form formContainer">
                <h2 className="text-center mb-4">{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
                <div className="formSection row">
                    <div className="imageContainer col-md-6 mb-2">
                        <IKContext
                            publicKey="public_jQbYnV75+ohlENFlgG1cAyQdQA4="
                            urlEndpoint="https://ik.imagekit.io/MGWebPro"
                            authenticator={authenticator}
                        >
                            <IKUpload
                                fileName="my-upload"
                                onError={handleImageUploadError}
                                onSuccess={handleImageUploadSuccess}
                                className="form-control inputField"
                            />
                        </IKContext>
                    </div>
                    <div className="col-md-6">
                        <select className="form-control mb-3 inputField" value={modelo || ""} onChange={(e) => setModelo(parseInt(e.target.value))}>

                            <option value="">Selecciona el modelo</option>
                            {modelos.map((modelo) => (
                                <option key={modelo.modelo_id} value={modelo.modelo_id}>
                                    {modelo.nombre_modelo}
                                </option>
                            ))}
                        </select>
                        <select className="form-control mb-3 inputField" value={categoria || ""} onChange={(e) => setCategoria(parseInt(e.target.value))}>
                            <option value="">Selecciona la categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.categoria_id} value={categoria.categoria_id}>
                                    {categoria.nombre_categoria}
                                </option>
                            ))}
                        </select>
                        <input className="form-control mb-3 inputField" type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(parseInt(e.target.value))} />
                        <input className="form-control mb-3 inputField" placeholder="Descripción" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        <input className="form-control mb-3 inputField" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input className="form-control mb-3 inputField" type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(parseInt(e.target.value))} />
                        <button className="btn btn-primary btn-block neon-effect" onClick={handleSubmit}>{isEditing ? 'Actualizar' : 'Agregar'}</button>
                    </div>
                </div>
            </div>

            <div className="productList mt-5">
                <h2 className="text-center mb-4">Lista de Productos</h2>
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <div key={producto.producto_id} className="productItem administrador-product">
                            <h3>{producto.nombre}</h3>
                            <img src={producto.imagen} alt={producto.imagen} className="productImage img-fluid" />
                            <p>Descripción: {producto.descripcion}</p>
                            <p>Modelo: {producto.modelo}</p>
                            <p>Precio: {producto.precio} CRC</p>
                            <p>Stock: {producto.stock}</p>
                            <button className="btn btn-light neon-effect" onClick={() => handleEdit(producto)}>Editar</button>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );

}

export default Administrador;


