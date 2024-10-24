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
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [selectedCryptoIds, setSelectedCryptoIds] = useState<string[]>(availableCryptos.map(crypto => crypto.id));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get('https://api.coincap.io/v2/assets');
                const filteredCryptos = response.data.data
                    .filter((crypto: Crypto) => selectedCryptoIds.includes(crypto.id))
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
    }, [selectedCryptoIds]);

    // Function to handle crypto change in the dropdown
    const handleCryptoChange = (index: number, newCryptoId: string) => {
        const updatedCryptoIds = [...selectedCryptoIds];
        updatedCryptoIds[index] = newCryptoId;
        setSelectedCryptoIds(updatedCryptoIds);
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
                    {cryptos.length === 0 ? (
                        <p>No cryptocurrencies available.</p>
                    ) : (
                        cryptos.map((crypto, index) => (
                            <Grid item xs={12} sm={6} md={4} key={crypto.id}>
                                <CryptoCard
                                    name={crypto.name}
                                    rank={crypto.rank}
                                    priceUsd={Number(crypto.priceUsd).toFixed(2)}
                                    changePercent24Hr={Number(crypto.changePercent24Hr).toFixed(2)}
                                    logo={logoMap[crypto.id]}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id={`crypto-select-${index}`}>Select Crypto</InputLabel>
                                    <Select
                                        labelId={`crypto-select-${index}`}
                                        value={selectedCryptoIds[index]}
                                        onChange={(e) => handleCryptoChange(index, e.target.value as string)}
                                    >
                                        {availableCryptos.map((cryptoOption) => (
                                            <MenuItem key={cryptoOption.id} value={cryptoOption.id}>
                                                {cryptoOption.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ))
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
