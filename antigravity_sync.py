import subprocess
import time
import os

# CONFIGURATION
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
# Path to your Windows 11 VS Code executable
EDITOR_PATH = r"C:\Users" + os.getlogin() + r"\AppData\Local\Programs\Microsoft VS Code\Code.exe"

def launch_and_sync():
    os.chdir(PROJECT_DIR)
    print(f"🚀 Antigravity Sync active. Launching editor from: {PROJECT_DIR}")
    
    # Launch editor and wait for it to close completely
    process = subprocess.Popen([EDITOR_PATH, "."])
    process.wait()
    
    print("🛑 Editor closed. Initiating automatic GitHub push...")
    
    # Run Git commands sequentially
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", "Auto-pushed via Antigravity Sync"], check=True)
    subprocess.run(["git", "push", "origin", "main"], check=True)
    
    print("✅ Successfully pushed to GitHub!")
    time.sleep(2)

if __name__ == "__main__":
    launch_and_sync()
