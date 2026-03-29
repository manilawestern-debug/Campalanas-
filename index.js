const express = require("express");
const fetch = require("node-fetch");

const app = express();

// 🔑 PALITAN MO ITO
const PAGE_TOKEN = "PASTE_YOUR_PAGE_TOKEN_HERE";

// 📚 FACTS
const facts = [
  "Siquijor is called the Island of Fire ✨",
  "Octopus has 3 hearts 🐙",
  "Lightning is hotter than the sun ⚡",
  "Some turtles breathe through their butt 😳",
  "Siquijor is known for healing traditions 🌿"
];

// LOOP
let currentIndex = 0;

function getFactLoop() {
  const fact = facts[currentIndex];
  currentIndex++;
  if (currentIndex >= facts.length) currentIndex = 0;
  return fact;
}

// CAPTION
function getCaption(fact) {
  const styles = [
    `${fact}\n\nFollow for more 😎`,
    `😳 ${fact}\n\nDid you know this?`,
    `${fact}\n\nComment WOW 👇`,
    `🔥 ${fact}\n\nTag a friend!`
  ];
  return styles[Math.floor(Math.random() * styles.length)];
}

// IMAGE
function getImage() {
  const topics = ["nature","science","island","beach"];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  return `https://source.unsplash.com/800x600/?${topic}`;
}

// POST
async function postFact() {
  const fact = getFactLoop();
  const image = getImage();

  try {
    const res = await fetch(`https://graph.facebook.com/v18.0/me/photos?access_token=${PAGE_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: image,
        caption: getCaption(fact)
      })
    });

    const data = await res.json();
    console.log("Posted:", data);
  } catch (err) {
    console.error(err);
  }
}

// AUTO POST
function randomTime() {
  return Math.floor(Math.random() * (120 - 30 + 1) + 30) * 60000;
}

function startPosting() {
  setTimeout(async () => {
    await postFact();
    startPosting();
  }, randomTime());
}

startPosting();

app.get("/", (req, res) => {
  res.send("Bot running 🚀");
});

app.listen(3000, () => console.log("Running..."));
