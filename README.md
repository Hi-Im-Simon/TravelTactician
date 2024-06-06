# Running the development version

- Android Studio -> Device Manager -> Physical -> Pair using Wi-Fi
- Phone -> Settings -> Wireless debugging -> Pair device with QR code -> scan the code shown in previous step
- ./android -> create file _local.properties_ -> paste _sdk.dir=C:\\Users\\{USERNAME}\\AppData\\Local\\Android\\Sdk_
- `npx expo run:android` (_--device_ flag if more than one device is connected)

# Installing the app on a device

- https://expo.dev/accounts/{EXPO_USERNAME}/projects/{PROJECT_NAME}/builds/{PROJECT_ID}
-

# Creating a new build

- `eas build -p android --profile preview` (might take a long time)
- download the application from generated link
