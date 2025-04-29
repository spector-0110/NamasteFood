import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ restaurant }) => {
    const { theme } = useContext(ThemeContext);
    const { name, cuisines, avgRating, costForTwo, cloudinaryImageId, areaName } = restaurant?.info || {};

    return (
        <div className={`res-card ${theme === 'dark' ? 'res-card-dark' : ''}`}>
            <img 
                src={`${CDN_URL}${cloudinaryImageId}`}
                alt={name}
                className="res-logo" 
            />
            <h2>{name}</h2>
            <p>{cuisines?.join(", ")}</p>
            <p>{avgRating} stars</p>
            <p>{costForTwo}</p>
            <p>{areaName}</p>
        </div>
    );
};

export default RestaurantCard;