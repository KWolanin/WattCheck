import express from "express";
import WattpadScraper from "../custom-libs/wattpad-scraper/src/index.js";
import WattPads from "../custom-libs/@dhnapi/wattpad.js/src/wattpad.js";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

import cors from "cors";

let wattpad = new WattPads();

const app = express();
// const PORT = 3000;
import cors from 'cors'
app.use(cors({
  origin: 'https://watt-check.vercel.app'
}))

app.use(express.json());
// app.use(
//   cors({
//     origin: "watt-check.vercel.app:5173",
//   })
// );

// app.use(cors({
//   origin: "*", // Możesz zmienić na konkretną domenę np. "https://watt-check.vercel.app"
//   methods: ["GET", "POST", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"]
// }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });




const scraper = new WattpadScraper();

// app.listen(PORT, () => {
//   console.log(`Serwer działa na http://localhost:${PORT}`);
// });

app.get("/test", () => {
  return "uwuu"
})

// Get Story general details
app.post("/story", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Brakuje url" });
    }
    const storyResponse = await getStory(url);
    if (!storyResponse || storyResponse.length === 0) {
      return res.status(404).json({ error: "Story details not found." });
    }

    storyResponse.chapters = await getChapters(url);

/*     for (const chapter of storyResponse.chapters) {
      chapter.stats = await getChapterDetails(chapter.link);
    } */

    res.status(200).json(storyResponse);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Story Chapters titles, links and dates
async function getChapters(url) {
  try {
    const parts = await scraper.getParts(url);
    return parts;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

const getStory = async function (url) {
  return new Promise((resolve, reject) => {
    wattpad.detail(
      (error, response) => {
        if (error) {
          console.error(error.stack);
          return reject(error);
        }
        resolve(response);
      },
      {
        detail: url,
      }
    );
  });
};

app.post("/user", async (req, res) => {
  try {
    const { user } = req.body;
    if (!user) {
      return res.status(400).json({ error: "Brakuje url" });
    }
    let userResponse = await getUser(user);
    if (!userResponse || userResponse.length === 0) {
      return res.status(404).json({ error: "User details not found." });
    }
    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

const getUser = async (user) => {
  return new Promise((resolve, reject) => {
    wattpad.userMetadata(
      user,
      function (error, response, options) {
        if (error) return reject(error);
        resolve(response);
      },
      {
        detail: user,
      }
    );
  });
};

app.post("/chapter", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Brakuje url" });
    }
    let chapterResponse = await getChapterDetails(url);
    if (!chapterResponse || chapterResponse.length === 0) {
      return res.status(404).json({ error: "User details not found." });
    }
    res.status(200).json(chapterResponse);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

const getChapterDetails = async (url) => {
  try {
    const res = await fetch(url);
    const html = await res.text();

    const $ = cheerio.load(html);
    const matchingDivs = $(`div.story-stats`);

    let rawText = "";
    matchingDivs.each((i, el) => {
      rawText += $(el).text();
    });

    const cleaned = rawText.replace(/\s+/g, " ").trim();
    const matches = cleaned.match(/[\d.,]+[KkMm]?/g) || [];

    const parseNumber = (str) => {
      if (str.toLowerCase().includes("k")) {
        return parseFloat(str) * 1000;
      }
      if (str.toLowerCase().includes("m")) {
        return parseFloat(str) * 1_000_000;
      }
      return parseInt(str.replace(/[^\d]/g, ""), 10);
    };

    return {
      views: parseNumber(matches[0] || "0"),
      stars: parseNumber(matches[1] || "0"),
      comments: parseNumber(matches[2] || "0"),
    };
  } catch (err) {
    console.error("Błąd podczas scrapowania:", err);
    return { views: 0, stars: 0, comments: 0 };
  }
};

export const handler = serverless(app)
