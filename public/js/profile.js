
// Depending on the time - different message

  const todayFullDate = new Date();
  timeDifferentGreetings(todayFullDate.getHours());

function timeDifferentGreetings(hour) {
  const greeting = document.querySelector("#greetings");

  switch (true) {
    case hour < 6 :
      greeting.textContent = "Go to bed 😴 ";
      break;
    case hour > 6 && hour < 12:
      greeting.textContent = "Rise and shine ✨ ";
      break;
    case hour >= 12 && hour < 18:
      greeting.textContent = "Good afternoon ☀️ ";
      break;
    case hour < 23:
      greeting.textContent = "Evening 🌘 ";
      break;
  }
}

//https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
