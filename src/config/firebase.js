import { initializeApp } from "firebase/app";
const firebaseConfing = () => {
      const firebaseConfig = {
            apiKey: "AIzaSyCLPv_0OD28irbXx8efWvki-_JeESAmdss",
            authDomain: "everyones-app.firebaseapp.com",
            projectId: "everyones-app",
            storageBucket: "everyones-app.appspot.com",
      };

      const app = initializeApp(firebaseConfig);
      return app;
}     

export default firebaseConfing