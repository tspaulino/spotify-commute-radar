import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export default function ContentItem({ item, secondaryText }) {
    return (
        <ListItem sx={{ boxShadow: 5, marginY: 3 }}>
            <ListItemAvatar>
                <Avatar
                    src={item.images[0]?.url}
                    alt="avatar image"
                    sx={{ m: 2 }}
                />
            </ListItemAvatar>
            <ListItemText
                primary={item.name}
                secondary={secondaryText}
            />
        </ListItem>
    )
}
