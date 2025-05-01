
import {useRouteError} from "react-router-dom";

const Error= ()=>{
    const error = useRouteError();
    return(
        <div>
            <h1>4000000000004!</h1>
            <h2>{error.status} {error.statusText}</h2>
            <p>{error.data}</p>
        </div>
    )
}

export default Error;