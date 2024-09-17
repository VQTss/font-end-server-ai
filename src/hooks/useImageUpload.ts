import { useState } from "react";

export type ImageData = {
  value: string;
  name: string;
  type: "OD" | "OS";
};

export const useImageUpload = () => {
  const [osImageData, setOsImageData] = useState<ImageData | null>(null);
  const [odImageData, setOdImageData] = useState<ImageData | null>(null);

  const handleImageUpload = (type: "OS" | "OD", event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const imageData: ImageData = { value: base64String, name: file.name, type };
        if (type === "OS") {
          setOsImageData(imageData);
        } else if (type === "OD") {
          setOdImageData(imageData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: "OS" | "OD") => {
    if (type === "OS") {
      setOsImageData(null);
    } else if (type === "OD") {
      setOdImageData(null);
    }
  };

  return {
    osImageData,
    odImageData,
    handleImageUpload,
    removeImage,
  };
};
