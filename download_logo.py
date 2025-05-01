import requests
import os

def download_logo():
    # Create images directory if it doesn't exist
    if not os.path.exists('images'):
        os.makedirs('images')
    
    # URL of the logo (using a different hosting service)
    url = 'https://raw.githubusercontent.com/akashdeepsingh/sustaina/main/images/logo.png'
    
    try:
        # Download the image
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        # Save the image
        with open('images/logo.png', 'wb') as f:
            f.write(response.content)
        print("Logo downloaded successfully!")
    except Exception as e:
        print(f"Error downloading logo: {e}")

if __name__ == "__main__":
    download_logo() 