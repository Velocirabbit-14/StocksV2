import 'whatwg-fetch'
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../components/App';

describe('App tests', () => {

    it('should render loading while data is null', () => {
        const appRender =  render(<App />)
      const loading = appRender.getByText('loading');
      expect(loading).toBeInTheDocument()
    })
});



//Megamarket: location, totalStock, sales
//test to see if megamarkets renders
//test tosee if megamarkets without location works