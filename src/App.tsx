import React from 'react'
import {Box, List, ListItem, ListItemButton} from "@mui/material";
import {NavLink} from "react-router-dom";

const links: Array<{ name: string; url: string }> = [
    {
        name: 'Demo',
        url: '/demo'
    }, {
        name: 'Download File',
        url: '/download-file'
    },
]

const App = () => {
    return <Box sx={{width: '100%'}}>
        <nav aria-label="secondary mailbox folders">
            <List>
                {
                    links.map(({name, url}) =>
                        <ListItem>
                            <ListItemButton>
                                <NavLink to={url}>{name}</NavLink>
                            </ListItemButton>
                        </ListItem>
                    )
                }
            </List>
        </nav>
    </Box>
}
export default App;
