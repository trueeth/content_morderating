
export const readFileAsBytes = (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      } else {
        reject(new Error('Failed to read file as ArrayBuffer.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading the file.'));
    };

    reader.readAsArrayBuffer(file);
  });
}

export const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
  let binaryString = '';

  uint8Array.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });

  return btoa(binaryString);
}
