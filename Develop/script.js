// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const currentDateEL = $("#currentDay");
const saveBtnEl = $(".saveBtn");
const textareaEl = $(".description");
const timeBlockEl = $(".time-block");

$(function () {
  currentDateEL.text(dayjs().format("dddd[,] MMMM, DD"));

  saveBtnEl.on("click", function () {
    const parentEl = $(this).closest(".time-block");
    const plandId = parentEl.attr("id");
    const planDescription = parentEl.find(".description").val();

    savePlanToStorage(plandId, planDescription);
  });

  function savePlanToStorage(plandId, planDescription) {
    console.log(plandId, planDescription);
    localStorage.setItem(plandId, planDescription);
  }

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

  function getPlanFromStorage() {
    timeBlockEl.each(function () {
      const planId = $(this).attr("id");
      const savedDescription = localStorage.getItem(planId);
      console.log(planId, ":", savedDescription);
      if (savedDescription) {
        $(this).find(".description").text(savedDescription);
      }
    });
  }

  getPlanFromStorage();
});
