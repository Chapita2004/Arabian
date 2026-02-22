---
description: deploy changes to production (git push + server pull + rebuild)
---

// turbo-all

## After every code change, run these steps in order:

1. Stage all changes:
```
git add -A
```
Cwd: c:\Users\castr\OneDrive\Desktop\perfumeria-master\perfumeria-main\Perfumeria

2. Commit with a descriptive message:
```
git commit -m "<describe the change>"
```
Cwd: c:\Users\castr\OneDrive\Desktop\perfumeria-master\perfumeria-main\Perfumeria

3. Push to GitHub:
```
git push origin main
```
Cwd: c:\Users\castr\OneDrive\Desktop\perfumeria-master\perfumeria-main\Perfumeria

4. Deploy to DonWeb server (git pull + build + restart):
```
powershell -ExecutionPolicy Bypass -Command "node deploy.js"
```
Cwd: c:\Users\castr\OneDrive\Desktop\perfumeria-master

Note: deploy.js connects via SSH to 66.97.36.125 (root), runs git pull, npm install --legacy-peer-deps, npm run build, and pm2 restart all.
