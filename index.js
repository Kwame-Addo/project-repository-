const { createWorker } = require('tesseract.js');

const recognizeText = async (imagePath, languages) => {
  const worker = createWorker({
    logger: (m) => console.log(m), // Optional logger function for Tesseract.js messages
  });

  try {
    await worker.load();
    await worker.loadLanguage(languages);
    await worker.initialize(languages);

    const { data: { text } } = await worker.recognize(imagePath);
    return text;
  } catch (error) {
    console.error(error);
    throw new Error('OCR recognition failed');
  } finally {
    await worker.terminate();
  }
};

// Example usage
const imagePath = 'path/to/your/image.jpg';
const languages = 'eng';

recognizeText(imagePath, languages)
  .then((result) => {
    console.log('Recognition Result:', result);
  })
  .catch((error) => {
    console.error('Recognition Error:', error);
  });
