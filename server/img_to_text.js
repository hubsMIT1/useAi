// const vision = require('@google-cloud/vision')

// const CREDENTIALS = JSON.parse(JSON.stringify({
//     "type": "service_account",
//     "project_id": "presi111",
//     "private_key_id": "cd6f63647e0145fd8b32ad41846d09a01b2f770a",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnuWIEr4nsi8MK\nMsTHlflyml3YG4qUCi3v89pZ+aETL1OdImgJkO4iQkUCJaTccF2anefCxMqL0xtJ\nXH0E0Z8W8DjuJ1oBSQhX6VZGrOendKu0iZrzKadZiRPE7HbTA0DsV/3QpOJAeAAi\nW0LyVZbXullaiKDRM4yipbSIXqu6Euri8WyEqwZbYQRsc+qQRFdMD/EqksREBZFi\nmOZr9cipKRhJfipzv9iJBgL6k/DQvCbzU3gtdfQcHh3S8OLsRj0Z9r3BUSS9DIei\netqe3HpkFUOEVZpoRnbqxABduToCWewPOSbAx3Zk3RrqtCB58LpneSSLWCub1DyI\n5pFn7lkFAgMBAAECggEAB8L/ow7f4kdPeykr9mky1i0IRb10ishJJZm9KOfGnqV/\nMujfiVMgf2EIt4I4IGQUzi3GMWW7p9UuUJVL9c1LlZtVTx7EFAYmBtzLUNGklhkY\nmcNlHSFNgh+3/1IgEkDMIC6BlkZjGq+oS0QPk45cFiykq5i3XycJuDx/NRuzH7+4\nGSX64TFHyj2G27IKLjJpgL4cyH0Pe7si8J5Wbuny9+aK41OrPfO0GNYVDWhhilay\n7kcB5THdkfpvOoSgmoqC70WIRYCO0i1oy0BzzoqzdFcGasMbGEKc++6R0px+IOYa\nnh9Tj/NN1MNKmPsGTMLVSP0MeYHg/rQAQxSPOFCpawKBgQDkUkFuPIYd1bIx1tro\naek6klLlXo+/iF6vBqNiP19nnZi/Bm7Tr4GgWyWD8u9Y4RaqPbGIBg9ckqo0SIK1\nwjn47EkvK0kC0YFB2aHc2iysqh3EvLlfdkjkw+/0hgpFS41D6ms/fn/RlChHqAXz\ncDRUnkOr6GHF9aMy5EHDd5iz3wKBgQC8Doyt+s/BL4Qoyji4v/WXyBQOWUxjBaBw\nyvZXiuH956HzrAvmhRTIyI5q178En3q5nOt8hiDgHTmuLT2IPfHcvSJ9GKfkdtQU\nBo7uWZk5cY8oTlqkXrh2ChxHgTixJ0UCYvZrHID578XU2vkUbDA7UJ2ivPV7gRuk\njk3r9PyvmwKBgBq8LwEzgRjZPwZq/DMew7qiC6bkDb0FwOCJzHPiq888OviTTkLn\nWCxov9nVhoVHxhmlI7ajzwSt/9QjcXrLBXLKaD9nuCLmWVZWn4d23KhTOy0gVCyD\nc0GmV+CwGV/H2wDK4EgNDfaCfLz3RcsdpmMKLS5iBaDihHufErxKsszNAoGBAKiB\nFPbzrOJ6VB5EjKymfEZDZg0xYKu9p/RJOJBahoL+4XO4rnUgu+3pHwuHQ8a9q7bT\nb4IFoUGPjlaOfPsuHiDfbB7RT+b7vq4u7jWOHSiGo3LHOprbsMc76fj8RbMe78vi\nptB1GvBZM1e12ce95T3Qz165l/DRT9aUGCgcPaqPAoGAIbd/jLX/kzbSLYqsiWmG\nPieDwxSEbJZkc359uvMAv8DRsotg8L4k0v4+l0ZmdnhFhEveCqDPxauOnvOYSHM1\nfsYaWzMGyczI3v3/6GFwK2ZTYyHPyKoejt2AKkLAzwFwzWPRK/2qV3BLrn4FJ/1W\nKlKg8cNW7k5TbFRTbn4dopA=\n-----END PRIVATE KEY-----\n",
//     "client_email": "imgtotext@presi111.iam.gserviceaccount.com",
//     "client_id": "100818884039840788385",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/imgtotext%40presi111.iam.gserviceaccount.com"
//   }
//   ))

// const config = {
//     credentials: {
//         private_key: CREDENTIALS.private_key,
//         client_email: CREDENTIALS.client_email,
//     }
// };

// const client = new vision.ImageAnnotatorClient(config);

// const detectText = async(file_path) => {
//     let [result] =await client.textDetection(file_path);
//     console.log(result)
// }
// detectText('text1.png');

const express = require('express');
const multer = require('multer');
const { createReadStream } = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { ImageAnnotatorClient } = require('@google-cloud/vision');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const client = new ImageAnnotatorClient();

app.post('/api/upload', upload.single('image'), async (req, res) => {
  const imageBuffer = req.file.buffer;
  const image = await loadImage(imageBuffer);
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  const { data } = await client.textDetection(canvas.toBuffer());
  const text = data.responses[0].fullTextAnnotation.text;
  res.json({ text });
});

app.listen(3001, () => console.log('Server listening on port 3001'));
