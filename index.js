import fetch from "node-fetch";
import prompt from "prompt-sync";
const con = prompt();

// Function that returns a random 8character long string
function genCode() {
  return Math.random().toString(36).substr(2, 8);
}

const code = genCode();
const Topic = "RoknosTestNotification";

function sendNotification() {
  return new Promise(async (resolve, reject) => {
    await fetch("https://ntfy.sh", {
      method: "Post",
      body: JSON.stringify({
        topic: `${Topic}`,
        title: `Your 2FA code`,
        message: `The code is ${code}`,
      }),
    });
    resolve("Notification sent!");
  });
}

sendNotification().then((res) => {
  const codeInput = con("What is the code? ");
  // Check if the code is correct
  if (codeInput === code) {
    console.log("Correct!");
  } else {
    console.log("Incorrect!");
  }
});
