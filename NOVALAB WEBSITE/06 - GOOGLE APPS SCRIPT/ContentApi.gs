function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const resource = text_(params.resource || 'pages').toLowerCase();
    const lang = text_(params.lang || 'ro').toLowerCase();
    if (lang !== 'ro' && lang !== 'en') return json_({error:true,message:'Invalid language'});

    const names = {pages:'Pages',articles:'Articles',events:'Events',team:'Team',disciplines:'Disciplines',projects:'Projects'};
    if (!names[resource]) return json_({error:true,message:'Unknown resource'});

    let rows = readPublicRows_(names[resource]);
    const id = text_(params.id);
    const slug = text_(params.slug);

    if (resource === 'articles') rows = rows.map(function(row) { return publicArticle_(row,lang); }).filter(function(row) { return row.published === true; });
    if (resource === 'events') rows = rows.map(function(row) { return publicEvent_(row); });
    if (resource === 'pages') rows = rows.map(function(row) { return publicPage_(row,lang); });
    if (resource === 'team') rows = rows.map(function(row) { return publicTeam_(row); });
    if (resource === 'disciplines') rows = rows.map(function(row) { return publicDiscipline_(row); });
    if (resource === 'projects') rows = rows.map(function(row) { return publicProject_(row); });

    if (id || slug) {
      const item = rows.find(function(row) {
        if (resource === 'articles') return text_(row.article_id) === (id||slug) || text_(row.slug) === slug;
        if (resource === 'events') return text_(row.event_id) === (id||slug) || text_(row.slug) === slug;
        return text_(row.id) === (id||slug) || text_(row.page_id) === (id||slug) || text_(row.member_id) === (id||slug) || text_(row.project_id) === (id||slug);
      }) || null;
      return json_({resource:resource,item:item});
    }
    return json_({resource:resource,items:rows});
  } catch (error) {
    console.error('Public API failed: ' + error.message);
    return json_({error:true,message:'Content is temporarily unavailable'});
  }
}

function readPublicRows_(sheetName) {
  const spreadsheetId = prop_('SPREADSHEET_ID');
  if (!spreadsheetId) throw new Error('SPREADSHEET_ID is not configured');
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(text_);
  const rows = values.slice(1).filter(function(row) { return row.some(function(v) { return v !== '' && v !== null; }); }).map(function(row) {
    const obj = {};
    headers.forEach(function(h,i) { obj[h] = row[i] instanceof Date ? row[i].toISOString() : row[i] === null ? '' : row[i]; });
    return obj;
  });

  if (sheetName === 'Articles') return rows.filter(function(r) { return bool_(r.published); });
  if (sheetName === 'Events') return rows.filter(function(r) { return bool_(r.published); });
  if (sheetName === 'Pages') return rows.filter(function(r) { return bool_(r.published); });
  if (sheetName === 'Team') return rows.filter(function(r) { return bool_(r.active); });
  if (sheetName === 'Projects') return rows.filter(function(r) { return bool_(r.active); });
  if (sheetName === 'Disciplines') return rows.filter(function(r) { return bool_(r.active); });
  return rows;
}

function publicArticle_(row,lang) {
  const englishAllowed = bool_(row.english_reviewed);
  const ro = readDocumentBlocks_(row.document_id);
  const en = lang === 'en' && englishAllowed ? readDocumentBlocks_(row.english_document_id) : {blocks:[]};
  return {
    article_id:text_(row.article_id),title:text_(row.title),slug:text_(row.slug),author:text_(row.author),discipline:text_(row.discipline),article_type:text_(row.article_type),
    summary:text_(row.summary),cover_image:text_(row.cover_image),created_at:text_(row.created_at),updated_at:text_(row.updated_at),published:true,
    seo_title:text_(row.seo_title),seo_description:text_(row.seo_description),english_reviewed:englishAllowed,
    content_ro:ro,content_en:englishAllowed && lang === 'en' ? en : {blocks:[]}
  };
}

function publicEvent_(row) {
  return {
    event_id:text_(row.event_id),title:text_(row.title),slug:text_(row.slug),discipline:text_(row.discipline),event_type:text_(row.event_type),
    short_description:text_(row.short_description),full_description:text_(row.full_description),organizer:text_(row.organizer),
    start_datetime:text_(row.start_datetime),end_datetime:text_(row.end_datetime),timezone:text_(row.timezone)||'Europe/Bucharest',venue:text_(row.venue),address:text_(row.address),
    registration_url:text_(row.registration_url),cover_image:text_(row.cover_image),published:true
  };
}

function publicTeam_(row) {
  return {member_id:text_(row.member_id),name:text_(row.name),position_ro:text_(row.position_ro),position_en:text_(row.position_en),biography_ro:text_(row.biography_ro),biography_en:text_(row.biography_en),photo_url:text_(row.photo_url),display_order:text_(row.display_order),active:true};
}
function publicDiscipline_(row) {
  return {discipline_id:text_(row.discipline_id),name_ro:text_(row.name_ro),name_en:text_(row.name_en),description_ro:text_(row.description_ro),description_en:text_(row.description_en),cover_image:text_(row.cover_image),accent_color:text_(row.accent_color),display_order:text_(row.display_order),active:true};
}
function publicProject_(row) {
  return {project_id:text_(row.project_id),title_ro:text_(row.title_ro),title_en:text_(row.title_en),description_ro:text_(row.description_ro),description_en:text_(row.description_en),category:text_(row.category),image_url:text_(row.image_url),slug:text_(row.slug),active:true};
}

function publicPage_(row,lang) {
  const ro = readDocumentBlocks_(row.ro_document_id); const en = readDocumentBlocks_(row.en_document_id);
  return {page_id:text_(row.page_id),page_name:text_(row.page_name),content_ro:ro,content_en:lang==='en'?en:{blocks:[]}};
}

function testPublicContentWithMockData_() {
  const article = publicArticle_({article_id:'article-test',title:'Articol test',slug:'articol-test',document_id:'',published:'TRUE',english_reviewed:'FALSE',cover_image:''},'ro');
  if (!article.article_id || article.english_reviewed !== false) throw new Error('Mock article validation failed');
  const event = publicEvent_({event_id:'event-test',title:'Eveniment test',slug:'eveniment-test',timezone:'Europe/Bucharest'});
  if (event.timezone !== 'Europe/Bucharest') throw new Error('Mock event validation failed');
  return {article:article,event:event};
}
