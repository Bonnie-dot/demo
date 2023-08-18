import React from "react";
import {Button} from "@mui/material";
import Pdf from '../../../public/n.pdf';

const DownloadFile = () => {
    return <div>
        <Button variant="contained" style={{marginRight: 20}}>
            {/* if a tag have no download attribute, it will open a window to show pdf. Otherwise, it will show download pdf*/}
            <a href={Pdf} download rel="noopener noreferrer">Download file by a tag</a>
        </Button>
        <Button variant="contained">Download File</Button>
        <Button variant="contained">Update File</Button>
    </div>
}
export default DownloadFile;
