// game-characters.js
const { spawn } = require("child_process");
const path = require("path");

class GameCharacters {
  constructor(scriptFile = "game-characters-data.js") {
    this.scriptPath = path.join(__dirname, scriptFile);
  }

  getCharacters(callback) {
    const child = spawn("node", [this.scriptPath]);

    let data = "";
    let errorData = "";

    child.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      errorData += chunk.toString();
    });

    child.on("close", (code) => {
      if (errorData) {
        console.error("Error from script:", errorData);
        callback(errorData, null);
      } else {
        try {
          const parsed = JSON.parse(data);
          callback(null, parsed);
        } catch (parseError) {
          console.error("Failed to parse data:", parseError);
          callback(parseError, null);
        }
      }
    });

    child.on("error", (err) => {
      console.error("Failed to start child process:", err);
      callback(err, null);
    });
  }
}

module.exports = { GameCharacters };

