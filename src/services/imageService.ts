import axios from "axios";
import { ImageData } from "../hooks/useImageUpload";

export const submitImages = async (images: ImageData[]) => {
  try {
    // patient id  random number
    const patientID = Math.floor(Math.random() * 90) + 100;
    const esposideID =  Math.floor(Math.random() * 900) + 1000;
    const response = await axios.post(`http://192.168.1.12:7001/api/v1/pipeline/${patientID}/${esposideID}`, images);
    console.log("Images submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting images:", error);
    throw new Error("Error submitting images");
  }
};
