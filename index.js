const tags = ["b", "i", "color", "size"];

const MIN = 0x4e;
const MAX = 0x9f;

function randomOffset() {
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

/**
 * 
 * @param {string} input 
 */
function uglify(input) {
  let result = "";
  for (const ch of input) {
    const codepoint = ch.codePointAt(0) ?? 0;
    result += String.fromCodePoint(codepoint | (randomOffset() << 8));
  }
  return result;
}

/**
 * 
 * @param {SubmitEvent} e 
 */
function generate(e) {
  e.preventDefault();
  const data = new FormData(document.querySelector("#form"));
  const tags = data.getAll("tag");
  const { colorValue, sizeValue, text } = Object.fromEntries(data.entries());
  let result = text;
  for (const tag of tags) {
    let openTag = `<${uglify(tag)}`;
    if (tag === "color") {
      openTag += `=${colorValue}>`; 
    } else if (tag === "size") {
      openTag += `=${sizeValue}>`;
    } else {
      openTag += ">";
    }
    const closeTag = `</${uglify(tag)}>`;
    result = `${openTag}${result}${closeTag}`;
  }
  document.querySelector("#output").textContent = result;
}

document.querySelector("#form").addEventListener("submit", generate);