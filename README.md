# ReactNativeWebRTC-MediaSoup
This is a project to see how to get more control over webrtc video streams via media soup and connect to a boilerplate ReactNative App for streaming to the browser as well as save footage for later. The ultimate goal of the project is to turn phones into body cams for intense board gaming sessions. 

## Technology 
The app is built with react native and tested with ios and android. The backend is a typescript server running express, media soup for direct webrtc streaming and decoding, and a websocket server for custom webrtc signaling. It also uses a psql db for user, authentication, and other general logs. 

## How To Set Up 
The ReactNative application runs like a regular react native app (Note you will read a real device to test it with). The backend needs a Psql server with the schema and db seeding from the db directory applied. After that is set up, run `yarn install` and `yarn start`. The last step is changing the env variable of `SERVER_IP` to the ip of the device running the server so that the phone running the web app can connect to it.


