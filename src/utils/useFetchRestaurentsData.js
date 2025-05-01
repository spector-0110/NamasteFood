import { useEffect, useState } from "react";

const useFetchRestaurantsData = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const apiUrl = "https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.69399&lng=77.08334";
            setLoading(true);
            const response = await fetch(apiUrl, {
                headers: {
                    'Accept': 'application/json',
                    
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            
            if (!jsonData?.data?.cards) {
                throw new Error('Invalid API response structure');
            }

            // Find the card that contains restaurant data
            const restaurantCard = jsonData.data.cards.find(
                card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
            );

            const fetchedRestaurants = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
            
            if (fetchedRestaurants.length === 0) {
                throw new Error('No restaurants found');
            }

            setRestaurants(fetchedRestaurants);
            setError(null);
        } catch (err) {
            // console.error("Error fetching restaurants:", err);
            setError(err.message || 'Failed to fetch restaurants');
            setRestaurants([]);
        } finally {
            setLoading(false);
        }
    };

    return { restaurants, loading, error };
};

export default useFetchRestaurantsData;