import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailScreen from '../components/DetailScreen';

beforeAll(() => {
    global.fetch = jest.fn();
});

afterAll(() => {
    jest.resetAllMocks();
});

test('renders country details after fetch', async () => {
    const mockCountry = {
        name: "South Africa",
        capital: "Pretoria",
        population: 60000000,
        flag: "https://flagcdn.com/w320/za.png"
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockCountry,
    });

    render(
        <MemoryRouter initialEntries={['/countries/South%20Africa']}>
            <Routes>
                <Route path="/countries/:name" element={<DetailScreen />} />
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText(/South Africa/)).toBeInTheDocument();
        expect(screen.getByText(/Pretoria/)).toBeInTheDocument();
        expect(screen.getByText(/60000000/)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockCountry.flag);
    });
});
