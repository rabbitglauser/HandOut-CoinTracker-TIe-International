import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CryptoCardProps {
    name: string;
    rank: number;
    priceUsd: string;
    changePercent24Hr: string;
    logo: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ name, rank, priceUsd, changePercent24Hr, logo }) => {
    return (
        <Card>
            <CardContent>
                <img src={logo} alt={name} style={{ width: '50px', height: '50px' }} />
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body1">Rank: {rank}</Typography>
                <Typography variant="body1">Price: ${priceUsd}</Typography>
                <Typography variant="body1">Change (24h): {changePercent24Hr}%</Typography>
            </CardContent>
        </Card>
    );
};

export default CryptoCard;
