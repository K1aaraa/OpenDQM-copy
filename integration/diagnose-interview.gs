// Add below your existing Code.gs, select diagnoseInterviewSetup, then click Run.
// Read-only: no records, credentials, spreadsheet IDs, or participant data are logged.
function diagnoseInterviewSetup() {
  const props = PropertiesService.getScriptProperties();
  const sheetId = props.getProperty("INTERVIEW_SHEET_ID");
  const tab = props.getProperty("INTERVIEW_TAB") || "Interview requests";
  console.log(
    "Correct spreadsheet configured: " +
      (sheetId === "1WI3xtbpIIAnGy4EcZjEB-5M25qkGPctGT5sZXRF9HdI")
  );
  console.log("Expected tab configured: " + (tab === "Interview requests"));
  console.log("Direct submission handler present: " + (typeof validInterview === "function"));
  try {
    const book = SpreadsheetApp.openById(sheetId);
    console.log("Spreadsheet access: OK");
    const sheet = book.getSheetByName(tab);
    if (!sheet) {
      console.log("STOP: Configured tab was not found. Check the bottom-tab name.");
      return;
    }
    console.log("Configured tab found: YES");
    if (sheet.getLastRow() === 0) {
      console.log("Tab is empty: headers will be created on first submission.");
    } else {
      const expected = [
        "submitted_at",
        "first_name",
        "last_name",
        "professional_background",
        "linkedin",
        "email",
        "preferred_interview_times",
        "timezone",
        "interest_reason",
        "source"
      ];
      const headers = sheet.getRange(1, 1, 1, expected.length).getValues()[0];
      const mismatches = expected
        .map(function (name, index) {
          return headers[index] === name
            ? ""
            : "Column " + String.fromCharCode(65 + index) + " needs heading: " + name;
        })
        .filter(Boolean);
      console.log(
        mismatches.length ? "Header mismatch: " + mismatches.join("; ") : "Column headings: OK"
      );
    }
    console.log("Diagnostic finished. No rows were changed.");
  } catch (error) {
    console.log(
      "STOP: Cannot access the spreadsheet. Check the ID and that your deployment account has editor access. No rows were changed."
    );
    throw error;
  }
}
