import PropTypes from "prop-types";

export const ProductTable = ({products, handlerProductSelected, handlerRemoveProduct}) => {
    return <table className="table table-hover table-striped">
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {
            products.map(product => {
                return (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td><button className={"btn btn-sm btn-primary"} onClick={() => handlerProductSelected(product)}>Update</button></td>
                        <td><button className="btn btn-sm btn-danger" onClick={() => handlerRemoveProduct(product.id)}>Delete</button></td>
                    </tr>
                )
            })
        }

        </tbody>
    </table>
}

ProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    handlerProductSelected: PropTypes.func.isRequired,
    handlerRemoveProduct: PropTypes.func.isRequired,
}