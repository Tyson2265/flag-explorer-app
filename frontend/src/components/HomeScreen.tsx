import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Country } from '../types';

function HomeScreen() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/countries')
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data: Country[]) => setCountries(data))
            .catch((err) => {
                console.error('Error fetching countries:', err);
                setError('Failed to load countries');
            });
    }, []);

    if (error) return <div className="text-center text-red-600 mt-4">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Flag Explorer</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {countries.map((country) => (
                        <div
                            key={country.name}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                        >
                            <Link to={`/country/${country.name}`} className="block">
                                <div className="w-full h-48">
                                    <img
                                        src={country.flag}
                                        alt={`${country.name} flag`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-700 truncate">{country.name}</h2>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                {countries.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No countries available.</p>
                )}
            </div>
        </div>
    );
}

export default HomeScreen;
