export const convertMarkdownToJson = (markdown: string) => {
    if(!markdown || typeof markdown !== "string") {
        return {};
    }

    if (markdown.startsWith("```json")) {
        const notes = markdown
          .replace(/^```json\s*/, "")
          .replace(/\s*```$/, "");
        return JSON.parse(notes.trim());
      } else if (markdown.startsWith("```")) {
        const notes = markdown.replace(/^```\s*/, "").replace(/\s*```$/, "");
        return JSON.parse(notes.trim());
      }
    return {};
};