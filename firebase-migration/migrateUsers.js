const admin = require("firebase-admin");
const fs = require("fs");

// Path to your Firebase Admin SDK key:
const serviceAccount = require("./card-project-d6fff-firebase-adminsdk-xq3v6-59207fe8d4.json");

// Initialize the Firebase Admin app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://card-project-d6fff-default-rtdb.firebaseio.com/", // Replace with your database URL
});

const db = admin.firestore();

// Path to the JSON file with exported users
const usersJson = "./users.json";

// Function to read JSON and write to Firestore
async function importUsersToFirestore() {
  const usersData = JSON.parse(fs.readFileSync(usersJson, "utf8"));
  const users = usersData.users; // This matches your JSON structure

  for (const user of users) {
    console.log("Importing user:", user.localId); // Logging to verify correct user ID
    const userRef = db.collection("users").doc(user.localId);
    await userRef
      .set(
        {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoUrl,
          lastSignedInAt: new Date(parseInt(user.lastSignedInAt)),
          createdAt: new Date(parseInt(user.createdAt)),
          providerData: user.providerUserInfo.map((info) => ({
            providerId: info.providerId,
            displayName: info.displayName,
            email: info.email,
            photoUrl: info.photoUrl,
          })),
        },
        { merge: true }
      )
      .then(() => {
        console.log(`User ${user.localId} imported successfully.`);
      })
      .catch((error) => {
        console.error(`Failed to import user ${user.localId}:`, error);
      });
  }
}

importUsersToFirestore().then(() =>
  console.log("All users have been imported.")
);
