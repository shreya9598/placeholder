const express = require("express")
const router = express.Router()
const { createCanvas, loadImage }  = require('canvas');
const axios = require('axios');


router.get("/generate-image", (req, res) => {
    generateImage(200, 200, "black", "false", res)
});

// router.get("/generate-image/:width/:height", (req, res) => {
//     const width = parseInt(req.params.width)
//     const height = parseInt(req.params.height)
//     const color = req.query.color

//     generateImage(width, height, color, "false", res)
// });

router.get("/generate-image/:width/:height", (req, res) => {
    const width = parseInt(req.params.width)
    const height = parseInt(req.params.height)
    const download = req.query.download
    const color = req.query.color
    const bgColor = req.query.bgColor


    generateImage(width, height, color, bgColor, download, res)
});

router.get("/resizeImage", async(req, res) =>{
    const imageUrl = req.query.url;
    const size = req.query.size
    const width = parseInt(size.split("x")[0])
    const height = parseInt(size.split("x")[1])

    if (!imageUrl) {
        return res.status(400).send('Image URL is required');
    }

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data);

        // Load the image using Canvas
        const img = await loadImage(imageBuffer);

        // Create a canvas with the desired width and height
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Draw the image onto the canvas with the desired width and height
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas to a buffer
        const resizedImageBuffer = canvas.toBuffer('image/jpeg');

        // Set the appropriate content type for the resized image
        res.set('Content-Type', 'image/jpeg');

        // Send the resized image buffer as the response
        res.send(resizedImageBuffer);
})


function generateImage(width, height, color, bgColor, download, res) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    //set bgCOlor
    ctx.fillStyle = bgColor
    ctx.fillRect(0,0,width,height)

    ctx.font = "10px Roboto"
    
    // Set color
    ctx.fillStyle = color;


    const text = `${width}x${height}`;
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;

    // Calculate the center coordinates
    const centerX = (canvas.width - textWidth) / 2;
    const centerY = canvas.height / 2;

    // Draw text
    ctx.fillText(width + "x" + height, centerX, centerY);

    const buffer = canvas.toBuffer('image/png');

    if (download == "true") {
        res.set('Content-Disposition', `attachment; filename=image_${width}x${height}.png`);
    }

    res.set('Content-Type', 'image/png');
    res.send(buffer);
}


module.exports = router