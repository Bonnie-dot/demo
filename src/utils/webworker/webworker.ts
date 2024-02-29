import { fetchUtil } from '../fetchUtil/fetchUtil'

const MAX_SIZE = 1024
let uploadedImagesResult: { image: File; status: string }[] = []
onmessage = (event) => {
    handleUploadImages(event.data)
}
const handleUploadImages = async (files: FileList) => {
    let totalSize = 0
    let uploadingFiles = []
    for (let i = 0; i < files.length; i++) {
        if (totalSize + files[i].size > MAX_SIZE) {
            await uploadImages(totalSize === 0 ? [files[i]] : uploadingFiles)
            uploadingFiles = []
            totalSize = 0
        } else {
            uploadingFiles.push(files[i])
            totalSize += files[i].size
        }
        if (i === files.length - 1) {
            uploadingFiles.length > 0 && (await uploadImages(uploadingFiles))
            postMessage(uploadedImagesResult)
        }
    }
}
const uploadImages = (images: Array<File>): Promise<void> => {
    const formData = new FormData()
    images.map((image) => formData.append('images', image))
    return fetchUtil('/upload-images', {
        method: 'POST',
        body: formData,
        headers: {
            responseType: 'json',
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`)
            }
            return res.json()
        })
        .then(() => {
            uploadedImagesResult = uploadedImagesResult.concat(
                images.map((image) => ({ image, status: 'success' }))
            )
        })
        .catch((error) => {
            console.error('There was an error!', error)
            uploadedImagesResult.concat(
                images.map((image) => ({ image, status: 'fail' }))
            )
        })
}
export {}
