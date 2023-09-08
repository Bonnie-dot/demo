import React, { useState } from 'react'
import { Button, ButtonGroup, Snackbar } from '@mui/material'
import PDF from '../../../public/n.pdf'
import { fetchUtil } from '../../utils/fetchUtil'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import style from './file.module.scss'

const OperateFile = () => {
    const [isShow, setShow] = useState(false)
    const onDownloadFile = async (response: Response): Promise<void> => {
        const array = response.headers.get('content-disposition').split('=')
        const fileName = String(array[array.length - 1]).replace(/"/g, '')
        const blobData = await response.blob()
        const blob = new Blob([blobData])
        const downloadLink = document.createElement('a')
        const href = URL.createObjectURL(blob)
        downloadLink.href = href
        downloadLink.download = fileName
        downloadLink.click()
        URL.revokeObjectURL(href)
    }
    const download = () => {
        fetchUtil('/download')
            .then(async (response) => {
                await onDownloadFile(response)
            })
            .catch(() => {
                setShow(true)
            })
    }

    const upload = async (uploadFile: File) => {
        const formData = new FormData()
        formData.append('file', uploadFile)
        try {
            await fetchUtil('/upload', {
                method: 'post',
                body: formData,
            })
        } catch (e) {
            setShow(true)
        }
    }
    return (
        <div>
            <h2>File Upload And Download</h2>
            <ButtonGroup variant="outlined" aria-label="download file">
                <Button variant="outlined">
                    {/* if a tag have no download attribute, it will open a window to show pdf. Otherwise, it will show download pdf*/}
                    <a href={PDF} download rel="noopener noreferrer">
                        Download file by a tag
                    </a>
                </Button>
                <Button variant="outlined" onClick={download}>
                    Download File
                </Button>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    href="#file-upload"
                >
                    Upload a file
                    <input
                        type="file"
                        className={style.uploadFile}
                        onChange={(e) => upload(e.target.files[0])}
                    />
                </Button>
            </ButtonGroup>
            <Snackbar
                open={isShow}
                autoHideDuration={6000}
                onClose={() => setShow(false)}
                message="failed"
            />
        </div>
    )
}
export default OperateFile
