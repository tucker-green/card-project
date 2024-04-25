import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase-config"; // Adjusted to named imports

const storage = getStorage(app);

export const uploadImage = async (file) => {
  if (!file) return null;
  const storageRef = ref(storage, `cards/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
