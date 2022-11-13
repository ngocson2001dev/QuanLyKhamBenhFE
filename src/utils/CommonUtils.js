class CommonUtils {

    static getImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }
    static getBase64toImage(image) {
        return new Buffer(image, 'base64').toString('binary');
    }
}

export default CommonUtils;