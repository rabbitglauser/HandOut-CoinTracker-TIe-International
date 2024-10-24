import React from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface CryptoCardProps {
    name: string;
    rank: number;
    priceUsd: string;
    changePercent24Hr: string;
    logo: string;
    selectedCryptoId: string; // Currently selected crypto ID for this card
    onCryptoChange: (newCryptoId: string) => void; // Function to handle dropdown changes
}

const CryptoCard: React.FC<CryptoCardProps> = ({ name, rank, priceUsd, changePercent24Hr, logo, selectedCryptoId, onCryptoChange }) => {
    return (
        <Card style={{ borderRadius: '15px', textAlign: "center", margin: '10px' }}>
            <CardContent>
                <img src={logo} alt={name} style={{ width: '50px', height: '50px' }} />
                <Typography variant="h5"><strong>{name}</strong></Typography>
                <Typography variant="body1"><strong>Rank:</strong> {rank}</Typography>
                <Typography variant="body1"><strong>Price:</strong> ${priceUsd}</Typography>
                <Typography variant="body1"><strong>Change (24h):</strong>
                    <span style={{ color: 'red' }}>{changePercent24Hr}%</span>
                </Typography>
                <p><span style={{ fontSize: '12px' }}>24-hour period</span></p>

                {/* Dropdown for selecting crypto */}
                <FormControl fullWidth>
                    <InputLabel id={`crypto-select-${name}`}>Select Crypto</InputLabel>
                    <Select
                        labelId={`crypto-select-${name}`}
                        value={selectedCryptoId} // The current crypto selected
                        onChange={(e) => onCryptoChange(e.target.value as string)} // Trigger the onCryptoChange function
                    >
                        <MenuItem value="bitcoin">Bitcoin</MenuItem>
                        <MenuItem value="ethereum">Ethereum</MenuItem>
                        <MenuItem value="tether">Tether</MenuItem>
                        <MenuItem value="solana">Solana</MenuItem>
                        <MenuItem value="cardano">Cardano</MenuItem>
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
};

export default CryptoCard;
