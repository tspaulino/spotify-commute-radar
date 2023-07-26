import React from 'react';
import { Box } from '@mui/material';
import AppContext from '../context/appContext';
import PersonDetails from './personDetails';
import ContentList from './containers/contentList'



export default function User({ user, playlists, artists, releases }) {
    return (
        <AppContext.Consumer>
            {() =>
                <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, p: 2 }}>
                    <PersonDetails name={user.display_name} avatarImage={user.images[0]?.url} />
                    <Box sx={{ display: 'flex', flexDirection: 'line', marginY: 1 }}>
                        <ContentList title={`Latest Releases: ${releases.total}`} content={releases} />
                        <ContentList title={`Artists: ${artists.total}`} content={artists} />
                        <ContentList title={`Playlists: ${playlists.total}`} content={playlists} />
                    </Box>
                </Box>
            }
        </AppContext.Consumer>
    )
}