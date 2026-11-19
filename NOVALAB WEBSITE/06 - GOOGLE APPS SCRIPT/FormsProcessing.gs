function onArticleSubmit(e) { try { processArticleSubmission_(e); } catch (error) { console.error('Article submission failed: ' + error.message); } }
function onEventSubmit(e) { try { processEventSubmission_(e); } catch (error) { console.error('Event submission failed: ' + error.message); } }

function getSpreadsheet_() { const id=prop_('SPREADSHEET_ID'); if(!id)throw new Error('SPREADSHEET_ID is missing'); return SpreadsheetApp.openById(id); }
function itemMap_(response) { const map={};response.getItemResponses().forEach(function(i){map[text_(i.getItem().getTitle())]=i.getResponse();});return map; }
function responseId_(response) { return response && response.getId ? response.getId() : uniqueId_('response'); }
function rawProcessed_(sheetName,id) {
  const sh=getSpreadsheet_().getSheetByName(sheetName); if(!sh||sh.getLastRow()<2)return false;
  const headers=sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0],idCol=headers.indexOf('response_id'),statusCol=headers.indexOf('status');
  if(idCol<0||statusCol<0)return false;
  const values=sh.getDataRange().getValues();
  return values.slice(1).some(function(row){return text_(row[idCol])===text_(id)&&text_(row[statusCol]).toLowerCase()==='processed';});
}
function appendRaw_(sheetName,id,email,payload) {
  const sh=getSpreadsheet_().getSheetByName(sheetName); if(!sh)throw new Error('Missing raw response sheet');
  const values=sh.getDataRange().getValues();
  if(values.length>1){
    const headers=values[0], idCol=headers.indexOf('response_id');
    if(idCol>=0 && values.slice(1).some(function(row){return text_(row[idCol])===text_(id);})) return;
  }
  const record={timestamp:new Date(),response_id:id,respondent_email:email,raw_payload:JSON.stringify(payload),status:'pending',record_id:'',error:''};
  appendRowByHeaders_(sheetName,record);
}
function processArticleSubmission_(e) {
  return withLock_(function(){
    const response=e.response;if(!response)return;
    const id=responseId_(response); if(articleResponseProcessed_(id)) return;
    const data=itemMap_(response),email=text_(response.getRespondentEmail());
    appendRaw_('RAW ARTICLE RESPONSES',id,email,data);
    try {
      markRawProcessing_('RAW ARTICLE RESPONSES',id);
      const title=text_(data['Titlul articolului']||data['Article title']); if(!title)throw new Error('Article title is missing');
      const discipline=NOVALAB_CONFIG.DISCIPLINE_MAP[text_(data['Disciplină']||data['Discipline'])]||'';
      if(NOVALAB_CONFIG.DISCIPLINES.indexOf(discipline)<0)throw new Error('Invalid discipline');
      const articleId=stableResponseId_('article',id),now=new Date();
      const existingDoc=findDocumentByPrefix_(NOVALAB_CONFIG.FOLDERS.ARTICLES,articleId);
      const doc=existingDoc||createArticleDocument_({
        articleId:articleId,title:title,author:text_(data.Autor||data.Author),discipline:discipline,
        summary:text_(data['Rezumat scurt']||data['Short summary']),introduction:text_(data.Introducere||data.Introduction),
        section1Heading:text_(data['Titlul secțiunii 1']||data['Section 1 heading']),section1Content:text_(data['Conținutul secțiunii 1']||data['Section 1 content']),
        section2Heading:text_(data['Titlul secțiunii 2']||data['Section 2 heading']),section2Content:text_(data['Conținutul secțiunii 2']||data['Section 2 content']),
        section3Heading:text_(data['Titlul secțiunii 3']||data['Section 3 heading']),section3Content:text_(data['Conținutul secțiunii 3']||data['Section 3 content']),
        conclusion:text_(data.Concluzie||data.Conclusion),references:text_(data['Surse și referințe']||data['Sources and references'])
      });
      const coverId=uploadIds_(data['Imagine principală (copertă)']||data['Cover image'])[0]||'';
      const additionalIds=uploadIds_(data['Imagini suplimentare']||data['Additional images']);
      const privateCover=coverId?organizePrivateImage_(coverId,NOVALAB_CONFIG.FOLDERS.ARTICLE_IMAGES,articleId+'-cover'):'';
      additionalIds.forEach(function(fileId,index){organizePrivateImage_(fileId,NOVALAB_CONFIG.FOLDERS.ARTICLE_IMAGES,articleId+'-image-'+(index+1));});
      const translation=translateArticle_(doc.getId(),articleId,title);
      const record={article_id:articleId,title:title,slug:slug_(title),author:text_(data.Autor||data.Author),discipline:discipline,
        article_type:text_(data['Tipul articolului']||data['Article type']),summary:text_(data['Rezumat scurt']||data['Short summary']),
        document_id:doc.getId(),document_url:'https://docs.google.com/document/d/'+doc.getId()+'/edit',cover_image:'',cover_image_id:privateCover,
        additional_image_ids:additionalIds.join(','),created_at:new Date(),updated_at:new Date(),published:false,
        english_document_id:translation?translation.id:'',english_document_url:translation?translation.url:'',english_reviewed:false,seo_title:'',seo_description:'',submission_response_id:id};
      appendRowByHeaders_('Articles',record); markRawProcessed_('RAW ARTICLE RESPONSES',id,articleId);
    } catch(error) {
      markRawFailed_('RAW ARTICLE RESPONSES',id,error.message);
      console.error('Article submission processing failed: '+error.message);
    }
  });
}

function organizePrivateImage_(fileId,folderName,name) {
  try {
    const file=DriveApp.getFileById(fileId);
    const folder=getOrCreateFolder_(folderName);
    const source=file.getName(); const dot=source.lastIndexOf('.');
    const extension=dot>0?source.substring(dot):'';
    file.setName(name+extension); file.moveTo(folder);
    return file.getId();
  } catch(error) {
    console.error('Private image organization failed: '+error.message);
    return '';
  }
}

function appendRowByHeaders_(sheetName,record) {
  const sheet=getSpreadsheet_().getSheetByName(sheetName);
  if(!sheet) throw new Error('Missing sheet: '+sheetName);
  const headers=sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const row=headers.map(function(header){return record[header]===undefined?'':record[header];});
  sheet.appendRow(row);
}

function articleResponseProcessed_(responseId) {
  const sheet=getSpreadsheet_().getSheetByName('Articles');
  if(!sheet||sheet.getLastRow()<2)return false;
  const headers=sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const col=headers.indexOf('submission_response_id');
  if(col<0)return false;
  const values=sheet.getRange(2,col+1,Math.max(0,sheet.getLastRow()-1),1).getValues();
  return values.some(function(row){return text_(row[0])===text_(responseId);});
}

function markRawProcessing_(sheetName,responseId) {
  const sheet=getSpreadsheet_().getSheetByName(sheetName); if(!sheet)return;
  const headers=sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const idCol=headers.indexOf('response_id')+1, statusCol=headers.indexOf('status')+1;
  if(idCol<1||statusCol<1)return;
  const values=sheet.getRange(2,idCol,Math.max(0,sheet.getLastRow()-1),1).getValues();
  for(let i=0;i<values.length;i++) if(text_(values[i][0])===text_(responseId)) sheet.getRange(i+2,statusCol).setValue('processing');
}

function markRawProcessed_(sheetName,responseId,recordId) {
  const sheet=getSpreadsheet_().getSheetByName(sheetName); if(!sheet)return;
  const headers=sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const idCol=headers.indexOf('response_id')+1,statusCol=headers.indexOf('status')+1,recordCol=headers.indexOf('record_id')+1;
  const values=sheet.getRange(2,idCol,Math.max(0,sheet.getLastRow()-1),1).getValues();
  for(let i=0;i<values.length;i++) if(text_(values[i][0])===text_(responseId)) {if(statusCol>0)sheet.getRange(i+2,statusCol).setValue('processed');if(recordCol>0)sheet.getRange(i+2,recordCol).setValue(recordId);}
}

function markRawFailed_(sheetName,responseId,message) {
  const sheet=getSpreadsheet_().getSheetByName(sheetName); if(!sheet)return;
  const headers=sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const idCol=headers.indexOf('response_id')+1,statusCol=headers.indexOf('status')+1,errorCol=headers.indexOf('error')+1;
  const values=sheet.getRange(2,idCol,Math.max(0,sheet.getLastRow()-1),1).getValues();
  for(let i=0;i<values.length;i++) if(text_(values[i][0])===text_(responseId)) {if(statusCol>0)sheet.getRange(i+2,statusCol).setValue('failed');if(errorCol>0)sheet.getRange(i+2,errorCol).setValue(text_(message).slice(0,500));}
}

function publishArticle_(articleId) { publishImageFromSheet_('Articles','article_id','cover_image_id',articleId); }
function publishEvent_(eventId) { publishImageFromSheet_('Events','event_id','cover_image_id',eventId); }
function publishImageFromSheet_(sheetName,idHeader,idValue,fileIdHeader) {
  const sheet=getSpreadsheet_().getSheetByName(sheetName); if(!sheet)return;
  const headers=sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const idCol=headers.indexOf(idHeader),fileCol=headers.indexOf(fileIdHeader),publicCol=headers.indexOf('cover_image');
  if(idCol<0||fileCol<0||publicCol<0)return;
  const values=sheet.getDataRange().getValues();
  const publishedCol=headers.indexOf('published');
  for(let r=1;r<values.length;r++) if(text_(values[r][idCol])===text_(idValue)) {
    if(publishedCol>=0 && !bool_(values[r][publishedCol])) return;
    const fileId=text_(values[r][fileCol]);
    if(fileId) {try{const file=DriveApp.getFileById(fileId);file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);sheet.getRange(r+1,publicCol+1).setValue('https://drive.google.com/uc?export=view&id='+fileId);}catch(error){console.error('Image publication failed for '+idValue+': '+error.message);}}
  }
}

function processEventSubmission_(e) {
  return withLock_(function(){
    const response=e.response;if(!response)return;
    const id=responseId_(response); if(eventResponseProcessed_(id))return;
    const data=itemMap_(response),email=text_(response.getRespondentEmail());appendRaw_('RAW EVENT RESPONSES',id,email,data);
    try {
      markRawProcessing_('RAW EVENT RESPONSES',id);
      const title=text_(data['Titlul evenimentului']||data['Event title']);if(!title)throw new Error('Event title is missing');
      const discipline=NOVALAB_CONFIG.DISCIPLINE_MAP[text_(data['Disciplină']||data['Discipline'])]||'';
      if(NOVALAB_CONFIG.DISCIPLINES.indexOf(discipline)<0)throw new Error('Invalid discipline');
      const eventId=stableResponseId_('event',id),now=new Date(),timezone='Europe/Bucharest',start=iso_(data['Data început']||data['Start date'],data['Ora început']||data['Start time']),end=iso_(data['Data sfârșit']||data['End date'],data['Ora sfârșit']||data['End time']);
      const coverId=uploadIds_(data['Imagine principală (copertă)']||data['Cover image'])[0]||'';
      const additionalIds=uploadIds_(data['Imagini suplimentare']||data['Additional images']);
      const privateCover=coverId?organizePrivateImage_(coverId,NOVALAB_CONFIG.FOLDERS.EVENT_IMAGES,eventId+'-cover'):'';
      additionalIds.forEach(function(fileId,index){organizePrivateImage_(fileId,NOVALAB_CONFIG.FOLDERS.EVENT_IMAGES,eventId+'-image-'+(index+1));});
      const event={eventId:eventId,title:title,discipline:discipline,shortDescription:text_(data['Descriere scurtă']||data['Short description']),fullDescription:text_(data['Descriere completă']||data['Full description']),organizer:text_(data.Organizator||data.Organizer),startDatetime:start,endDatetime:end,timezone:timezone,venue:text_(data.Locație||data.Venue),address:text_(data.Adresă||data.Address),registrationUrl:text_(data['Link înscriere']||data['Registration link']),contact:text_(data.Contact||data['Contact information']),coverImage:''};
      const existingDoc=findDocumentByPrefix_(NOVALAB_CONFIG.FOLDERS.EVENTS,eventId);
      const doc=existingDoc||createEventDocument_(event);
      appendRowByHeaders_('Events',{event_id:eventId,title:title,slug:slug_(title),discipline:discipline,event_type:text_(data['Tipul evenimentului']||data['Event type']),short_description:text_(data['Descriere scurtă']||data['Short description']),full_description:text_(data['Descriere completă']||data['Full description']),organizer:text_(data.Organizator||data.Organizer),start_datetime:start,end_datetime:end,timezone:timezone,venue:text_(data.Locație||data.Venue),address:text_(data.Adresă||data.Address),registration_url:text_(data['Link înscriere']||data['Registration link']),contact:text_(data.Contact||data['Contact information']),cover_image:'',cover_image_id:privateCover,additional_image_ids:additionalIds.join(','),document_id:doc.getId(),created_at:now,updated_at:now,published:false,submission_response_id:id});
      markRawProcessed_('RAW EVENT RESPONSES',id,eventId);
    } catch(error) { markRawFailed_('RAW EVENT RESPONSES',id,error.message); console.error('Event submission processing failed: '+error.message); }
  });
}

function eventResponseProcessed_(responseId) {
  const sheet=getSpreadsheet_().getSheetByName('Events'); if(!sheet||sheet.getLastRow()<2)return false;
  const headers=sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0],col=headers.indexOf('submission_response_id'); if(col<0)return false;
  const values=sheet.getRange(2,col+1,Math.max(0,sheet.getLastRow()-1),1).getValues();return values.some(function(row){return text_(row[0])===text_(responseId);});
}
