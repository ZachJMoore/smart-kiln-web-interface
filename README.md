#Smart Kiln
This is the web interface for the "Smart Kiln" project.

###Getting up and running
Due to data caps on firebase, everyone must run their own version for now. Refer to <a href="https://github.com/ZachJMoore/smart-kiln-web-interface/blob/master/src/firebase/firebase-example.js">firebase-example</a> for setting api keys with your own firebase project, and then rename your edited file to exactly "firebase.js" in the firebase folder inorder to keep relative paths correct.

In the root folder run the following in the terminal

```
    $ yarn
    $ yarn start
```

To setup the raspberry pi, refer to <a href="https://github.com/ZachJMoore/smart-kiln-pi-server">smart-kiln-pi-server</a>