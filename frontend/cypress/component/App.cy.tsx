import React from 'react';
import { mount } from '@cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import HomeScreen from '../../src/components/HomeScreen';
import DetailScreen from '../../src/components/DetailScreen';

describe('App Components', () => {
  it('renders HomeScreen with h1 after data load', () => {
    cy.intercept('GET', 'http://localhost:8080/countries', {
      statusCode: 200,
      body: [
        { name: 'South Africa', flag: 'sa.png' },
        { name: 'Brazil', flag: 'br.png' },
      ],
    }).as('getCountries');

    mount(
      <MemoryRouter initialEntries={['/']}>
        <HomeScreen />
      </MemoryRouter>
    );

    cy.wait('@getCountries');
    cy.get('h1').should('contain', 'Flag Explorer');
  });

  it('renders DetailScreen with h1 after data load', () => {
    cy.intercept('GET', 'http://localhost:8080/countries/Algeria', {
      statusCode: 200,
      body: {
        name: 'Algeria',
        flag: 'a.png',
        population: 44700000,
        capital: 'Algiers',
      },
    }).as('getCountryDetails');

    mount(
      <MemoryRouter initialEntries={['/country/Algeria']}>
        <DetailScreen />
      </MemoryRouter>
    );

    cy.wait('@getCountryDetails');
    cy.get('h1').should('contain', 'Algeria');
  });
});