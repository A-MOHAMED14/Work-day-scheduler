// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const currentDateEL = $("#currentDay");
const saveBtnEl = $(".saveBtn");
const textareaEl = $(".description");
const timeBlockEl = $(".time-block");

$(function () {
  // TODO: Add code to display the current date in the header of the page.
  // FORMAT: Monday, December 14th
  currentDateEL.text(dayjs().format("dddd[,] MMMM, DD"));

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  saveBtnEl.on("click", function () {
    const parentEl = $(this).closest(".time-block");
    const plandId = parentEl.attr("id");
    const planDescription = parentEl.find(".description").val();

    // console.log(parentEl, "<-----");
    // console.log(plandId, "<-----");
    // console.log(planDescription, "<-----");

    savePlanToStorage(plandId, planDescription);
  });

  function savePlanToStorage(plandId, planDescription) {
    console.log(plandId, planDescription);
    localStorage.setItem(plandId, planDescription);
  }

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

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

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function getPlanFromStorage() {
    timeBlockEl.each(function () {
      const planId = $(this).attr("id");
      const savedDescription = localStorage.getItem(planId);
      console.log(planId, ":", savedDescription);
      if (savedDescription) {
        $(this).find(".description").val(savedDescription);
      }
    });
  }

  // localStorage.clear();
  console.log(localStorage);

  getPlanFromStorage();
});
