import json
import re
import time
import sys

try:
    import pywhatkit
except ImportError:
    print("Please install the required library by running:")
    print("pip install pywhatkit")
    sys.exit(1)

# ---------------------------------------------------------
# CONFIGURATION
# ---------------------------------------------------------
# WhatsApp requires numbers to have a country code. 
# Assuming India (+91) based on the 10-digit numbers in the database.
COUNTRY_CODE = "+91"
# ---------------------------------------------------------

def main():
    print("🚀 Loading post-test submission data...")
    json_path = "exports/submissions_post_backup.json"
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            submissions = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: Could not find {json_path}")
        sys.exit(1)

    # Create a mapping of uniqueid -> (name, mobile)
    # The uniqueid is stored in the JSON (e.g., "AQ5697")
    candidates_data = {}
    for sub in submissions:
        uid = sub.get("uniqueid", "").strip().upper()
        if uid:
            candidates_data[uid] = {
                "name": sub.get("name", "Candidate"),
                "mobile": sub.get("mobile", "")
            }

    print("📄 Parsing links_output.txt...")
    links_path = "links_output.txt"
    extracted_links = []
    try:
        with open(links_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        current_name = None
        for line in lines:
            line = line.strip()
            if line.startswith("Candidate/File Name:"):
                current_name = line.replace("Candidate/File Name:", "").strip()
            elif line.startswith("Download Link:") and current_name:
                link = line.replace("Download Link:", "").strip()
                # Extract uniqueid from filename: Result_Babulal_joshi_AQ5697.pdf
                # It's always at the end before .pdf
                match = re.search(r'_([A-Za-z0-9]+)\.pdf$', current_name, re.IGNORECASE)
                if match:
                    uid = match.group(1).strip().upper()
                    extracted_links.append({
                        "filename": current_name,
                        "uniqueid": uid,
                        "link": link
                    })
                current_name = None
    except FileNotFoundError:
        print(f"❌ Error: Could not find {links_path}")
        sys.exit(1)

    print(f"✅ Found {len(extracted_links)} links to process.\n")
    print("⚠️  IMPORTANT: The script will now open your default browser to WhatsApp Web.")
    print("Please make sure you are logged into WhatsApp Web before proceeding.")
    print("Do NOT touch your mouse or keyboard while a message is being typed/sent.\n")
    
    input("Press Enter to start sending messages (or Ctrl+C to abort)...")
    
    # Load already sent unique IDs
    import os
    sent_log_file = "sent_messages_log.txt"
    already_sent = set()
    if os.path.exists(sent_log_file):
        with open(sent_log_file, "r") as f:
            for line in f:
                already_sent.add(line.strip().upper())
    
    print("\nStarting WhatsApp message dispatch...")
    print("-" * 50)

    for item in extracted_links:
        uid = item["uniqueid"]
        link = item["link"]
        
        if uid in already_sent:
            print(f"⏭️  Skipping {uid} (Already sent).")
            continue
            
        if uid in candidates_data:
            mobile = candidates_data[uid]["mobile"]
            name = candidates_data[uid]["name"]
            
            if not mobile:
                print(f"⚠️  Skipping {name} ({uid}): No mobile number found.")
                continue
                
            # Ensure it has the country code
            if not mobile.startswith("+"):
                mobile = f"{COUNTRY_CODE}{mobile}"
                
            message = f"Hello {name},\n\nHere is the link to download your post-test result: \n{link}\n\nThank you."
            
            print(f"Sending to {name} ({mobile})...")
            
            try:
                # sendwhatmsg_instantly opens the browser, types the message, and hits enter
                # wait_time=15 allows the browser to open and load WhatsApp Web
                # tab_close=True will close the tab after sending
                pywhatkit.sendwhatmsg_instantly(
                    phone_no=mobile, 
                    message=message, 
                    wait_time=15, 
                    tab_close=True, 
                    close_time=3
                )
                print(f"✅ Message sent to {name}.")
                
                # Record successful send
                with open(sent_log_file, "a") as f:
                    f.write(f"{uid}\n")
                already_sent.add(uid)
                
                # Wait a bit between messages to prevent getting flagged for spam by WhatsApp
                time.sleep(5)
                
            except Exception as e:
                print(f"❌ Failed to send to {name}: {e}")
        else:
            print(f"⚠️  Could not find candidate data for Unique ID: {uid} (File: {item['filename']})")

    print("-" * 50)
    print("🎉 Finished processing all links.")

if __name__ == '__main__':
    main()
