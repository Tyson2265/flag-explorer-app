import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CountryDetails } from '../types';

function DetailScreen() {
    const { name } = useParams<{ name: string }>();
    const [details, setDetails] = useState<CountryDetails | null>(null);

    useEffect(() => {
        if (name) {
            fetch(`http://localhost:8080/countries/${name}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => setDetails(data))
                .catch((error) => console.error('Error fetching details:', error));
        }
    }, [name]);

    if (!details) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <Link to="/" className="text-blue-500 mb-4 inline-block">← Back to Home</Link>
            <h1 className="text-3xl font-bold mb-4">{details.name}</h1>
            <img src={details.flag} alt={`${details.name} flag`} className="w-full h-64 object-cover mb-4" />
            <p><strong>Population:</strong> {details.population}</p>
            <p><strong>Capital:</strong> {details.capital}</p>
        </div>
    );
}

export default DetailScreen;
