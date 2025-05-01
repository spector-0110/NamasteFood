import { useEffect, useState, useContext } from "react";
import RestaurantList from "./RestaurantList";
import Shimmer from "./Shimmer";
import { ThemeContext } from "../context/ThemeProvider";
import {useOnlineStatus} from "../utils/useOnlineStatus";
import useFetchRestaurantsData from "../utils/useFetchRestaurentsData";

const Body = () => {
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [filterBtnName, setFilterBtnName] = useState("Top Rated Restaurants");
    const [searchText, setSearchText] = useState("");
    const { theme } = useContext(ThemeContext);
    const isOnline = useOnlineStatus();
    
    // Use the custom hook with destructured values
    const { restaurants, loading, error } = useFetchRestaurantsData();

    // Update filtered restaurants when restaurants data changes
    useEffect(() => {
        if (restaurants.length > 0) {
            setFilteredRestaurants(restaurants);
        }
    }, [restaurants]);

    // Search functionality
    useEffect(() => {
        if (searchText.trim() === "") {
            setFilteredRestaurants(restaurants);
        } else {
            const filtered = restaurants.filter((res) => {
                const nameMatch = res.info.name.toLowerCase().includes(searchText.toLowerCase());
                const cuisineMatch = res.info.cuisines.join(", ").toLowerCase().includes(searchText.toLowerCase());
                return nameMatch || cuisineMatch;
            });
            setFilteredRestaurants(filtered);
        }
    }, [searchText, restaurants]);

    const filterBtn = () => {
        if (filterBtnName === "Top Rated Restaurants") {
            const topRated = restaurants.filter((res) => res.info.avgRating > 4.4);
            setFilteredRestaurants(topRated);
            setFilterBtnName("All Restaurants");
        } else {
            setFilteredRestaurants(restaurants);
            setFilterBtnName("Top Rated Restaurants");
        }
    };

    // Show offline state
    if (!isOnline) {
        return (
            <div className={`error-container ${theme === 'dark' ? 'error-dark' : ''}`}>
                <h2>Looks like you're offline</h2>
                <p>Please check your internet connection.</p>
            </div>
        );
    }

    // Show loading state
    if (loading) {
        return <Shimmer />;
    }

    // Show error state
    if (error) {
        return (
            <div className={`error-container ${theme === 'dark' ? 'error-dark' : ''}`}>
                <h2>Oops! Something went wrong</h2>
                <p>{error}</p>
            </div>
        );
    }

    // Show empty state
    if (!loading && restaurants.length === 0) {
        return (
            <div className={`empty-state ${theme === 'dark' ? 'empty-dark' : ''}`}>
                <h2>No restaurants found</h2>
            </div>
        );
    }

    return (
        <div className={`body ${theme === 'dark' ? 'body-dark' : ''}`}>
            <div className="search-container">
                <input
                    placeholder="Search restaurants or cuisines..."
                    type="text"
                    className={`search-box ${theme === 'dark' ? 'search-box-dark' : ''}`}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <button 
                    className={`filter-btn ${theme === 'dark' ? 'filter-btn-dark' : ''}`} 
                    onClick={filterBtn}
                >
                    {filterBtnName}
                </button>
            </div>

            <RestaurantList restaurants={filteredRestaurants} />
        </div>
    );
};

export default Body;
