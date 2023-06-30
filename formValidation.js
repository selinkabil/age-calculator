var labels = document.getElementsByClassName("label");
var inputs = document.getElementsByClassName("input");
var warnings = document.getElementsByClassName("message");
var d = new Date();

function errorMessage(index, message) {
  inputs[index].style.outline = "1px solid var(--light-red)";
  labels[index].style.color = "var(--light-red)";
  warnings[index].style.display = "block";
  warnings[index].innerHTML = message;
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function calc() {
  var days = document.getElementById("days");
  var months = document.getElementById("months");
  var years = document.getElementById("years");

  if (days.value == 0) {
    errorMessage(0, "This field is required");
  } else {
    warnings[0].style.display = "none";
  }

  if (months.value == 0) {
    errorMessage(1, "This field is required");
  } else {
    warnings[1].style.display = "none";
  }

  if (years.value == 0) {
    errorMessage(2, "This field is required");
  } else if (years.value > d.getFullYear()) {
    errorMessage(2, "Must be in the past");
  } else {
    warnings[2].style.display = "none";
  }

  if (months.value > 12) {
    errorMessage(1, "Must be a valid month");
  } else {
    warnings[1].style.display = "none";
  }

  if (days.value > getDaysInMonth(years.value, months.value)) {
    errorMessage(0, "Must be a valid day");
  } else {
    warnings[0].style.display = "none";
  }

  if (
    days.value != 0 &&
    months.value != 0 &&
    years.value != 0 &&
    years.value <= d.getFullYear() &&
    months.value <= 12 &&
    days.value <= getDaysInMonth(years.value, months.value)
  ) {
    for (var i = 0; i < 3; i++) {
      inputs[i].style.outline = "1px solid var(--light-gray)";
      labels[i].style.color = "var(--smokey-gray)";
      warnings[i].style.display = "none";
    }

    var currentDate = d.getTime();
    var birthDate = new Date(
      years.value,
      months.value - 1,
      days.value
    ).getTime();
    var timeDiff = currentDate - birthDate;

    // Calculate the difference in years, accounting for leap years
    var secondsInYear = 365.25 * 24 * 60 * 60; // Average number of seconds in a year (including leap years)
    var yearsDiff = Math.floor(timeDiff / (1000 * secondsInYear));
    timeDiff -= yearsDiff * (1000 * secondsInYear);

    // Calculate the difference in months
    var monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    timeDiff -= monthsDiff * (1000 * 60 * 60 * 24 * 30);

    // Calculate the difference in days
    var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Display the results
    var answer = document.getElementsByClassName("answer");
    answer[0].innerHTML = yearsDiff;
    answer[1].innerHTML = monthsDiff;
    answer[2].innerHTML = daysDiff;
  }
  else{
    var answer = document.getElementsByClassName("answer");
    answer[0].innerHTML = "--";
    answer[1].innerHTML = "--";
    answer[2].innerHTML = "--";
  }
}