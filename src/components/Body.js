import RestaurantList from "./RestaurantList";
import restaurants from "../utils/mockData";


const Body =()=>{
    return (
        <div className="body">

            {/* <div className="search">
                <h3>search</h3>
            </div> */}
            <div className="filter"> 
                <button className="filter-btn" onClick={ () => {console.log("button")}}>top rated restaurant</button>
            </div>
            
            <RestaurantList restaurants={restaurants} />

        </div>
    );
};

export default Body;