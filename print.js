const fs = require('fs');
const path = require('path');

const srcFolder = 'src';
const allowedExtensions = ['.ts', '.html'];

function processDirectory(directory) {
  const entries = fs.readdirSync(directory);

  entries.forEach((entry) => {
    const fullPath = path.join(directory, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      processDirectory(fullPath);
    } else if (stats.isFile()) {
      const ext = path.extname(entry);

      // Proceed only if the file has an allowed extension
      if (allowedExtensions.includes(ext)) {
        // Exclude .spec.ts files
        if (ext === '.ts' && entry.endsWith('.spec.ts')) {
          return;
        }

        const data = fs.readFileSync(fullPath, 'utf8');
        console.log('\n');
        console.log(`"file: ${fullPath}":`);
        console.log('```');
        console.log(data);
        console.log('```');
        console.log(',');
      }
    }
  });
}

try {
  processDirectory(srcFolder);
} catch (err) {
  console.error(`Error reading files: ${err}`);
}
