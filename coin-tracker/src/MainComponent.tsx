// src/MainComponent.tsx
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CryptoCard from './components/CryptoCard'; 

const MainComponent: React.FC = () => {
    const cryptoOptions = [
        { id: 'bitcoin', name: 'Bitcoin', priceUsd: '45000', rank: 1, changePercent24Hr: '2.5', logo: 'path_to_bitcoin_logo' },
        { id: 'ethereum', name: 'Ethereum', priceUsd: '3000', rank: 2, changePercent24Hr: '1.5', logo: 'path_to_ethereum_logo' },
        { id: 'solana', name: 'Solana', priceUsd: '150', rank: 3, changePercent24Hr: '3.0', logo: 'path_to_solana_logo' },
        { id: 'cardano', name: 'Cardano', priceUsd: '1.20', rank: 4, changePercent24Hr: '2.0', logo: 'path_to_cardano_logo' },
    ];

    const [selectedCryptos, setSelectedCryptos] = useState<string[]>(['bitcoin', 'ethereum', 'solana']);

    const handleCryptoChange = (index: number, cryptoId: string) => {
        const newSelectedCryptos = [...selectedCryptos];
        newSelectedCryptos[index] = cryptoId;
        setSelectedCryptos(newSelectedCryptos);
    };

    return (
        <div>
            {selectedCryptos.map((cryptoId, index) => {
                const crypto = cryptoOptions.find(option => option.id === cryptoId);
                return (
                    <div key={index}>
                        <CryptoCard
                            name={crypto?.name || ''}
                            rank={crypto?.rank || 0}
                            priceUsd={crypto?.priceUsd || '0'}
                            changePercent24Hr={crypto?.changePercent24Hr || '0'}
                            logo={crypto?.logo || ''}
                        />
                        <FormControl fullWidth>
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
                    </div>
                );
            })}
        </div>
    );
};

export default MainComponent;
