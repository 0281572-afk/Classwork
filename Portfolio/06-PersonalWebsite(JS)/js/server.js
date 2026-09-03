console.log("Running the script");

//change the format to the one used in the table
function getDayName(dateValue) {
    if (!dateValue) return ""; //no date, return empty space
    const dateParts = dateValue.split("-"); 
                            //year,          month,               day
    const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); //date object, in js months go from 0 to 11
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return days[dateObj.getDay()]; //returns number 0-6 to get the day name
}

//change the format to the one used in the table
function formatTime(timeStr) {
    if (!timeStr) return "";
    let [hours, minutes] = timeStr.split(":");
    hours = parseInt(hours, 10); //change to int
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`; //padStart makes sure hours have two digits
}

function createTableRow(data) {
    //checks busy or free
    const statusImg = data.isBusy ? "images/busy.png" : "images/free.png";
    const statusText = data.isBusy ? "(Busy)" : "(Free)";

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td align="center">
            <img src="${statusImg}" alt="${statusText}" width="20" valign="middle"> ${statusText}
            <span style="display:inline-block; width:12px; height:12px; background-color:${data.flagColor}; border-radius:50%; margin-left:5px;"></span>
        </td>
        <td>${getDayName(data.dateValue)}</td>
        <td>${formatTime(data.startValue)}</td>
        <td>${formatTime(data.endValue)}</td>
        <td>${data.activityValue}</td>
        <td>${data.placeValue}</td> 
        <td style="text-transform: capitalize;">${data.typeValue}</td>
        <td>${data.notesValue || "N/A"}</td> 
    `;
    return newRow;
}



document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".styled-form");
  const tableBody = document.querySelector("#schedule-table tbody");

  if (!form || !tableBody) return; //Exit if form or table body doesnt exist

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {                  //all found in index.html
      dateValue: document.getElementById("sched-date").value, //.value extracts content from input field
      typeValue: document.getElementById("sched-type").value,
      startValue: document.getElementById("sched-start").value,
      endValue: document.getElementById("sched-end").value,
      activityValue: document.getElementById("sched-activity").value,
      placeValue: document.getElementById("sched-place").value,
      flagColor: document.getElementById("sched-flag").value,
      isBusy: document.getElementById("sched-status").checked, //.checked returns true or false
      notesValue: document.getElementById("sched-notes").value
    };

    const newRow = createTableRow(formData);

    tableBody.appendChild(newRow); //insert the new row to the table body
    form.reset();
  });
});