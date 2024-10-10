import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CryptoCardProps {
    name: string;
    rank: number;
    priceUsd: string;
    changePercent24Hr: string;
    logo: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({name, rank, priceUsd, changePercent24Hr, logo}) => {
    return (
        <Card style={{borderRadius: '15px', textAlign: "center"}}>
            <CardContent>
                <img src={logo} alt={name} style={{width: '50px', height: '50px'}}/>
                <Typography variant="h5"><strong>{name}</strong></Typography>
                <Typography variant="body1"><strong>Rank:</strong> {rank}</Typography>
                <Typography variant="body1"><strong>Price:</strong> ${priceUsd}</Typography>
                <Typography variant="body1"><strong>Change (24h):</strong><span
                    style={{color: 'red'}}>{changePercent24Hr}%</span></Typography>
                <p><span style={{fontSize: '12px'}}>24-hour period</span></p>
            </CardContent>
        </Card>
    );
};

export default CryptoCard;
