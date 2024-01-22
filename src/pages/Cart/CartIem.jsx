import React from 'react';

function CartIem({item}) {
    return (
        <div className='container row border'>
            <img className='col-md-3' src={item.image} alt=''/>
            <div className='col-md-9'>
            <div className='row align-items-center mb-2'>
                <h4 className='col-md-6 text text-start'>{item.name}</h4>
                <p className='col-md-6 text-end'>{item.price}</p>
            </div>
            <div className='row border'>
            <div className='row col align-items-center'>
                <button className='btn btn-primary col'><i class="fa-solid fa-plus"></i></button>
                <p className="col text-center">1</p>
                <button className='btn btn-primary col'><i class="fa-solid fa-minus"></i></button>
            </div>
            <div className='row col'>
                <button type="button" className='btn btn-outline-info col'>Edit</button>
                <button type="button" className='btn btn-outline-danger col'>Delete</button>
            </div>
            </div>
            </div>
        </div>
    );
}

export default CartIem;