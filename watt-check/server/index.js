import express from "express";

import cors from "cors";
import { getChapterStats, getChapters } from "./chapter.js";
import { getUser } from "./user.js";
import { getStory } from "./story.js";


const app = express();
app.use(cors({
  origin: ['https://watt-check.vercel.app', 'http://localhost:5173']
}))

app.options(/(.*)/, cors({
  origin: ['https://watt-check.vercel.app', 'http://localhost:5173']
}))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`API works on ${port} port`)
})

app.use(express.json());



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

    res.status(200).json(storyResponse);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// get user details
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

// get chapter details
app.post("/chapter", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Brakuje url" });
    }
    let chapterResponse = await getChapterStats(url);
    if (!chapterResponse || chapterResponse.length === 0) {
      return res.status(404).json({ error: "User details not found." });
    }
    res.status(200).json(chapterResponse);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

