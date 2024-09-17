import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import { AddPhotoAlternate as AddPhotoIcon, Delete as DeleteIcon } from "@mui/icons-material";

type ImageZoneProps = {
  label: string;
  imageUrl: string | null;
  imageName: string | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
};

const ImageZone = ({ label, imageUrl, imageName, onFileChange, onRemoveImage }: ImageZoneProps) => {
  return (
    <Paper elevation={3} sx={{ padding: "24px", borderRadius: "12px", textAlign: "center", minHeight: "300px" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          position: "relative",
        }}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="Uploaded"
              style={{ width: "200px", height: "200px", objectFit: "cover", marginBottom: "16px", borderRadius: '8px' }}
            />
            <IconButton
              color="error"
              onClick={onRemoveImage}
              aria-label="delete"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                '&:hover': {
                  backgroundColor: "rgba(255, 0, 0, 0.8)",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mt: 1, color: "#777" }}>
              {imageName}
            </Typography>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: "16px",
            }}
          >
            <AddPhotoIcon sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
            <Typography variant="body2" sx={{ mb: 2, color: "#888" }}>
              Drag and drop an image or click below to upload
            </Typography>
            <Button variant="contained" component="label" startIcon={<AddPhotoIcon />}>
              Select Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={onFileChange}
              />
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ImageZone;
