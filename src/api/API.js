export const loadVaccineData = (pincode) => {

  const date = getCurrentDate();

  // Fetching data from Api
  return fetch(
    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((response) => {
      return response.sessions;
    })
    .catch((error) => console.error(error));
};

// A utility function to get current date in required format
function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  // 
  return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`;
}
