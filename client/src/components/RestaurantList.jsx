import React, {useEffect, useContext} from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate  } from "react-router-dom";

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let history = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])
    const handleDelete = async (id) => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response)
            setRestaurants(
                restaurants.filter((restaurant) => {
                    return restaurant.id !== id
                })
            )
        } catch (err) {
            console.log(err)
        }
    }
    const handleUpdate = (id) => {
        history(`/restaurants/${id}/update`);
    };
  return (
    <div className="container mt-3">
        <table className="table table-striped table-hover table-dark">
            <thead>
            <tr>
                <th>Restaurant</th>
                <th>Location</th>
                <th>Price Range</th>
                <th>Ratings</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                { restaurants && restaurants.map(restaurant => {
                    return (
                        <tr key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{restaurant.on_sale}</td>
                            <td><button onClick={() => handleUpdate(restaurant.id)} className="btn btn-info btn-sm">Update</button></td>
                            <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                    );
                    
                })}
                
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList