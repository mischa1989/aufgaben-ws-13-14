## Aufgabe 4

Nun bauen wir den eigentlich Chat und verdrahten die Clients per WebSockets mit unserem Server. Für diese Aufgabe existieren keine Tests, ihr könnt die Funktionalität aber im Browser testen. Den client-seitigen Code haben wir euch vorgegeben. Er befindet sich in `public/chat.js` und darf nicht verändert werden. Das `/public`-Verzeichnis beinhaltet alles, was der Browser braucht:

- `index.html`
- `404.html`
- `chat.js`
- `logo.gif`
- `main.css`

### 1. static-Middleware einbauen

Das gesamte Verzeichnis `/public` soll dem Browser ausgeliefert werden. Verwendet dazu die [static-Middleware](http://www.senchalabs.org/connect/static.html) von [connect](http://www.senchalabs.org/connect/). Wir haben euch schon etwas Code in der `app/index.js` vorgegegeben. Die Middlewares sollten **vor** dem `listen()`-Aufruf konfiguriert werden.

Ihr seht, dass die Middleware funktioniert, wenn ihr mit eurem Browser auf [http://localhost:3000](http://localhost:3000) geht und der Chat erscheint.

### 2. 404-Route einbauen

Bei jeder Route, die im `/public`-Verzeichnis nicht aufgelöst werden kann, soll die `/public/404.html`-Datei mit dem Statuscode `404` ausgeliefert werden.

### 3. User "me" initialisieren

Für die Kommunikation per WebSockets haben wir die Library [socket.io](http://socket.io/) eingebunden. socket.io emittet Events und bietet Standardmethoden an, um an einen oder an viele Clients Nachrichten zu schicken.

Sobald sich jemand per WebSockets auf euren Server verbindet, wird der `connection`-Event emittet.

```javascript
io.sockets.on("connection", function onSocketConnection(socket) {
    // Hier kommt der Code rein, der pro Client ausgeführt werden soll
});
```

Das `socket`-Objekt repräsentiert dabei eine Socket-Verbindung zu **einem** Client und ist eine Instanz von `EventEmitter`. Auf ihm könnt ihr Events vom Client empfangen und Events zum Client schicken.

Sobald sich jemand per WebSockets verbindet, soll automatisch ein User mit einem Zufallsnamen erstellt werden. Dazu haben wir euch das grandiose [Faker-Modul](https://github.com/marak/Faker.js/) eingebunden. Erzeugt damit ein User-Objekt, so wie es der `ChatServer` erwartet. Der Username soll in unserem Fall gleichzeitig als `id` dienen - `id` und `name` sind also identisch. Ihr könnt einen Zufallsvornamen über den Funktionsaufruf `Faker.Name.firstName()` generieren.

Der erzeugte User soll auf der `chatServer`-Instanz mit der `addUser`-Methode hinzugefügt werden. **Danach** - also wenn der Callback ausgeführt wird - soll auf der `socket`-Instanz der `me`-Event emittet werden, dem ihr den erzeugten User mitgebt. Dadurch erfährt der Client, welche `id` und welchen `name` er zugewiesen bekommen hat.

```javascript
socket.emit("me", user);
```

### 4. Messages empfangen und broadcasten

Nun müsst ihr auf der `socket`-Instanz auf einen `message`-Event hören. Dieser Event wird jedesmal emittet, wenn der Client eine Nachricht abschickt:

```javascript
socket.on("message", function onMessageReceive(userId, text) {
    
});
```

Die gesendete Nachricht soll an den `chatServer` mit `sendMessage` weitergegeben werden. Damit werden die Nachrichten (zumindest in der Theorie) in einer Datenbank gespeichert. Sobald der Callback von `sendMessage` ausgeführt wird, soll die Nachricht auch an alle anderen Clients mit einem `remote message`-Event geschickt werden. Dafür gibt es die Methode `socket.broadcast.emit`. Diese Methode emittet den Event bei allen **anderen** Clients. Der `remote message`-Event erwartet wie der `message`-Event die `userId` und `text`:

```javascript
socket.broadcast.emit("remote message", user.id, message.text);
```

Der Chat funktioniert, wenn ihr euch in verschiedenen Browserfenstern Nachrichten schreiben könnt (am besten Firefox oder Chrome). Falls es Probleme gibt, schaut am besten auch in die Browser-Konsole (PC `STRG-SHIFT-I` / Mac `CMD + OPT + I`).

### 5. (Optional) Initiale Nachrichten anzeigen

**Die folgende Aufgabe ist optional!** Die Clients hören ebenfalls auf einen `initial messages`-Event. Die Eventlistener erwarten ein Object `users` und ein Array `messages` mit allen Message-Objekten aus der Datenbank. 

Das `users`-Objekt soll die User-Ids als key und die user-Objekte als value haben. Also zum Beispiel:

```javascript
{
    "Minerva": {"id":"Minerva","name":"Minerva"},
    "Joesph": {"id":"Joesph","name":"Joesph"}
}
```

Das `messages`-Array sieht zum Beispiel folgendermaßen aus:

```javascript
[
    {"id":1383749741420,"senderId":"Minerva","text":"hi"},
    {"id":1383749744368,"senderId":"Joesph","text":"Wow"}
]
``` 

Damit könnt ihr - sobald ein Client connected - ihm mitteilen, welche Nachrichten bisher schon auf dem Server gespeichert wurden. Wenn ihr also den Browser schließt und wieder auf die Seite geht, sollten die bisherigen Nachrichten erscheinen.
