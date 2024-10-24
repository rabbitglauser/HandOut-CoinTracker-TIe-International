import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CryptoCard from './components/CryptoCard';
import { ThemeProvider, CssBaseline, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import theme from './theme/theme';
import './styling/App.css';

interface Crypto {
    id: string;
    name: string;
    rank: number;
    priceUsd: string;
    changePercent24Hr: string;
}

// Define available cryptocurrencies
const availableCryptos = [
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'tether', name: 'Tether' },
    { id: 'solana', name: 'Solana' },
    { id: 'cardano', name: 'Cardano' },
];

// Map of cryptocurrency logos
const logoMap: { [key: string]: string } = {
    bitcoin: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    ethereum: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    tether: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
    solana: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
    cardano: 'https://cryptologos.cc/logos/cardano-ada-logo.svg',
};

export default function App() {
    const [cryptos, setCryptos] = useState<Crypto[]>([]); // Holds all fetched cryptos
    const [selectedCryptoIds, setSelectedCryptoIds] = useState<string[]>(['bitcoin', 'ethereum', 'tether']); // Default to 3 cryptos
    const [error, setError] = useState<string | null>(null);

    const [displayedCryptos, setDisplayedCryptos] = useState<Crypto[]>([]); // Holds the currently displayed 3 cryptos

    useEffect(() => {
        // Fetch all available cryptocurrencies from the API
        const fetchCryptos = async () => {
            try {
                const response = await axios.get('https://api.coincap.io/v2/assets');
                setCryptos(response.data.data);
            } catch (error) {
                setError('Error fetching data.');
                console.error(error);
            }
        };

        fetchCryptos();
        const interval = setInterval(fetchCryptos, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Filter or fetch the specific selected cryptocurrencies when `selectedCryptoIds` changes
        const filteredCryptos = cryptos.filter(crypto => selectedCryptoIds.includes(crypto.id));
        setDisplayedCryptos(filteredCryptos);
    }, [selectedCryptoIds, cryptos]);

    // Function to handle crypto change in the dropdown for a specific card (index)
    const handleCryptoChange = (index: number, newCryptoId: string) => {
        const updatedCryptoIds = [...selectedCryptoIds];
        updatedCryptoIds[index] = newCryptoId; // Change the selected crypto for the specific card
        setSelectedCryptoIds(updatedCryptoIds); // Update the state
    };

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
                    {displayedCryptos.length === 0 ? (
                        <p>No cryptocurrencies available.</p>
                    ) : (
                        selectedCryptoIds.map((cryptoId, index) => {
                            const crypto = cryptos.find(c => c.id === cryptoId);

                            return crypto ? (
                                <Grid item xs={12} sm={6} md={4} key={crypto.id}>
                                    <CryptoCard
                                        name={crypto.name}
                                        rank={crypto.rank}
                                        priceUsd={Number(crypto.priceUsd).toFixed(2)}
                                        changePercent24Hr={Number(crypto.changePercent24Hr).toFixed(2)}
                                        logo={logoMap[crypto.id]}
                                        selectedCryptoId={selectedCryptoIds[index]} // Pass the selected crypto ID for the dropdown
                                        onCryptoChange={(newCryptoId) => handleCryptoChange(index, newCryptoId)} // Handle dropdown change
                                    />
                                </Grid>
                            ) : null;
                        })
                    )}
                </Grid>
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
            </Container>
        </ThemeProvider>
    );
}
