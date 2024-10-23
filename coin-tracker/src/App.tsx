import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CryptoCard from './components/CryptoCard'; // Assuming you have a CryptoCard component
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import './styling/App.css'; // Ensure path is correct
import { Box, Typography } from '@mui/material';

/**
 * Represents a cryptocurrency with properties including its ID, name, rank, price in USD,
 * and percentage change in the past 24 hours.
 */
interface Crypto {
    id: string;
    name: string;
    rank: number;
    priceUsd: string;
    changePercent24Hr: string;
}

// Updated logoMap without .default
/**
 * Represents a mapping of string keys to string values where each key corresponds an image file path.
 * The logoMap object is used to store paths to image files for different cryptocurrencies.
 */
const logoMap: { [key: string]: string } = {
    bitcoin: require('./assets/bitcoin.png'),
    ethereum: require('./assets/ethereum.png'),
    tether: require('./assets/tether.png'),
};

/**
 * Function that fetches cryptocurrency data from an external API and displays it in a styled component.
 * @returns JSX element that contains a list of selected cryptocurrencies with their respective details.
 */
export default function App() {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get('https://api.coincap.io/v2/assets');
                console.log(response.data.data);
                const filteredCryptos = response.data.data
                    .filter((crypto: Crypto) => ['bitcoin', 'ethereum', 'tether'].includes(crypto.id))
                    .sort((a: Crypto, b: Crypto) => a.rank - b.rank);
                setCryptos(filteredCryptos);
            } catch (error) {
                setError('Error fetching data.');
                console.error(error);
            }
        };

        fetchCryptos();
        const interval = setInterval(fetchCryptos, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ul className="Contracker">
                {Array.from('COINTRACKER').map((letter, index) => (
                    <li key={index}>{letter}</li>
                ))}
            </ul>
            <Container style={{ paddingTop: '20px' }}>
                <Grid container spacing={3}>
                    {error && <p>{error}</p>}
                    {cryptos.length === 0 ? (
                        <p>No cryptocurrencies available.</p>
                    ) : (
                        cryptos.map((crypto) => (
                            <Grid item xs={12} sm={6} md={4} key={crypto.id}>
                                <CryptoCard
                                    name={crypto.name}
                                    rank={crypto.rank}
                                    priceUsd={Number(crypto.priceUsd).toFixed(2)}
                                    changePercent24Hr={Number(crypto.changePercent24Hr).toFixed(2)}
                                    logo={logoMap[crypto.id]}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
            <div className="sea">
                <div className="circle-wrapper">
                    <div className="bubble"></div>
                    <div className="submarine-wrapper">
                        <div className="submarine-body">
                            <div className="window"></div>
                            <div className="engine"></div>
                            <div className="light"></div>
                        </div>
                        <div className="helix"></div>
                        <div className="hat">
                            <div className="leds-wrapper">
                                <div className="periscope"></div>
                                <div className="leds"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
