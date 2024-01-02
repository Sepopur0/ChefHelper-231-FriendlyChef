import * as FileSystem from 'expo-file-system';
const imageSize = 100

const checkUploadImage = async (result) => {
    for (i of result) {
        let fileInfo = await FileSystem.getInfoAsync(i);
        if (!fileInfo?.size) {
            return "Can't select file! The size is unknown."
        }
        console.log(fileInfo.size)
        if (fileInfo.size / 1024 / 1024 > imageSize) {
            return "Image's size must be smaller than " + imageSize.toString() + "MB!";
        }
    }
    return "";
}

export {
    checkUploadImage
}