import React from 'react';
import { Box, List, Typography } from '@mui/material';
import ContentItem from './contentItem';

export default function ContentList({ title, content, contentType }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{title}</Typography>
            <List>
                {content && content.items.map((item) =>
                    // < ContentItem item={item} secondaryText={item.tracks ? `${item.tracks.total} tracks` : `Popularity: ${item.popularity}`} />
                    < ContentItem item={item} secondaryText={item.external_urls.spotify} />
                )}
            </List>
        </Box>
    )
}