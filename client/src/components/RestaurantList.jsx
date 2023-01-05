import React, {useEffect, useContext} from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
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
                            <td><button type="button" className="btn btn-info btn-sm">Update</button></td>
                            <td><button type="button" className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                    );
                    
                })}
                
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList