import { useState } from "react";

const useHTTP = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    const fetcher = async ({ URL, method="GET", body=null, headers=null }) => {
        setError(false);
        setLoading(true);
        let data = null;

        try{
        let response = await fetch(URL, {
            method,
            body: body ? JSON.stringify(body): null,
            headers,
        });

        if (!response.ok){
            setError(true);
            throw new Error("Couldn't get a proper response");
        }

        data = await response.json();

        } catch(err){
            console.log(err.message);
        }

        setLoading(false);

        return data;
    } 

    return { error, loading, fetcher };
}

export default useHTTP;