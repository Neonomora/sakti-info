// hash.js
import bcrypt from 'bcryptjs';

const password = 'correcthorsebatterystaple';

bcrypt.hash(password, 10).then((hash) => {
  console.log("Hashed password:", hash);
});
