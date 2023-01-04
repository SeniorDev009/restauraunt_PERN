import React from 'react'

const AddRestaurant = () => {
    return (
        <div className='mb-4'>
            <form action="">
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder='name' />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder='location' />
                    </div>
                    <div className="col">
                        <select name="" id="" className="form-control custom-select">
                            <option value="" disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className="col">
                    <button className="btn btn-primary">Add</button>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant