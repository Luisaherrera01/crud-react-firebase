import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyAXxgrOUrKICR1g-lZR6K3nmV7pqhJNIXs",
  authDomain: "crud-afc84.firebaseapp.com",
  projectId: "crud-afc84",
  storageBucket: "crud-afc84.appspot.com",
  messagingSenderId: "568513794950",
  appId: "1:568513794950:web:d57c70743c62202939d207"
};
const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
export const storage = getStorage(app)

export const subirImagen = async (file) => {
  const uploadImg = ref(storage, v4())
  await uploadBytes(uploadImg, file)
  const urlImg = await getDownloadURL(uploadImg)
  return urlImg
}
