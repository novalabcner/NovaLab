function translateArticle_(documentId, articleId, title) {
  if (!bool_(prop_('GEMINI_ENABLED'))) return null;
  const apiKey = prop_('GEMINI_API_KEY');
  if (!apiKey) { console.warn('Gemini translation skipped: GEMINI_API_KEY is missing'); return null; }
  const source = readDocumentPlainText_(documentId);
  if (!source) { console.warn('Gemini translation skipped: Romanian document is empty'); return null; }
  const model = prop_('GEMINI_MODEL') || NOVALAB_CONFIG.DEFAULT_GEMINI_MODEL;
  const prompt = `Translate this public Romanian NovaLab article into natural English.
Preserve meaning, headings, sections, scientific terminology, formulas, names, citations and references.
Do not add, remove or invent facts. Do not translate the name NovaLab or the slogan Science without boundaries.
Return only the English article text:

${source}`;
  try {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(apiKey);
    const response = UrlFetchApp.fetch(url, {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      payload: JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.1}})
    });
    const status = response.getResponseCode();
    if (status < 200 || status >= 300) throw new Error('Gemini request failed with HTTP ' + status);
    const result = JSON.parse(response.getContentText());
    const translated = result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts
      ? result.candidates[0].content.parts.map(function(p){return p.text||'';}).join('\n') : '';
    if (!translated) throw new Error('Gemini returned an empty translation');
    const folder = getOrCreateFolder_(NOVALAB_CONFIG.FOLDERS.ENGLISH);
    const doc = DocumentApp.create(articleId + ' - EN - ' + text_(title));
    DriveApp.getFileById(doc.getId()).moveTo(folder);
    doc.getBody().setText(translated);
    doc.saveAndClose();
    return {id:doc.getId(),url:'https://docs.google.com/document/d/' + doc.getId() + '/edit'};
  } catch (error) {
    console.error('Translation failed for ' + articleId + ': ' + error.message);
    return null;
  }
}
