export const removeTags = (description) => {
  const htmlString = description.replace(/\\u003c/g, "<").replace(/\\u003e/g, ">");
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  let textContent = doc.body.innerHTML || "";

  // &nbsp; 제거
  textContent = textContent.replace(/\u00a0/g, " ").replace(/&nbsp;/g, " ");

  // <p> 태그를 줄바꿈으로 변환
  textContent = textContent.replace(/<p>/g, "").replace(/<\/p>/g, "\n");
  
  // 연속된 \n을 하나의 \n으로 변환
  textContent = textContent.replace(/\n{2,}/g, "\n");

  return textContent.trim();
};
