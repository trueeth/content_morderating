/**
 * Reads a File object and returns a Promise resolving to a Uint8Array.
 * @param {File} file - The File object to read.
 * @returns {Promise<Uint8Array>} A Promise that resolves to the Uint8Array representation of the file.
 */
export const readFileAsBytes = (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Event listener for successful file read
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      } else {
        reject(new Error('Failed to read file as ArrayBuffer.'));
      }
    };

    // Event listener for file read error
    reader.onerror = () => {
      reject(new Error('Error reading the file.'));
    };

    // Initiates the file read as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Converts a Uint8Array to a Base64-encoded string.
 * @param {Uint8Array} uint8Array - The Uint8Array to convert.
 * @returns {string} The Base64-encoded string.
 */
export const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
  let binaryString = '';

  // Convert each byte in the Uint8Array to a binary string
  uint8Array.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });

  // Use btoa to encode the binary string as Base64
  return btoa(binaryString);
}
