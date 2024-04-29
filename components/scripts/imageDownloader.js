require ('./WeatherDescriptions.js')
const fs = require('fs')

for (let code in descriptions){
    for (let time in descriptions[code]){
        let image = descriptions[code][time]["image"]
        fetch(image)
        .then(res => {
            return res.blob()
        })
        .then(blob => { return blob.arrayBuffer()})
        .then( blob => {
            console.log("image downloaded: ", image)
            let isday = (time == 'day' ? 'day':'night')
            let filename = '.\\assets\\weatherIcons\\'+ code + isday + '.png'
            //console.log(filename)

            fs.writeFile(filename, Buffer.from( blob ), (err) => {
                if(err) throw err
                console.log('The file has been saved! ' + filename)
            }) 
        })
    }
}
