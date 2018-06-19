const path = require('path');
const fs = require('fs');
const execFile = require('child_process').execFile;

const inputDir = path.resolve('./templates/pages');
const partsDir = path.resolve('./templates/parts');
const outputDir = path.resolve('./');

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

execFile('find', [partsDir], (err, stdout, stderr) => {
  const fileList = stdout.split('\n');

  const parts = {};

  fileList
    .filter(file => file)
    .filter(file => file.substr(-5) === '.html')
    .forEach((file) => {
      const bits = file.split('/');
      const name = bits[bits.length - 1].replace('.html', '');

      parts[name] = fs.readFileSync(`${partsDir}/${name}.html`);
    });


  execFile('find', [inputDir], (err, stdout, stderr) => {
    const fileList = stdout.split('\n');

    const inputs = fileList
      .filter(file => file)
      .filter(file => file.substr(-5) === '.html');

    inputs.forEach((input) => {
      let className = input.replace(inputDir, '')
        .split('/')
        .filter(bit => bit)
        .map(bit => bit.replace('.html', ''))
        .reduce((prev, current, index, all) => {
          switch (index) {
            case 0:
              return all.length === 1 ? 'home' : `${current}-page`;
            default:
              return `${prev} ${all[0]}-page-${current}`;
          }
        }, '');

      if (input.replace(inputDir, '') === '/about/our-story.html') {
        className = `${className} timeline-page`;
      }
      parts.className = className;

      const output = input.replace(inputDir, outputDir);

      let text = fs.readFileSync(input, 'utf-8');
      Object.keys(parts).forEach((partName) => {
        text = text.replace(new RegExp(`{{${partName}}}`), parts[partName]);
      });

      ensureDirectoryExistence(output);
      fs.writeFileSync(output, text);
    });
  });
});
