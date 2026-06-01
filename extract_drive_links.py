import os
import sys

try:
    from googleapiclient.discovery import build
except ImportError:
    print("Please install the required library by running:")
    print("pip install google-api-python-client")
    sys.exit(1)

# ---------------------------------------------------------
# CONFIGURATION
# ---------------------------------------------------------
# You need a Google API key with the "Google Drive API" enabled.
# You can get one from the Google Cloud Console: https://console.cloud.google.com/
API_KEY = os.environ.get('DRIVE_API_KEY', '')

# The ID of the folder from your link:
# https://drive.google.com/drive/folders/1WWdazGXU3ILghZA0Ti3tnmVYcKBxzG4C
FOLDER_ID = '1WWdazGXU3ILghZA0Ti3tnmVYcKBxzG4C'
# ---------------------------------------------------------

def extract_links():
    if not API_KEY:
        print("❌ Error: DRIVE_API_KEY environment variable is not set.")
        print("Please run: export DRIVE_API_KEY=\"your_api_key_here\"")
        print("Or set it in your environment before running the script.")
        return

    # Build the Drive API client
    drive_service = build('drive', 'v3', developerKey=API_KEY)

    print(f"Fetching files from folder ID: {FOLDER_ID}...")
    
    try:
        # Query files that are children of the specified folder ID
        query = f"'{FOLDER_ID}' in parents and trashed = false"
        
        # We request 'name' (filename) and 'webContentLink' (direct download link)
        results = drive_service.files().list(
            q=query,
            fields="files(id, name, webViewLink, webContentLink)",
            pageSize=1000
        ).execute()

        items = results.get('files', [])

        if not items:
            print('No files found in the folder.')
            return

        print(f"Found {len(items)} files. Writing to 'links_output.txt'...")
        
        # Write the results to a text file
        with open('links_output.txt', 'w', encoding='utf-8') as f:
            for item in items:
                name = item.get('name', 'Unknown')
                # webContentLink is the direct download link. Fallback to webViewLink (view page) if not available
                download_link = item.get('webContentLink', item.get('webViewLink', 'No link available'))
                
                f.write(f"Candidate/File Name: {name}\n")
                f.write(f"Download Link: {download_link}\n")
                f.write("-" * 50 + "\n")
                
                print(f"Extracted: {name}")
                
        print("\n✅ Successfully extracted all links to links_output.txt")
        
    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == '__main__':
    extract_links()
