"use client";
import { useState } from "react";
import { Box, Button, Grid, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import ImageZone from "../components/MainImageZone";
import DisplayResults from "../components/DisplayResults";
import { useImageUpload } from "../hooks/useImageUpload";
import { submitImages } from "../services/imageService";

export default function HomePage() {
  const { osImageData, odImageData, handleImageUpload, removeImage } = useImageUpload();
  const [resultData, setResultData] = useState<any>(null); // Store the result data
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success"); // Snackbar severity
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [patientID, setPatientID] = useState(0);
  const [episodeRecordID, setEpisodeRecordID] = useState(0);
  // Handle image submission and display result
  const handleSubmit = async () => {
    const images = [osImageData, odImageData].filter(Boolean) as any; // Filter null values
    if (images.length === 0) {
      setSnackbarMessage("Please upload at least one image (OD or OS).");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true); // Start loading
    try {
      const { data, patientID, esposideID } = await submitImages(images); // Call API
      // Set the returned data, patientID, and episodeRecordID to the state
      setResultData(data);
      setPatientID(patientID);
      setEpisodeRecordID(esposideID);
      setSnackbarMessage("Images submitted successfully!");
      setSnackbarSeverity("success");
    } catch {
      setSnackbarMessage("Error submitting images.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true); // Open snackbar after result
      setLoading(false); // Stop loading
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

      {/* Submit Button with Loading Spinner */}
      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          Submit Images
        </Button>
        {loading && (
          <Box mt={2}>
            <CircularProgress /> {/* Loading spinner */}
          </Box>
        )}
      </Box>

      {/* Display Results after submission */}
      {resultData && (
        <DisplayResults
          resultData={resultData.metadata.storage}
          patientID={patientID}
          episodeRecordID={episodeRecordID}
        />
      )}

      {/* Snackbar for Success and Error Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
