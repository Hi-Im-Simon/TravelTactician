# Running the development version

- Android Studio -> Device Manager -> Physical -> Pair using Wi-Fi
- Phone -> Settings -> Wireless debugging -> Pair device with QR code -> scan the code shown in previous step
- ./android -> create file `local.properties` -> paste `sdk.dir=C:\\Users\\{USERNAME}\\AppData\\Local\\Android\\Sdk`
- `npx expo run:android` (`--device` flag if more than one device is connected)
