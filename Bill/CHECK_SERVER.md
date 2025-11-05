# How to Check if Your Server is Running

## Method 1: Open in Browser (Easiest)
1. Open your web browser (Chrome, Edge, Firefox, etc.)
2. Type this in the address bar: `http://localhost:8000`
3. Press Enter
4. **If you see your website** → Server is running! ✅
5. **If you see "This site can't be reached"** → Server is NOT running ❌

## Method 2: Check Using Command Prompt
Open PowerShell or Command Prompt and run:
```powershell
netstat -ano | findstr :8000
```
- **If you see output** → Server is running! ✅
- **If no output** → Server is NOT running ❌

## Method 3: Start the Server
If the server is NOT running, open PowerShell in this folder and run:
```powershell
python -m http.server 8000
```

You should see:
```
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

**Keep this window open** - closing it will stop the server!

## Method 4: Quick Test
Open a new browser tab and visit:
- http://localhost:8000
- http://127.0.0.1:8000

Both should show your website if the server is running.

---

**Quick Check:** Just open http://localhost:8000 in your browser - that's the fastest way!

