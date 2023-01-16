import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const history = useNavigate();
    const { restaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        }

        fetchData()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        console.log(updatedRestaurant);
        history("/");
    }

    return (
        <div>
            <h1>  </h1>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input 
                        id="location" 
                        type="text" 
                        className="form-control" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input 
                        id="price_range" 
                        type="number" 
                        className="form-control" 
                        value={priceRange} 
                        onChange={(e) => setPriceRange(e.target.value)}
                    />
                </div>
                <div className="form-group pt-2">
                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateRestaurant