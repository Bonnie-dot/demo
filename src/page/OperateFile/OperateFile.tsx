import React, {useState} from "react";
import {Button} from "@mui/material";
import PDF from '../../../public/n.pdf';
import {fetchUtil} from "../../utils/fetchUtil";

const OperateFile = () => {
    const [uploadFile, setUploadFile] = useState<File>();
    const downloadFile = async (response: Response): Promise<void> => {
        const array = response.headers.get("content-disposition").split("=");
        const fileName = String(array[array.length - 1]).replace(/"/g, "");
        const blobData = await response.blob();
        //它通常用于存储和处理各种类型的二进制数据，例如图像、音频、视频、文件等,主要用于文件的上传和下载
        const blob = new Blob([blobData]);
        const downloadLink = document.createElement('a');
        let href = URL.createObjectURL(blob);
        downloadLink.href = href;
        downloadLink.download = fileName; // 指定文件名和扩展名
        downloadLink.click();
        URL.revokeObjectURL(href);
    }
    const download = () => {
        fetchUtil('/download').then(async (response) => {
            await downloadFile(response);
        }).catch(() => {
            alert("下载失败");
        })
    }

    const upload = async () => {
        const formData = new FormData();
        formData.append('file', uploadFile);
        try {
            await fetchUtil('/upload', {
                method: 'post',
                body: formData
            });
            alert("上传成功")
        } catch (e) {
            alert("上传失败")
        }
    }
    return <div>
        <Button variant="contained" style={{marginRight: 20}}>
            {/* if a tag have no download attribute, it will open a window to show pdf. Otherwise, it will show download pdf*/}
            <a href={PDF} download rel="noopener noreferrer">Download file by a tag</a>
        </Button>
        <Button variant="contained" onClick={download} style={{marginRight: 20}}>Download File</Button>
        <div>
            <input type="file" name="file" onChange={(e) => (setUploadFile(e.target.files[0]))
            }/>
                <Button variant="contained" onClick={upload}>Update File</Button>
        </div>
    </div>
}
export default OperateFile;
