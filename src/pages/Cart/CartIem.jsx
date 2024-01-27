import React from 'react';
import { useDispatch } from 'react-redux';
import { decreaseItem, increaseItem, removeItem } from '../../redux/reducer/CartReducer';

function CartIem({item}) {
    let dispatch = useDispatch()
    let totalPrice = item.quantity * item.price
    return (
        <div className='container row border'>
            <img className='col-md-3' src={item.image} alt=''/>
            <div className='col-md-9'>
            <div className='row align-items-center mb-2'>
                <h5 className='col-md-6 text text-start'>{item.name}</h5>
                <p className='col-md-6 text-end'>{totalPrice}</p>
            </div>
            <div className='row border'>
            <div className='row col align-items-center'>
                <button className='btn btn-primary col'onClick={()=> dispatch(increaseItem(item.id))}><i class="fa-solid fa-plus"></i></button>
                <p className="col text-center">{item.quantity}</p>
                <button className='btn btn-primary col'onClick={()=> dispatch(decreaseItem(item.id))}><i class="fa-solid fa-minus"></i></button>
            </div>
            <div className='row col'>
                <button type="button" className='btn btn-outline-info col'>Edit</button>
                <button type="button" className='btn btn-outline-danger col' onClick={()=> dispatch(removeItem(item.id))}>Delete</button>
            </div>
            </div>
            </div>
        </div>
    );
}

export default CartIem;