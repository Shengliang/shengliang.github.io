
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';


const firebaseConfig = {
  apiKey: "AIzaSyCCB4KNfftoJe8A6tvEFJX_jQFF2BRfbIY",
  authDomain: "mentor-calendar-89af7.firebaseapp.com",
  projectId: "mentor-calendar-89af7",
  storageBucket: "mentor-calendar-89af7.firebasestorage.app",
  messagingSenderId: "568788464559",
  appId: "1:568788464559:web:72e0531e94fe038ff8f55a",
  measurementId: "G-7NJ4KDHF1M"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

function App() {
  const [user] = useAuthState(firebase.auth());

  if (!user) {
    return (
      <div>
        <button onClick={() => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())}>
          Sign In with Google
        </button>
      </div>
    );
  }

  // ... rest of the app
}

function CalendarPage() {
  const [value, onChange] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    // Fetch available slots from Firebase
    firebase.database().ref('availableSlots').on('value', (snapshot) => {
      const slots = snapshot.val();
      setAvailableSlots(slots);
    });
  }, []);

  const handleSlotSelect = (date) => {
    // Check if the slot is available and book it
    // ...
  };

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      {/* Display available slots for the selected date */}
    </div>
  );
}


const handleSlotSelect = (date) => {
  // Check if the slot is available
  const isAvailable = availableSlots.includes(date.toISOString());

  if (isAvailable) {
    // Book the slot
    firebase.database().ref('appointments').push({
      userId: user.uid,
      date: date.toISOString(),
      // ... other appointment details
    });

    // Update available slots
    firebase.database().ref('availableSlots').update({
      [date.toISOString()]: false,
    });

    // Send email notifications
    // ...
  } else {
    // Show an error message or prompt the user to choose another slot
  }
};


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Your email provider configuration
});

const mailOptions = {
  from: 'Your Name <your-email@example.com>',
  to: 'user-email@example.com',
  subject: 'Appointment Confirmation',
  text: 'Your appointment is scheduled for...'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
