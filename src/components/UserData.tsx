import axios from "axios";
import {ReactElement, useEffect, useState} from "react";

export default function UserData(): ReactElement {
    const [userData, setUserData] = useState(null);
    const[userId, setUserId] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log(setUserId);

    useEffect(():void => {
        const axiosUser = async ():Promise<void> =>{
            setLoading(true);
            setError(null);
        try{
            const response= await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setUserData(response.data);
        }catch (err){
            // setError(err.message);
            setUserData(null)
        }finally {
            setLoading(false);
        }
        }
        axiosUser();
    }, [userId]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ): userData ? (
                <div>

                </div>
            ): null}
        </>
    )
}