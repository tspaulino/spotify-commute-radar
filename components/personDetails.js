import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';


export default function PersonDetails({ name, avatarImage }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', boxShadow: 5 }}>
            <Avatar
                src={avatarImage}
                alt="avatar image"
                sx={{ m: 2 }}
            />
            <Box sx={{ m: 1 }}>
                <Typography>{name}</Typography>
            </Box>
        </Box>
    )
}