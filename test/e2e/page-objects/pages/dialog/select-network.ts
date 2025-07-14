(function() {
  const input = prompt("Enter a string: ");
  if (input === "test") {
    console.log("Test");
  } else if (input === "console") {
    console.log(this);
  } else {
    console.log("Invalid input");
  })();
