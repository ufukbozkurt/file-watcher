---Purpose---

Tracks a document for changes and sends the whole document through the websocket after each change made on the document.

---Installation and Execution---

Node.js must be installed first.

```bash
cd < path to file-watcher >
npm install --save
node server.js
```
---Connection---
```bash
ws://localhost:< config.port >/?file=< config.file.name >
``` 
-Note that config above is config.json at project root.


