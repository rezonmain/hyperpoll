import sanitize from "sanitize-html";

const sanitizeHtml = (html: string) =>
  sanitize(html, { allowedTags: ["em", "strong"] });

export { sanitizeHtml };
