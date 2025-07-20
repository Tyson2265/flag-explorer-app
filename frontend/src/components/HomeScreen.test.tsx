// src/components/HomeScreen.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeScreen from './HomeScreen';
import { MemoryRouter } from 'react-router-dom';

describe('HomeScreen', () => {
    it('renders the title', () => {
        render(
            <MemoryRouter>
                <HomeScreen />
            </MemoryRouter>
        );

        const heading = screen.getByRole('heading', { name: /flag explorer/i });
        expect(heading).toBeInTheDocument();
    });

    it('renders at least one flag card (mocked)', async () => {
        const mockData = [
            {
                name: { common: 'South Africa' },
                flags: { png: 'https://flagcdn.com/w320/za.png' },
                population: 59308690,
                capital: ['Pretoria'],
            },
        ];

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        } as Response);

        render(
            <MemoryRouter>
                <HomeScreen />
            </MemoryRouter>
        );

        const flag = await screen.findByAltText(/south africa/i);
        expect(flag).toBeInTheDocument();

        // Clean up mock
        (global.fetch as jest.Mock).mockRestore?.();
    });
});
