const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
    logo: 'https://i.imgur.com/8KgVB8B.png',
    bicycle: 'https://i.imgur.com/abc123.png',
    lock: 'https://i.imgur.com/def456.png',
    plant: 'https://i.imgur.com/ghi789.png',
    dashboard: 'https://i.imgur.com/JKgQPCh.png',
    habitTracking: 'https://i.imgur.com/tKg0DvZ.png',
    rewards: 'https://i.imgur.com/sFvQoQm.png',
    community: 'https://i.imgur.com/ZLkGdvY.png',
    ecoInsights: 'https://i.imgur.com/6MQhQpC.png',
    aiTracking: 'https://i.imgur.com/abc123.jpg',
    defaultProfile: 'https://i.imgur.com/8LWTHYs.jpg',
    user1: 'https://i.imgur.com/Gs8JgcP.jpg',
    user2: 'https://i.imgur.com/pJmxJ5t.jpg',
    user3: 'https://i.imgur.com/JQcXnZF.jpg',
    background: 'https://i.imgur.com/nWFJGiD.jpg'
};

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }

            const filePath = path.join('images', filename);
            const fileStream = fs.createWriteStream(filePath);
            
            response.pipe(fileStream);
            
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded: ${filename}`);
                resolve();
            });
            
            fileStream.on('error', (err) => {
                fs.unlink(filePath, () => {});
                reject(err);
            });
        }).on('error', reject);
    });
}

async function downloadAllImages() {
    try {
        for (const [key, url] of Object.entries(images)) {
            const extension = path.extname(url) || '.png';
            const filename = `${key}${extension}`;
            await downloadImage(url, filename);
        }
        console.log('All images downloaded successfully!');
    } catch (error) {
        console.error('Error downloading images:', error);
    }
}

downloadAllImages(); 