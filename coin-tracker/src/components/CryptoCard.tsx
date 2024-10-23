import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

/**
 * Represents the properties of a cryptocurrency card.
 * @interface CryptoCardProps
 * @property {string} name - The name of the cryptocurrency.
 * @property {number} rank - The rank of the cryptocurrency.
 * @property {string} priceUsd - The price of the cryptocurrency in USD.
 * @property {string} changePercent24Hr - The percentage change in the last 24 hours.
 * @property {string} logo - The URL to the logo of the cryptocurrency.
 */
interface CryptoCardProps {
    name: string;
    rank: number;
    priceUsd: string;
    changePercent24Hr: string;
    logo: string;
}

/**
 * React functional component for displaying cryptocurrency information in a styled card format.
 * @param {CryptoCardProps} props - The props containing cryptocurrency data to be displayed.
 * @returns {ReactNode} A styled card component displaying the cryptocurrency name, rank, price, and 24-hour change percentage.
 */
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
