import {useState} from "react";
import PropTypes from "prop-types";

const initialDataForm = {
    id: 0,
    name: '',
    description: '',
    price: '',
}
export const ProductForm = ({handlerAdd, productSelected}) => {

    //El estado inicial viene DIRECTO del prop
    const [form, setForm] = useState(productSelected)
    const {id, name, description, price} = form;
    const [errors, setErrors] = useState({});

    const onSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = await handlerAdd(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setForm(initialDataForm);
    }


    return (
        <form onSubmit={onSubmit}>

            <div>
                <input placeholder="Name" className={`form-control my-3 w-75 ${errors.name ? 'is-invalid' : ''}`}
                       name="name" value={name}
                       onChange={e => {
                           setForm({...form, name: e.target.value});
                           setErrors({...errors, name: null});
                       }}/>
                {errors.name && <div className={"invalid-feedback"}>{errors.name}</div>}
            </div>

            <div>
                <input placeholder="Description"
                       className={`form-control my-3 w-75 ${errors.description ? 'is-invalid' : ''}`}
                       name="description" value={description}
                       onChange={e => {
                           setForm({...form, description: e.target.value});
                           setErrors({...errors, description: null});
                       }}/>
                {errors.description && <div className={"invalid-feedback"}>{errors.description}</div>}
            </div>

            <div>
                <input placeholder="Price" className={`form-control my-3 w-75 ${errors.price ? 'is-invalid' : ''}`}
                       name="price" value={price}
                       onChange={e => {
                           setForm({...form, price: e.target.value});
                           setErrors({...errors, price: null});
                       }}/>
                {errors.price && <div className={"invalid-feedback"}>{errors.price}</div>}
            </div>

            <div className="my-3">
                <button className="btn btn-primary" type="submit">
                    {id > 0 ? 'Update' : 'Create'}
                </button>
            </div>


        </form>
    );
}

ProductForm.propTypes = {
    handlerAdd: PropTypes.func.isRequired,
    productSelected: PropTypes.object.isRequired
}