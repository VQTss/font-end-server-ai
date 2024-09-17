import { Box, Card, CardContent, Typography, Grid, Divider } from "@mui/material";

const DisplayResults = ({ resultData }: { resultData: any }) => {
  const renderEyeData = (eyeData: any, eye: string) => (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {eye === "OD" ? "Right Eye (OD)" : "Left Eye (OS)"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          <strong>Original Image:</strong>
        </Typography>
        <img src={eyeData.original.url} alt="Original" style={{ width: "100%", marginBottom: "16px" }} />

        <Typography variant="subtitle1" gutterBottom>
          <strong>Cropped Image:</strong>
        </Typography>
        <img src={eyeData.cropping.url} alt="Cropped" style={{ width: "100%", marginBottom: "16px" }} />

        <Typography variant="subtitle1">
          <strong>Quick Qual Prediction:</strong> {eyeData.quickqual.predict.Good}% Good, {eyeData.quickqual.predict.Usable}% Usable, {eyeData.quickqual.predict.Bad}% Bad
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          <strong>Optic Disc & Macular Detection:</strong>
        </Typography>
        <img src={eyeData.od_macular.url} alt="Optic Disc and Macular" style={{ width: "100%", marginBottom: "16px" }} />

        <Typography variant="subtitle1">
          <strong>AMD Result:</strong> {eyeData.amd.amdresult} (Confidence: {eyeData.amd.confidence})
        </Typography>
        <img src={eyeData.amd.url} alt="AMD" style={{ width: "100%", marginBottom: "16px" }} />
        <Typography variant="subtitle1" gutterBottom>
          <strong>AMD Heatmap:</strong>
        </Typography>
        <img src={eyeData.amd.heatmap} alt="AMD Heatmap" style={{ width: "100%", marginBottom: "16px" }} />

        {/* Continue adding more sections as needed */}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {resultData[0]?.OD && (
          <Grid item xs={12} md={6}>
            {renderEyeData(resultData[0].OD, "OD")}
          </Grid>
        )}
        {resultData[1]?.OS && (
          <Grid item xs={12} md={6}>
            {renderEyeData(resultData[1].OS, "OS")}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DisplayResults;
