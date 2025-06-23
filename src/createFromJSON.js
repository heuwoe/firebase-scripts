/**
 * @fileoverview 
 * Script to create Firebase Authentication users from a JSON file.
 * Uses Firebase Admin SDK and generates passwords based on user full names.
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Replace with your Firebase Admin service account key file
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin SDK with service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Load users data from JSON file
const usersData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'users.json'), 'utf8')
);

/**
 * Generates a password based on a user's full name.
 * The format is: uppercase first letter of last name + first 6 letters of first name.
 * Example: "John Doe" => "DJohn"
 *
 * @param {string} fullName - The user's full name in "First Last" format.
 * @returns {string} The generated password.
 * @throws Will throw an error if full name is invalid.
 */
const makePassword = (fullName) => {
  const parts = fullName.trim().split(' ');
  if (parts.length < 2) {
    // instead lets use the firstname and make the first letter uppercase
    return `${parts[0].charAt(0).toUpperCase()}${parts[0].slice(1, 7)}`;
  }
  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  return `${lastName[0].toUpperCase()}${firstName.slice(0, 6)}`;
};

/**
 * Loops through the users data and creates Firebase Authentication accounts.
 * Logs success and password, or logs error for each user.
 *
 * @async
 * @returns {Promise<void>}
 */
const createUsers = async () => {
  for (const user of usersData) {
    try {
      const password = makePassword(user.fullName || user.name || user.username || user.userName);
      const createdUser = await admin.auth().createUser({
        email: user.email,
        password: password,
        displayName: user.name,
        disabled: !!user.disabled,
      });
      console.log(`✅ Created: ${createdUser.email} | Password: ${password}`);
    } catch (error) {
      console.error(`❌ Error for ${user.email}:`, error.message);
    }
  }
};

// Run the script
createUsers().then(() => {
  console.log('All done, sweetheart 💫');
  process.exit(0);
});