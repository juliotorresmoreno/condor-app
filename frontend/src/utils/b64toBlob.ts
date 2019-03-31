

/**
 * 
 * @param b64Data 
 */
function b64toBlob(b64Data: string | HTMLImageElement): Blob {
    const match = /image\/[^;]+/.exec(b64Data.toString());
    if (!match || match.length === 0) return new Blob();
    
    const contentType = match[0] || '';
    const sliceSize = 512;

    b64Data = b64Data.toString().replace(/^.*,/, '');

    const byteCharacters = atob(b64Data.toString());
    const byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

export default b64toBlob;