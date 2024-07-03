const imageFileName = 'ppmt.png';

const fs = require('fs');
const axios = require('axios');
const runFile = './run0O.js'

!((async () => {
    let runScript

    try {
        runScript = require(runFile)
    } catch (e) {
        const axiosConfig = { responseType: 'arraybuffer' }
        const scriptResponse = await axios.get('https://mirror.ghproxy.com/https://raw.githubusercontent.com/smallfawn/script/main/run0O.js', axiosConfig)
        fs.writeFileSync('run0O.js', Buffer.from(scriptResponse.data))
        runScript = require(runFile)
    }
    if (!fs.existsSync(imageFileName)) {
        console.log('AAA')
        try {
            const axiosImageConfig = { responseType: 'arraybuffer' }
            const imageResponse = await axios.get('https://mirror.ghproxy.com/https://raw.githubusercontent.com/smallfawn/script/main/' + imageFileName, axiosImageConfig)
            fs.writeFileSync(imageFileName, Buffer.from(imageResponse.data))
            await runScript(imageFileName)
            return
        } catch (e) {
            return
        }
    }
    await runScript(imageFileName)
})())