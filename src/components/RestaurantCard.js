import { CDN_URL } from "../utils/constants";


const RestaurantCard = ({ restaurant }) => {
    if (!restaurant?.info) {
        return null; // Avoid rendering if data is missing
    }

   // Complete Image URL
   const imageUrl = CDN_URL + restaurant.info.cloudinaryImageId;

    console.log(imageUrl);

    return (
        <div className="res-card">
             <img 
                className="res-logo" 
                src={imageUrl} 
                alt={restaurant.info.name} 
            />
            <h2>{restaurant.info.name}</h2>
            <p>{restaurant.info.avgRating + " ⭐"}</p>
            <p>{restaurant.info.cuisines.join(", ")}</p>
            <p>{restaurant.info.locality}, {restaurant.info.areaName}</p>
        </div>
    );
};

export default RestaurantCard;