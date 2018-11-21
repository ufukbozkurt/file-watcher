---Purpose---

Tracks a document for changes and sends the whole document through the websocket after each change made on the document.

---Installation and Execution---

Node.js must be installed first.

Document name, document path and server port can be set from config.json. 
A simple web client and test.txt added for test purposes.

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


