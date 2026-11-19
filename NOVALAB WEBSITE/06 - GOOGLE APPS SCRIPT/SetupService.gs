function setupNovaLab() {
  const props=PropertiesService.getScriptProperties(); props.setProperty('ROOT_FOLDER_ID',NOVALAB_CONFIG.ROOT_FOLDER_ID);
  const root=getRootFolder_();
  Object.values(NOVALAB_CONFIG.FOLDERS).forEach(function(n){getOrCreateChild_(root,n);});
  let id=prop_('SPREADSHEET_ID'),ss=null;
  if(id){try{ss=SpreadsheetApp.openById(id);}catch(e){ss=null;}}
  if(!ss){ss=SpreadsheetApp.create('NovaLab - Website Content Database');id=ss.getId();props.setProperty('SPREADSHEET_ID',id);DriveApp.getFileById(id).moveTo(root);}
  initializeSheets_(ss);
  const af=createArticleForm_(),ef=createEventForm_();
  const formsFolder=getOrCreateChild_(root,'Forms');
  [af,ef].forEach(function(form){try{DriveApp.getFileById(form.getId()).moveTo(formsFolder);}catch(e){console.warn('Could not move a managed Form: '+e.message);}});
  props.setProperty('ARTICLE_FORM_ID',af.getId());props.setProperty('EVENT_FORM_ID',ef.getId());installSubmitTriggers_();
  return {rootFolderId:NOVALAB_CONFIG.ROOT_FOLDER_ID,spreadsheetId:id,articleFormId:af.getId(),eventFormId:ef.getId()};
}
function initializeSheets_(ss){const schemas={
 Articles:['article_id','title','slug','author','discipline','article_type','summary','document_id','document_url','cover_image','cover_image_id','additional_image_ids','created_at','updated_at','published','english_document_id','english_document_url','english_reviewed','seo_title','seo_description','submission_response_id'],
 Events:['event_id','title','slug','discipline','event_type','short_description','full_description','organizer','start_datetime','end_datetime','timezone','venue','address','registration_url','contact','cover_image','cover_image_id','additional_image_ids','document_id','created_at','updated_at','published','submission_response_id'],
 Pages:['page_id','page_name','ro_document_id','en_document_id','published'],Team:['member_id','name','position_ro','position_en','biography_ro','biography_en','photo_url','display_order','active'],Disciplines:['discipline_id','name_ro','name_en','description_ro','description_en','cover_image','accent_color','display_order','active'],Projects:['project_id','title_ro','title_en','description_ro','description_en','category','image_url','slug','active'],Media:['media_id','filename','category','drive_file_id','public_url','alt_text_ro','alt_text_en'],Settings:['setting','value','notes'],'RAW ARTICLE RESPONSES':['timestamp','response_id','respondent_email','raw_payload','status','record_id','error'],'RAW EVENT RESPONSES':['timestamp','response_id','respondent_email','raw_payload','status','record_id','error']};
 Object.keys(schemas).forEach(function(n){
   let sh=ss.getSheetByName(n)||ss.insertSheet(n);
   if(sh.getLastRow()===0) sh.getRange(1,1,1,schemas[n].length).setValues([schemas[n]]);
   else {const existing=sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(text_);let nextColumn=sh.getLastColumn()+1;schemas[n].forEach(function(header){if(existing.indexOf(header)<0){sh.getRange(1,nextColumn).setValue(header);existing.push(header);nextColumn++;}});}
   sh.setFrozenRows(1);sh.setFrozenColumns(0);
 });const d=ss.getSheetByName('Sheet1');if(d&&ss.getSheets().length>1&&d.getDataRange().getValues().length===0)ss.deleteSheet(d);
}
function installSubmitTriggers_(){const af=prop_('ARTICLE_FORM_ID'),ef=prop_('EVENT_FORM_ID'),ts=ScriptApp.getProjectTriggers();if(af&&!ts.some(t=>t.getHandlerFunction()==='onArticleSubmit'&&t.getTriggerSourceId()===af))ScriptApp.newTrigger('onArticleSubmit').forForm(af).onFormSubmit().create();if(ef&&!ts.some(t=>t.getHandlerFunction()==='onEventSubmit'&&t.getTriggerSourceId()===ef))ScriptApp.newTrigger('onEventSubmit').forForm(ef).onFormSubmit().create();}
