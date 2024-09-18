import { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Divider, Dialog, Button, RadioGroup, FormControlLabel, Radio, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

// Component to display individual eye data (OD or OS)
const DisplayEyeData = ({ eyeData, eyeType }: { eyeData: any, eyeType: string }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <strong>{eyeType === "OD" ? "Right Eye (OD)" : "Left Eye (OS)"}</strong>
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* Original Image */}
        {eyeData.original?.url && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">Original Image:</Typography>
            <img
              src={eyeData.original.url}
              alt="Original"
              style={{ width: "300px", height: "300px", objectFit: "cover", marginBottom: "16px", cursor: "pointer" }}
              onClick={() => handleImageClick(eyeData.original.url)}
            />
          </>
        )}

        {/* Cropped Image */}
        {eyeData.cropping?.url && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">Cropped Image:</Typography>
            <img
              src={eyeData.cropping.url}
              alt="Cropped"
              style={{ width: "300px", height: "300px", objectFit: "cover", marginBottom: "16px", cursor: "pointer" }}
              onClick={() => handleImageClick(eyeData.cropping.url)}
            />
          </>
        )}

        {/* QuickQual Prediction */}
        {eyeData.quickqual?.prediction && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">Quick Qual Prediction:</Typography>
            <Typography variant="body2">{eyeData.quickqual.prediction}</Typography>
          </>
        )}

        {/* Optic Disc & Macular Detection */}
        {eyeData.od_macular?.url && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">Optic Disc & Macular Detection:</Typography>
            <img
              src={eyeData.od_macular.url}
              alt="Optic Disc and Macular"
              style={{ width: "300px", height: "300px", objectFit: "cover", marginBottom: "16px", cursor: "pointer" }}
              onClick={() => handleImageClick(eyeData.od_macular.url)}
            />
            {eyeData.od_macular?.json && eyeData.od_macular.json.map((det: any, index: number) => (
              <Typography key={index} variant="body2">
                <strong>{det.name}:</strong> ({det.xmin}, {det.ymin}) to ({det.xmax}, {det.ymax}) | Confidence: {det.confidence}
              </Typography>
            ))}
          </>
        )}

        {/* DR Screening */}
        {eyeData.lanet_dr?.url && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">DR Screening:</Typography>
            <img
              src={eyeData.lanet_dr.url}
              alt="DR Screening"
              style={{ width: "300px", height: "300px", objectFit: "cover", marginBottom: "16px", cursor: "pointer" }}
              onClick={() => handleImageClick(eyeData.lanet_dr.url)}
            />
            <Typography variant="body2">
              Screening: {eyeData.lanet_dr.screening} | Probability: {(eyeData.lanet_dr.screening === "noDR") ?  (eyeData.lanet_dr.probability?.probability * 100).toFixed(2) : (eyeData.lanet_dr.probability?.prediction * 100).toFixed(2)}%
            </Typography>
          </>
        )}

        {/* Lesions Detection */}
        {eyeData.lessions?.url && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">Lesions Detection:</Typography>
            <img
              src={eyeData.lessions.url}
              alt="Lesions"
              style={{ width: "300px", height: "300px", objectFit: "cover", marginBottom: "16px", cursor: "pointer" }}
              onClick={() => handleImageClick(eyeData.lessions.url)}
            />
              <Typography variant="body2">
              Count: SE: {eyeData.lessions.lesions?.SE?.count} | HE: {eyeData.lessions.lesions?.HE?.count} | MA: {eyeData.lessions.lesions?.MA?.count} | EX: {eyeData.lessions.lesions?.EX?.count} 
            </Typography>
          </>
        )}

        {/* AMD Section */}
        {eyeData.amd?.url && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">AMD Analysis:</Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Box>
                <img
                  src={eyeData.amd.url}
                  alt="AMD Image"
                  style={{ width: "300px", height: "300px", objectFit: "cover", borderRadius: "8px", cursor: "pointer" }}
                  onClick={() => handleImageClick(eyeData.amd.url)}
                />
              </Box>
              <Box>
                <img
                  src={eyeData.amd.heatmap}
                  alt="AMD Heatmap"
                  style={{ width: "300px", height: "300px", objectFit: "cover", borderRadius: "8px", cursor: "pointer" }}
                  onClick={() => handleImageClick(eyeData.amd.heatmap)}
                />
              </Box>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body1">
                  <strong>AMD Result:</strong> {eyeData.amd.amdresult}
                </Typography>
                <Typography variant="body1">
                  <strong>Confidence:</strong> {eyeData.amd.confidence}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {/* Glaucoma Section */}
        {eyeData.glaucoma?.predict && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">Glaucoma Prediction:</Typography>
            <Typography variant="body2">
              Predict: {eyeData.glaucoma.predict} | Probability: {eyeData.glaucoma.probability?.toFixed(2)}%
            </Typography>
          </>
        )}

        {/* Segmentation Section */}
        {eyeData.segmentationOD?.url && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">Segmentation:</Typography>
            <img
              src={eyeData.segmentationOD.url}
              alt="Segmentation"
              style={{ width: "300px", height: "300px", objectFit: "cover", marginBottom: "16px", cursor: "pointer" }}
              onClick={() => handleImageClick(eyeData.segmentationOD.url)}
            />
            {eyeData.segmentationOD?.analysis && (
              <>
                <Typography variant="body2">CDR Vertical: {eyeData.segmentationOD.analysis?.CDR_vertical}</Typography>
                <Typography variant="body2">CDR Horizontal: {eyeData.segmentationOD.analysis?.CDR_horizontal}</Typography>
              </>
            )}
          </>
        )}

        {/* Modal for Zoom-Out */}
        <Dialog open={open} onClose={handleClose} maxWidth="md">
          {selectedImage && (
            <img src={selectedImage} alt="Zoomed" style={{ width: "700px", height: "700px", objectFit: "cover" }} />
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
};

// Helper to render radio button options
const renderRadioOptions = () => {
  const options = [
    // { value: 1, label: "1 - Strongly Disagree" },
    // { value: 2, label: "2 - Disagree" },
    // { value: 3, label: "3 - Neutral" },
    // { value: 4, label: "4 - Agree" },
    // { value: 5, label: "5 - Strongly Agree" }
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" }
  ];

  return options.map((option) => (
    <FormControlLabel
      key={option.value}
      value={option.value}
      control={<Radio />}
      label={option.label}
    />
  ));
};

// Generate final conclusion
const generateConclusion = (resultData: any) => {
  let conclusion = "";

  resultData.forEach((eyeDataObj: any) => {
    if (eyeDataObj.OD && Object.keys(eyeDataObj.OD).length > 0) {
      conclusion += "Right Eye (OD): ";
      if (eyeDataObj.OD.amd?.amdresult) {
        conclusion += `<strong>AMD Result:</strong> ${eyeDataObj.OD.amd.amdresult}. `;
      }
      if (eyeDataObj.OD.glaucoma?.predict) {
        conclusion += `<strong>Glaucoma Prediction:</strong> ${eyeDataObj.OD.glaucoma.predict}. `;
      }
      if (eyeDataObj.OD.lanet_dr?.screening) {
        conclusion += `<strong>DR Screening:</strong> ${eyeDataObj.OD.lanet_dr.screening}. `;
      }
      conclusion += "<br />";
    }
    if (eyeDataObj.OS && Object.keys(eyeDataObj.OS).length > 0) {
      conclusion += "Left Eye (OS): ";
      if (eyeDataObj.OS.amd?.amdresult) {
        conclusion += `<strong>AMD Result:</strong> ${eyeDataObj.OS.amd.amdresult}. `;
      }
      if (eyeDataObj.OS.glaucoma?.predict) {
        conclusion += `<strong>Glaucoma Prediction:</strong> ${eyeDataObj.OS.glaucoma.predict}. `;
      }
      if (eyeDataObj.OS.lanet_dr?.screening) {
        conclusion += `<strong>DR Screening:</strong> ${eyeDataObj.OS.lanet_dr.screening}. `;
      }
    }
  });

  return conclusion || "No significant findings.";
};

// Component to Display Either OD or OS or Both
const DisplayResults = ({ resultData }: { resultData: any }) => {
  const [formData, setFormData] = useState<any>({
    OD: {},
    OS: {},
    comments: ""
  });
  const [confirmOpen, setConfirmOpen] = useState(false); // Modal state

  const handleRadioChange = (eye: "OD" | "OS", field: string, value: number) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [eye]: {
        ...prevData[eye],
        [field]: value
      }
    }));
  };

  const handleOpenConfirm = () => {
    setConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
  };

  const conclusion = generateConclusion(resultData);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {resultData.map((eyeDataObj: any, index: number) => (
          <Grid item xs={12} md={6} key={index}>
            {eyeDataObj.OD && Object.keys(eyeDataObj.OD).length > 0 && (
              <DisplayEyeData eyeData={eyeDataObj.OD} eyeType="OD" />
            )}
            {eyeDataObj.OS && Object.keys(eyeDataObj.OS).length > 0 && (
              <DisplayEyeData eyeData={eyeDataObj.OS} eyeType="OS" />
            )}
          </Grid>
        ))}
      </Grid>

      {/* Final Conclusion in a Card */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
            Final Conclusion
          </Typography>
          <Typography
            variant="body1"
            align="center"
            dangerouslySetInnerHTML={{ __html: conclusion }}
            sx={{ fontWeight: 'normal' }}
          />
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Button variant="contained" onClick={handleOpenConfirm} sx={{ mt: 2 }}>
        Confirm Results
      </Button>
      <Dialog open={confirmOpen} onClose={handleCloseConfirm} maxWidth="md" fullWidth>
        <DialogTitle>Confirm Results for OD/OS</DialogTitle>
        <DialogContent>
          {/* OD Confirmations */}
          {resultData.some((eyeDataObj: any) => eyeDataObj.OD && Object.keys(eyeDataObj.OD).length > 0) && (
            <>
              <Typography variant="h6" gutterBottom>Right Eye (OD) Confirmations</Typography>
              <Typography variant="subtitle1"><strong>Glaucoma</strong></Typography>
              <RadioGroup row value={formData.OD.glaucoma} onChange={(e) => handleRadioChange('OD', 'glaucoma', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>

              <Typography variant="subtitle1"><strong>DR Screening</strong></Typography>
              <RadioGroup row value={formData.OD.drScreening} onChange={(e) => handleRadioChange('OD', 'drScreening', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>

              <Typography variant="subtitle1"><strong>AMD</strong></Typography>
              <RadioGroup row value={formData.OD.amd} onChange={(e) => handleRadioChange('OD', 'amd', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>

              <Typography variant="subtitle1"><strong>Lesion Detection</strong></Typography>
              <Typography variant="body2">1. Accuracy of Lesion Location</Typography>
              <RadioGroup row value={formData.OD.lesionDetectionLocation} onChange={(e) => handleRadioChange('OD', 'lesionDetectionLocation', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>
              <Typography variant="body2">2. Accuracy of Lesion Type</Typography>
              <RadioGroup row value={formData.OD.lesionDetectionType} onChange={(e) => handleRadioChange('OD', 'lesionDetectionType', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>

              <Typography variant="subtitle1"><strong>Segmentation</strong></Typography>
              <Typography variant="body2">1. Accuracy of Segmentation Location</Typography>
              <RadioGroup row value={formData.OD.segmentationLocation} onChange={(e) => handleRadioChange('OD', 'segmentationLocation', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>
              <Typography variant="body2">2. Accuracy of Segmentation Type</Typography>
              <RadioGroup row value={formData.OD.segmentationType} onChange={(e) => handleRadioChange('OD', 'segmentationType', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>
            </>
          )}

          {/* OS Confirmations */}
          {resultData.some((eyeDataObj: any) => eyeDataObj.OS && Object.keys(eyeDataObj.OS).length > 0) && (
            <>
              <Typography variant="h6" gutterBottom>Left Eye (OS) Confirmations</Typography>

              <Typography variant="subtitle1"><strong>Glaucoma</strong></Typography>
              <RadioGroup row value={formData.OS.glaucoma} onChange={(e) => handleRadioChange('OS', 'glaucoma', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>

              <Typography variant="subtitle1"><strong>DR Screening</strong></Typography>
              <RadioGroup row value={formData.OS.drScreening} onChange={(e) => handleRadioChange('OS', 'drScreening', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>

              <Typography variant="subtitle1"><strong>AMD</strong></Typography>
              <RadioGroup row value={formData.OS.amd} onChange={(e) => handleRadioChange('OS', 'amd', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>

              <Typography variant="subtitle1"><strong>Lesion Detection</strong></Typography>
              <Typography variant="body2">1. Accuracy of Lesion Location</Typography>
              <RadioGroup row value={formData.OS.lesionDetectionLocation} onChange={(e) => handleRadioChange('OS', 'lesionDetectionLocation', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>
              <Typography variant="body2">2. Accuracy of Lesion Type</Typography>
              <RadioGroup row value={formData.OS.lesionDetectionType} onChange={(e) => handleRadioChange('OS', 'lesionDetectionType', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>

              <Typography variant="subtitle1"><strong>Segmentation</strong></Typography>
              <Typography variant="body2">1. Accuracy of Segmentation Location</Typography>
              <RadioGroup row value={formData.OS.segmentationLocation} onChange={(e) => handleRadioChange('OS', 'segmentationLocation', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>
              <Typography variant="body2">2. Accuracy of Segmentation Type</Typography>
              <RadioGroup row value={formData.OS.segmentationType} onChange={(e) => handleRadioChange('OS', 'segmentationType', parseInt(e.target.value))}>
                {renderRadioOptions()}
              </RadioGroup>
            </>
          )}

          {/* Comments */}
          <TextField
            label="Comment on accuracy"
            fullWidth
            multiline
            rows={3}
            value={formData.comments}
            onChange={(e) => setFormData((prevData:any) => ({ ...prevData, comments: e.target.value }))}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary" variant="contained">
            Submit Confirmation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DisplayResults;
