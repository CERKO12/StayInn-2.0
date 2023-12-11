import {useEffect, useState} from "react"

const useFetch = (url) => {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
        }
        fetchData();
    }, []);

    const reFetch = async() => {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
    }

    return {data, reFetch};
}

export default useFetch;

// import { useEffect, useState } from "react";

// const useFetch = (url) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = () => {
//       const xhr = new XMLHttpRequest();
//       xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//           const result = JSON.parse(xhr.responseText);
//           setData(result);
//         }
//       };
//       xhr.open("GET", url, true);
//       xhr.send();
//     };

//     fetchData();
//   }, [url]);

//   const reFetch = () => {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4 && xhr.status === 200) {
//         const result = JSON.parse(xhr.responseText);
//         setData(result);
//       }
//     };
//     xhr.open("GET", url, true);
//     xhr.send();
//   };

//   return { data, reFetch };
// };

// export default useFetch;
