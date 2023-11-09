(Run and debug mobile app with Expo CLI)

For more information: https://docs.expo.dev/

-------------------I/ Setup environment--------------------

1. Require:
- NodeJS 16
- Git

(Java 17, if not; yarn/chocolatey is optional)

2. Installation:

- Install VsCode/AndroidStudio/...
- Install NodeJS
- Install Git
- Install Expo CLI: 

    npm install --global expo-cli
    
- Setup:
    + Init git: 

        git init

    + Clone this repository:

        git clone https://github.com/Sepopur0/ChefHelper-231-FriendlyChef.git 

    + Install dependecies:

        npm install 

    or 

        npm install --legacy-peer-deps

3. Run:
- Run development server: 

    npx expo start

- Start debugging:
    + On Expo Go: scan QR shown on terminal; need to connect server with phone on the same network
    + On emulator: https://docs.expo.dev/workflow/android-studio-emulator/
    + Via USB: Need adb (Android Studio or self-installing). However, you need to check and add adb path manually if needed.
        adb start-server (if adb is not init)

        npx expo start --localhost --android

-------------------II/ Folder structure--------------------

1. pages: containing main pages like upload, profile,recipe details,...
2. components: containing commono components (button, dropdown,...) or components that appear multiple times as well (step upload,...)
3. ultils: containing substitued information (like color palette, typography, size,...) and helper functions
(may need a fourth folder for database connection)
