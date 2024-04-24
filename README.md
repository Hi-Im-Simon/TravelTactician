# Running the development version

- Android Studio -> Device Manager -> Physical -> Pair using Wi-Fi
- Phone -> Settings -> Wireless debugging -> Pair device with QR code -> scan the code shown in previous step
- ./android -> create file _local.properties_ -> paste _sdk.dir=C:\\Users\\{USERNAME}\\AppData\\Local\\Android\\Sdk_
- `set GOOGLE_MAPS_API_KEY={API_KEY}` where the API_KEY is the key received from https://console.cloud.google.com/
- `npx expo run:android` (_--device_ flag if more than one device is connected)
