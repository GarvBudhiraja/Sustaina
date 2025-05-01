import requests
import os
from urllib.parse import urlparse

def download_image(url, filename):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"Successfully downloaded: {filename}")
        return True
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
        return False

def create_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Created directory: {directory}")

def main():
    # Create images directory
    images_dir = 'images'
    create_directory(images_dir)
    
    # Dictionary of images to download with their local filenames
    images = {
        # Logo
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/leaf.svg': 'images/logo.svg',
        
        # Team member images
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2': 'images/team-sarah.jpg',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a': 'images/team-michael.jpg',
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e': 'images/team-emma.jpg',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7': 'images/team-david.jpg',
        
        # About section images
        'https://images.unsplash.com/photo-1497366216548-37526070297c': 'images/about-hero.jpg',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2': 'images/mission.jpg',
        
        # Favicon images
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/leaf.svg': 'images/favicon-16x16.png',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/leaf.svg': 'images/favicon-32x32.png',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/leaf.svg': 'images/favicon-96x96.png',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/leaf.svg': 'images/favicon-144.png',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/leaf.svg': 'images/favicon-152.png',
    }
    
    # Download each image
    for url, filename in images.items():
        download_image(url, filename)

if __name__ == "__main__":
    main() 