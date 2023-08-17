import React from 'react'
import {Box, List, ListItem, ListItemButton} from "@mui/material";
import {NavLink} from "react-router-dom";

const App = () => {
    return <Box sx={{ width: '100%'}}>
        <nav aria-label="secondary mailbox folders">
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <NavLink to='/demo'>Your Name</NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <NavLink to='/download-file'>Your Name</NavLink>
                </ListItem>
            </List>
        </nav>
    </Box>
}
export default App;
