import RestaurantCard from "./RestaurantCard";

const RestaurantList = ({ restaurants = [] }) => {
    return (
        <div className="res-container">
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.info.id} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default RestaurantList;