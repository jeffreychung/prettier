"use strict";

const escape = require("escape-string-regexp");

const DELIMITER_MAP = {
  "---": "yaml",
  "+++": "toml"
};

function parse(text) {
  const delimiterRegex = Object.keys(DELIMITER_MAP)
    .map(escape)
    .join("|");

  const match = text.match(
    new RegExp(`^(${delimiterRegex})\\n(?:([\\s\\S]*?)\\n)?\\1(\\n|$)`)
  );

  if (match === null) {
    return { frontMatter: null, content: text };
  }

  const raw = match[0].trimRight();
  const delimiter = match[1];
  const value = match[2];

  return {
    frontMatter: { type: DELIMITER_MAP[delimiter], value, raw },
    content: text.slice(raw.length)
  };
}

module.exports = parse;
