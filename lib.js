const axios = require("axios")

exports.getLifeProTip = async function() {
  const response = await axios.get("https://www.reddit.com/r/LifeProTips/top.json?limit=20")
  const posts = response.data.data.children

  // Ignore LifeProTips Requests
  const requestRegex = /request/g
  let randomLPT
  do {
    const i = Math.floor(Math.random() * posts.length);
    randomLPT = posts[i]
  } while (requestRegex.exec(randomLPT.data.title));

  let { title } = randomLPT.data
  const words = title.split(" ")

  // Try to deal with people using weird formatting 
  // -> not having a space between "LPT:" and their content)
  // usually people write "LPT" and the some special char like : or -
  const weirdFormat = /.*(:|-|]|\))[^ ]/i // There is no space directly after : - ] )
  if (weirdFormat.exec(words[0])) {
    console.log("weird formatting: " + words.slice(0,3).join(" "))
    words[0] = words[0].substring(4)
    title = words.join(" ")
  } else {
    // Normal case
    title = words.slice(1).join(" ")
  }

  return title
}