// Select necessary elements from the DOM
const currentDateEL = $("#currentDay");
const saveBtnEl = $(".saveBtn");
const timeBlockEl = $(".time-block");

// Ensure DOM is fully loaded before running code
$(function () {
  // Display the current date in the header of the page
  currentDateEL.text(dayjs().format("dddd[,] MMMM, DD"));

  // Save button click event to save the description to local storage
  saveBtnEl.on("click", function () {
    const parentEl = $(this).closest(".time-block");
    const planId = parentEl.attr("id");
    const planDescription = parentEl.find(".description").val();
    savePlanToStorage(planId, planDescription);
  });

  // Save the plan to local storage
  function savePlanToStorage(planId, planDescription) {
    localStorage.setItem(planId, planDescription);
  }

  // Add the appropriate class to each time block based on the current time
  function addTenseClass() {
    timeBlockEl.each(function () {
      const blockTimeID = $(this).attr("id");
      const blockTimeHr = parseInt(blockTimeID.slice(5));
      const currentTimeHr = parseInt(dayjs().format("H"));

      if (blockTimeHr > currentTimeHr) {
        $(this).removeClass("past present").addClass("future");
      } else if (blockTimeHr === currentTimeHr) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("present future").addClass("past");
      }
    });
  }

  addTenseClass();

  // Retrieve user input saved in local storage and set the values of the corresponding textarea elements
  function getPlanFromStorage() {
    timeBlockEl.each(function () {
      const planId = $(this).attr("id");
      const savedDescription = localStorage.getItem(planId);
      if (savedDescription) {
        $(this).find(".description").text(savedDescription);
      }
    });
  }

  getPlanFromStorage();
});
