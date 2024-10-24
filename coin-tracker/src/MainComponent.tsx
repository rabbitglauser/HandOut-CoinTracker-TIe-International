// src/MainComponent.tsx
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import CryptoCard from './components/CryptoCard';

const MainComponent: React.FC = () => {
    // Define available cryptocurrencies with their properties
    const cryptoOptions = [
        { id: 'bitcoin', name: 'Bitcoin', priceUsd: '45000', rank: 1, changePercent24Hr: '2.5', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg' },
        { id: 'ethereum', name: 'Ethereum', priceUsd: '3000', rank: 2, changePercent24Hr: '1.5', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg' },
        { id: 'solana', name: 'Solana', priceUsd: '150', rank: 3, changePercent24Hr: '3.0', logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg' },
        { id: 'cardano', name: 'Cardano', priceUsd: '1.20', rank: 4, changePercent24Hr: '2.0', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg' },
    ];

    // State to hold selected cryptocurrencies
    const [selectedCryptos, setSelectedCryptos] = useState<string[]>(['bitcoin', 'ethereum', 'solana']);

    // Handle changes in the dropdown menu
    const handleCryptoChange = (index: number, cryptoId: string) => {
        const newSelectedCryptos = [...selectedCryptos];
        newSelectedCryptos[index] = cryptoId;
        setSelectedCryptos(newSelectedCryptos);
    };

    return (
        <Grid container spacing={3}>
            {selectedCryptos.map((cryptoId, index) => {
                // Find the selected cryptocurrency from the options
                const crypto = cryptoOptions.find(option => option.id === cryptoId);
                return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <CryptoCard
                            name={crypto?.name || ''}
                            rank={crypto?.rank || 0}
                            priceUsd={crypto?.priceUsd || '0'}
                            changePercent24Hr={crypto?.changePercent24Hr || '0'}
                            logo={crypto?.logo || ''}
                        />
                        <FormControl fullWidth style={{ marginTop: '10px' }}>
                            <InputLabel id={`crypto-select-${index}`}>Select Crypto</InputLabel>
                            <Select
                                labelId={`crypto-select-${index}`}
                                value={cryptoId}
                                onChange={(e) => handleCryptoChange(index, e.target.value)}
                            >
                                {cryptoOptions.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default MainComponent;
