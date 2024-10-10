import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CryptoCard from './components/CryptoCard';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';

interface Crypto {
    id: string;
    name: string;
    rank: number;
    priceUsd: string;
    changePercent24Hr: string;
}

export default function App() {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get('https://api.coincap.io/v2/assets');
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
            <Container style={{ paddingTop: '20px' }}>
                <Grid container spacing={3}>
                    {error && <p>{error}</p>}
                    {cryptos.map((crypto) => (
                        <Grid item xs={12} sm={6} md={4} key={crypto.id}>
                            <CryptoCard
                                name={crypto.name}
                                rank={crypto.rank}
                                priceUsd={crypto.priceUsd}
                                changePercent24Hr={crypto.changePercent24Hr}
                                logo={`/assets/${crypto.id}.png`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
