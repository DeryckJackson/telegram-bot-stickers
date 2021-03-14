const sharp = require('sharp');

const resizeHeight = (input) => {
  sharp(input)
    .resize({ height: 512 })
    .toFile('output.png', (err) => {
      console.log(err);
    });
}

const resizeWidth = (input) => {
  sharp(input)
    .resize({ width: 512 })
    .toFile('output.png', (err) => {
      console.log(err);
    });
}
