"use client"
import { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import ImageZone from "../components/MainImageZone";
import DisplayResults from "../components/DisplayResults";
import { useImageUpload } from "../hooks/useImageUpload";
import { submitImages } from "../services/imageService";

export default function HomePage() {
  const { osImageData, odImageData, handleImageUpload, removeImage } = useImageUpload();
  const [resultData, setResultData] = useState<any>(null); // Store the result data

  // Handles submitting images and displaying the result
  const handleSubmit = async () => {
    const images = [osImageData, odImageData].filter(Boolean) as any; // Remove null values
    if (images.length === 0) {
      alert("Please upload at least one image (OD or OS).");
      return;
    }
    try {
      const response = await submitImages(images); // Call the API
      setResultData(response.metadata.storage); // Set result to be displayed
      alert("Images submitted successfully!");
    } catch {
      alert("Error submitting images.");
    }
  };

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Upload Eye Images for Analysis
      </Typography>

      {/* Image Upload Sections for OS and OD */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ImageZone
            label="OS (Left Eye)"
            imageUrl={osImageData?.value || null}
            imageName={osImageData?.name || null}
            onFileChange={(e) => handleImageUpload("OS", e)}
            onRemoveImage={() => removeImage("OS")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageZone
            label="OD (Right Eye)"
            imageUrl={odImageData?.value || null}
            imageName={odImageData?.name || null}
            onFileChange={(e) => handleImageUpload("OD", e)}
            onRemoveImage={() => removeImage("OD")}
          />
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Images
        </Button>
      </Box>

      {/* Display Results after submission */}
      {resultData && <DisplayResults resultData={resultData} />}
    </Box>
  );
}
