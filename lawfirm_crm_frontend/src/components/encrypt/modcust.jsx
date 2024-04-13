import sjcl from 'sjcl';

// Function to encrypt data
export const  encryptData = (data, password) => {
  const encryptedData = sjcl.encrypt(password, data);
  return encryptedData;
}

// Function to decrypt data
export const decryptData = (encryptedData, password)=> {
  try {
    const decryptedData = sjcl.decrypt(password, encryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
}

// Example usage
function exampleUsage() {
  const sensitiveData = 'This is a secret message.';
  const password = 'supersecret'; // Use a strong password

  // Encrypt data
  const encryptedData = encryptData(sensitiveData, password);
  console.log('Encrypted data:', encryptedData);

  // Decrypt data
  const decryptedData = decryptData(encryptedData, password);
  console.log('Decrypted data:', decryptedData);
}

exampleUsage();
