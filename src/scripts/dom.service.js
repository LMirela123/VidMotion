import sanitizeHtml from 'sanitize-html';

export const createDomElementsFromHtmlString = (htmlString) => {
  const temporaryDiv = document.createElement('div');
  temporaryDiv.innerHTML = htmlString.trim();
  return temporaryDiv.children[0];
};