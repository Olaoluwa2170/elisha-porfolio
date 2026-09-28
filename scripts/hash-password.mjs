// Usage: node scripts/hash-password.mjs "your-passphrase"
// Prints a SHA-256 hex digest to put in VITE_ADMIN_PASSWORD_HASH.
// The plaintext passphrase itself is never stored anywhere.
import { createHash } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your-passphrase"');
  process.exit(1);
}

console.log(createHash("sha256").update(password).digest("hex"));
