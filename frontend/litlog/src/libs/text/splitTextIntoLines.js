export const splitTextIntoLines = (text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";
  
    words.forEach((word) => {
      if ((currentLine + word).length <= maxWidth) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
  
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  }