export const getJsonFromLocalStorage = (key) => {
  // Retrieve the stringified JSON from local storage
  var jsonString = localStorage.getItem(key);

  // Check if JSON string exists
  if (jsonString !== null) {
    // Parse the JSON string into a JavaScript object
    var jsonObject = JSON.parse(jsonString);

    // Return the parsed JSON object
    return jsonObject;
  } else {
    // JSON string does not exist
    console.log(
      "No JSON object found in local storage for the specified key:",
      key
    );
    return null;
  }
};
