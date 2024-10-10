import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface CryptoCardProps {
    name: string;
    rank: number;
    priceUsd: string;
    changePercent24Hr: string;
    logo: string;
}

export default function CryptoCard({
                                       name,
                                       rank,
                                       priceUsd,
                                       changePercent24Hr,
                                       logo,
                                   }: CryptoCardProps) {
    return (
        <Card>
            <CardMedia
                component="img"
                alt={`${name} logo`}
                height="140"
                image={logo}
            />
            <CardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body2">Rank: {rank}</Typography>
                <Typography variant="body2">Price: ${Number(priceUsd).toFixed(7)}</Typography>
                <Typography variant="body2">24h Change: {Number(changePercent24Hr).toFixed(2)}%</Typography>
            </CardContent>
        </Card>
    );
}
