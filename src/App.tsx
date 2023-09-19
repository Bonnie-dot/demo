import React from 'react'
import { Box, List, ListItem, ListItemButton } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { router } from './router'

const App = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <nav aria-label="secondary mailbox folders">
                <List>
                    {router
                        .filter((item) => item.name !== 'Home')
                        .map(({ name, path }) => (
                            <ListItem>
                                <ListItemButton>
                                    <NavLink to={path}>{name}</NavLink>
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </nav>
        </Box>
    )
}
export default App
