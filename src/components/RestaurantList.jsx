import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";


const RestaurantList = ({ restaurants = [] }) => {
    return (
        <div className="res-container">
            {restaurants.map((restaurant) => (
                <Link key={restaurant.info.id} to={`/restaurant/${restaurant.info.id}`}> <RestaurantCard key={restaurant.info.id} restaurant={restaurant} /> </Link>
            ))}
        </div>
    );
};

export default RestaurantList;