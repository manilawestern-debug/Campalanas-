const express = require("express");
const fetch = require("node-fetch");

const app = express();

// 🔑 PALITAN MO ITO
const PAGE_TOKEN = "EAAOng2iQznIBRKUKOgWaiYDXs9ZCRAaulPvTdtWYbI5FkBuLj7JWqVidBSahpClVvfadcU70g0Q0Gu3chxUpsLveIZBkfLTRspSsZB1XpFnIfRuIGhQ49fVqMjPEJAVZAHYYqZA4xRxK7RnqhoOiB21eEeiPrZA5aN7ZBRraSakIYEnCF9siILmFXSxZAfsr2efLiZCPG6UOv9BfAdFQIYXyI9areuq7yXwTgGhiMkNcZD";

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

  try {
    const res = await fetch(`https://graph.facebook.com/v18.0/me/feed?access_token=${PAGE_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: getCaption(fact)
      })
    });

    const data = await res.json();
    console.log("✅ Posted:", data);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

// AUTO POST
function randomTime() {
  return 60000; // 1 minute
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
