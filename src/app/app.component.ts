import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final';
  constructor(private authservice: AuthService) {
    var firebaseConfig = {
      apiKey: "AIzaSyDK7FyHJ9msCrDl-WBoYww4vgyoc3AdPmE",
      authDomain: "handiservice-3cff8.firebaseapp.com",
      databaseURL: "https://handiservice-3cff8-default-rtdb.firebaseio.com",
      projectId: "handiservice-3cff8",
      storageBucket: "handiservice-3cff8.appspot.com",
      messagingSenderId: "922853066406",
      appId: "1:922853066406:web:d911bcac54fd8963451667",
      measurementId: "G-QV4LNY9S00"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}

