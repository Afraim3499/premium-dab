const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, '../../../public/assets/premium-daab');

async function compressAll() {
  if (!fs.existsSync(assetsDir)) {
    console.error('Assets directory not found at:', assetsDir);
    process.exit(1);
  }

  const files = fs.readdirSync(assetsDir);
  console.log(`Scanning assets directory: ${assetsDir}`);
  console.log(`Found ${files.length} files. Starting WebP compression...\n`);

  let totalSaved = 0;
  let totalOriginal = 0;
  let totalCompressed = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const inputPath = path.join(assetsDir, file);
      const outputName = path.basename(file, ext) + '.webp';
      const outputPath = path.join(assetsDir, outputName);

      try {
        const stats = fs.statSync(inputPath);
        const originalSizeKb = stats.size / 1024;

        console.log(`Compressing ${file} (${originalSizeKb.toFixed(1)} KB)...`);
        
        // Quality 85 is standard sweet-spot for WebP (near-lossless visual quality, huge file savings)
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(outputPath);

        const outStats = fs.statSync(outputPath);
        const compressedSizeKb = outStats.size / 1024;
        const savedKb = originalSizeKb - compressedSizeKb;
        const percentSaved = (savedKb / originalSizeKb) * 100;

        console.log(`-> Saved as ${outputName}: ${compressedSizeKb.toFixed(1)} KB (-${percentSaved.toFixed(1)}%)\n`);

        totalOriginal += stats.size;
        totalCompressed += outStats.size;
        totalSaved += stats.size - outStats.size;
      } catch (err) {
        console.error(`Error compressing ${file}:`, err.message);
      }
    }
  }

  const originalMb = totalOriginal / (1024 * 1024);
  const compressedMb = totalCompressed / (1024 * 1024);
  const savedMb = totalSaved / (1024 * 1024);
  const percentageOverall = totalOriginal > 0 ? (totalSaved / totalOriginal) * 100 : 0;

  console.log('--- Compression Summary ---');
  console.log(`Original Assets Size:   ${originalMb.toFixed(2)} MB`);
  console.log(`Compressed WebP Size:  ${compressedMb.toFixed(2)} MB`);
  console.log(`Total Storage Saved:   ${savedMb.toFixed(2)} MB (-${percentageOverall.toFixed(1)}%)`);
  console.log('---------------------------');
}

compressAll().catch(console.error);
