export const submitToGoogleSheets = async (data: any) => {
  const googleSheetsUrl = "https://script.google.com/macros/s/AKfycbwkRGLBC1sWdae58LNUDLzNI2075YdOekxjx53Gar_bzoMu0e47mdIY53EnNTvueR8d/exec"; // Replace with your actual URL
  
  try {
    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(data),
    });
    return  response;
  } catch (error) {
    console.error("Error submitting to Google Sheets: ", error);
    throw error;
  }
};
