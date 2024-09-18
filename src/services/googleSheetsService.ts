export const submitToGoogleSheets = async (data: { OD: string; OS: string; comments: string }) => {
    const googleSheetsUrl = "https://script.google.com/macros/s/AKfycbyIluVg7jae8cKaqZR3Rd6sqkFf_HaUKxYtLXafse4/exec"; // Replace with your Google Sheets Web App URL
  
    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to submit confirmation");
    }
  
    return response.json();
  };
  