/**
 * AES-256-GCM Encryption Utility
 * נתונים מוצפנים (AES-256-GCM)
 *
 * Provides secure encryption and decryption of sensitive data
 * in accordance with Israeli privacy laws (תיקון 13)
 */

/**
 * Generate a random encryption key
 * @returns {string} Base64 encoded key
 */
export function generateKey() {
  if (typeof window !== 'undefined' && window.crypto) {
    const key = new Uint8Array(32); // 256 bits
    window.crypto.getRandomValues(key);
    return btoa(String.fromCharCode(...key));
  }
  // Fallback for server-side
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('base64');
}

/**
 * Encrypt data using AES-256-GCM
 * @param {string} plaintext - Data to encrypt
 * @param {string} base64Key - Base64 encoded encryption key
 * @returns {Promise<string>} Encrypted data (base64)
 */
export async function encrypt(plaintext, base64Key) {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      // Browser implementation
      const key = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96 bits for GCM
      const encoder = new TextEncoder();
      const data = encoder.encode(plaintext);

      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-GCM' },
        false,
        ['encrypt']
      );

      const encrypted = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv,
          tagLength: 128
        },
        cryptoKey,
        data
      );

      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(encrypted), iv.length);

      return btoa(String.fromCharCode(...combined));
    } else {
      // Server-side implementation
      const crypto = require('crypto');
      const key = Buffer.from(base64Key, 'base64');
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

      let encrypted = cipher.update(plaintext, 'utf8');
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      const authTag = cipher.getAuthTag();

      // Combine IV, authTag, and encrypted data
      const combined = Buffer.concat([iv, authTag, encrypted]);
      return combined.toString('base64');
    }
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt data using AES-256-GCM
 * @param {string} encryptedData - Base64 encoded encrypted data
 * @param {string} base64Key - Base64 encoded encryption key
 * @returns {Promise<string>} Decrypted plaintext
 */
export async function decrypt(encryptedData, base64Key) {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      // Browser implementation
      const key = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
      const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);

      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      );

      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv,
          tagLength: 128
        },
        cryptoKey,
        encrypted
      );

      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    } else {
      // Server-side implementation
      const crypto = require('crypto');
      const key = Buffer.from(base64Key, 'base64');
      const combined = Buffer.from(encryptedData, 'base64');

      const iv = combined.slice(0, 12);
      const authTag = combined.slice(12, 28);
      const encrypted = combined.slice(28);

      const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encrypted);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return decrypted.toString('utf8');
    }
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Securely store encrypted data in localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 */
export async function secureStore(key, data) {
  if (typeof window === 'undefined') return;

  try {
    let encryptionKey = localStorage.getItem('__enc_key');
    if (!encryptionKey) {
      encryptionKey = generateKey();
      localStorage.setItem('__enc_key', encryptionKey);
    }

    const jsonData = JSON.stringify(data);
    const encrypted = await encrypt(jsonData, encryptionKey);
    localStorage.setItem(key, encrypted);
  } catch (error) {
    console.error('Secure store error:', error);
  }
}

/**
 * Retrieve and decrypt data from localStorage
 * @param {string} key - Storage key
 * @returns {Promise<any>} Decrypted data
 */
export async function secureRetrieve(key) {
  if (typeof window === 'undefined') return null;

  try {
    const encryptionKey = localStorage.getItem('__enc_key');
    if (!encryptionKey) return null;

    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    const decrypted = await decrypt(encrypted, encryptionKey);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Secure retrieve error:', error);
    return null;
  }
}

/**
 * Hash data using SHA-256
 * @param {string} data - Data to hash
 * @returns {Promise<string>} Hex encoded hash
 */
export async function hash(data) {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } else {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}
