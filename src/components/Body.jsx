import { useEffect, useState, useContext } from "react";
import RestaurantList from "./RestaurantList";
import Shimmer from "./Shimmer";
import { ThemeContext } from "../context/ThemeProvider";

const Body = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [filterBtnName, setFilterBtnName] = useState("Top Rated Restaurants");
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetchData();
    }, []);
    
    
    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.69399&lng=77.08334",
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();
            const fetchedRestaurants = jsonData.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
            setRestaurants(fetchedRestaurants);
            setFilteredRestaurants(fetchedRestaurants);
            setError(null);
        } catch (err) {
            console.error("Error fetching restaurants:", err);
            setError("Failed to load restaurants. Please try again later.");
            setRestaurants([]);
            setFilteredRestaurants([]);
        }
    };

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

    if (error) {
        return <div className={`error ${theme === 'dark' ? 'error-dark' : ''}`}>{error}</div>;
    }

    if (restaurants.length === 0) {
        return <Shimmer />;
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

                <button className="filter-btn" onClick={filterBtn}>
                    {filterBtnName}
                </button>
            </div>

            <RestaurantList restaurants={filteredRestaurants} />
        </div>
    );
};

export default Body;
