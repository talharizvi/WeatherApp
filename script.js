const fs = require('fs');

const pngImg = () => {
  const pngarray = fs.readdirSync('app/res/images').filter(file => {
    return file.endsWith('.png');
  });
  return Array.from(new Set(pngarray));
};
const jpgImg = () => {
  const jpgarray = fs.readdirSync('app/res/images').filter(file => {
    return file.endsWith('.jpg');
  });
  return Array.from(new Set(jpgarray));
};
const jpegImg = () => {
  const jpegarray = fs.readdirSync('app/res/images').filter(file => {
    return file.endsWith('.jpeg');
  });
  return Array.from(new Set(jpegarray));
};

const generate = () => {
  let pngArray = pngImg()
    .map(name => {
      var shortname = name.split('.');
      var testname = shortname[0];
      return `\t${testname}: require('./images/${testname}.png')`;
    })
    .join(',\n');

  let jpgArray = jpgImg()
    .map(name => {
      var shortname = name.split('.');
      var testname = shortname[0];
      return `\t${testname}: require('./images/${testname}.jpg')`;
    })
    .join(',\n');

  let jpegArray = jpegImg()
    .map(name => {
      var shortname = name.split('.');
      var testname = shortname[0];
      return `\t${testname}: require('./images/${testname}.jpeg')`;
    })
    .join(',\n');

  const string = `const images={\n${pngArray},\n${jpgArray},\n${jpegArray}\n}\nexport default images;`;
  fs.writeFileSync('app/res/images.js', string, 'utf8');
};

generate();
console.log('All images imported successfully.');