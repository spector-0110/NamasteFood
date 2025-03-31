import { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import Shimmer from "./Shimmer";

const Body = () => {
    console.log("Body Rendered");

    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [filterBtnName, setFilterBtnName] = useState("Top Rated Restaurants");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6939957&lng=77.4549679&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const jsonData = await response.json();

        const fetchedRestaurants =
            jsonData.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        setRestaurants(fetchedRestaurants);
        setFilteredRestaurants(fetchedRestaurants);
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

    if (restaurants.length === 0) {
        return <Shimmer />;
    }

    return (
        <div className="body">
            <div className="search-container">
                <input
                    placeholder="Search restaurants or cuisines..."
                    type="text"
                    className="search-box"
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
