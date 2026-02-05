import PropTypes from "prop-types";
import {ProductTable} from "./components/ProductTable.jsx";
import {useEffect, useState} from "react";
import {ProductForm} from "./components/ProductForm.jsx";
import {findAll, remove, update, create} from "./services/productService.js";
import Swal from "sweetalert2";

export const ProductApp = ({title}) => {

    const [products, setProducts] = useState([]);
    const [productSelected, setProductSelected] = useState({
        id: 0,
        name: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        const loadProducts = async () => {
            const result = await findAll();
            setProducts(result.data);
        };
        loadProducts();
    }, [])

    const handlerAddProduct = async (product) => {

        try {

            if (product.id > 0) {

                const response = await update(product);

                setProducts(
                    prev => prev.map(p => p.id === product.id ? response.data : p),
                );

                Swal.fire({
                    title: "Actualizado con exito!",
                    text: `Producto ${product.name} actualizado con exito!`,
                    icon: "success"
                });

            } else {
                const response = await create(product);
                setProducts(prev => [...prev, response.data]);
                Swal.fire({
                    title: "Creado con exito!",
                    text: `Producto ${product.name} creado con exito!`,
                    icon: "success"
                });
            }

            return {}; //Sin errores

        } catch (error) {
            if (error?.status === 400) {
                //Errores de validación del backend
                return error.data;
            }

            Swal.fire({
                title: "Error",
                text: "Ocurrió un error inesperado",
                icon: "error"
            });

            return {};

        }

    }

    const handlerProductSelected = (product) => {
        setProductSelected({...product});
        console.log(productSelected);
    }

    const handlerRemoveProduct = async (id) => {

        Swal.fire({
            title: "Estas seguro?",
            text: "Esta acción es irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id);
                setProducts(
                    products.filter(product => product.id !== id)
                );
                Swal.fire({
                    title: "Eliminado con exito!",
                    text: `Producto eliminado con exito!`,
                    icon: "success"
                });
            }
        });
    }

    return <div className="container my-4">

        <h2>{title}</h2>
        <div className="row">

            <div className="col">
                <ProductForm key={productSelected.id} handlerAdd={handlerAddProduct} productSelected={productSelected}/>
            </div>

            <div className='col'>
                {
                    (products.length > 0) ?
                        <ProductTable products={products} handlerProductSelected={handlerProductSelected}
                                      handlerRemoveProduct={handlerRemoveProduct}/>
                        : <div className="alert alert-warning">No hay productos en el sistema !</div>
                }
            </div>

        </div>

    </div>
}

ProductApp.propTypes = {
    title: PropTypes.string.isRequired,
}