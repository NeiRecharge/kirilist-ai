function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    service: 'KiriList AI',
    message: 'Google Apps Script backend is active.'
  })).setMimeType(ContentService.MimeType.JSON);
}

function submitListing(payload) {
  const data = payload && typeof payload === 'object' ? payload : {};

  const row = [
    new Date(),
    data.productName || '',
    data.category || '',
    data.condition || '',
    data.location || '',
    data.targetPrice || '',
    data.age || '',
    data.delivery || '',
    data.notes || '',
    data.listingTitle || '',
    data.listingDescription || '',
    data.suggestedPrice || '',
    data.marketStatus || '',
  ];

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Listings');
  if (!sheet) {
    SpreadsheetApp.getActiveSpreadsheet().insertSheet('Listings');
    const newSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Listings');
    newSheet.appendRow([
      'Date',
      'Product Name',
      'Category',
      'Condition',
      'Location',
      'Target Price',
      'Age',
      'Delivery',
      'Notes',
      'Listing Title',
      'Listing Description',
      'Suggested Price',
      'Market Status',
    ]);
    newSheet.appendRow(row);
    return { success: true, message: 'Listing saved to Listings sheet.' };
  }

  sheet.appendRow(row);
  return { success: true, message: 'Listing saved to Listings sheet.' };
}

function doPost(e) {
  try {
    const payload = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const result = submitListing(payload);
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message,
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
