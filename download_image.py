import requests
import os

def download_image():
    # Create images directory if it doesn't exist
    if not os.path.exists('images'):
        os.makedirs('images')
    
    # URL of the image (using a different hosting service)
    url = 'https://raw.githubusercontent.com/akashdeepsingh/sustaina/main/images/sustaina-dashboard.png'
    
    try:
        # Download the image
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        # Save the image
        with open('images/sustaina-dashboard.png', 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        print("Image downloaded successfully!")
    except Exception as e:
        print(f"Error downloading image: {e}")

if __name__ == "__main__":
    download_image() 