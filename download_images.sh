#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p images

# Download Sustaina app dashboard image
echo "Downloading Sustaina app dashboard image..."
curl -L "https://i.imgur.com/JKgQPCh.png" -o "images/sustaina-dashboard.png"

echo "Download complete!" 