import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange
            });
            addRestaurants(response.data.data.restaurant)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container mt-3'>
            <form>
                <div className="row">
                    <div className="col">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder='name' 
                            value = {name} 
                            onChange = {e => setName(e.target.value)}
                         />
                    </div>
                    <div className="col">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder='location' 
                            value = {location}
                            onChange = {e => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <select 
                            value = {priceRange}
                            onChange = {e => setPriceRange(e.target.value)}
                            name="" 
                            id="" 
                            className="form-control custom-select"
                        >
                            <option value="" disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className="col">
                        <button type='submit' onClick={handleSubmit} className="btn btn-primary form-control">Add</button>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant