import fetch from "node-fetch";
import * as cheerio from "cheerio";

/**
 * Returns basic data about the author
 * @param username of Wattpad user
 * @returns User object
 */
export const getUser = async (username) => {
     const profileUrl = `https://www.wattpad.com/user/${username}`
      const res = await fetch(encodeURI(profileUrl));
      const html = await res.text();
      const $ = cheerio.load(html);

    let user = {
    username: username,
    avatar: $('.avatar').find('img').attr('src'),
    publishedStories: $('[data-id="profile-works"]').find('p').first().text(),
    followers: $('.followers-count').text(),
  };
  return user
};