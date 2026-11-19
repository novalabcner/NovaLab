function prop_(name) { return PropertiesService.getScriptProperties().getProperty(name) || ''; }
function setProp_(name,value) { PropertiesService.getScriptProperties().setProperty(name,String(value)); }
function text_(value) { return value === null || value === undefined ? '' : String(value).trim(); }
function bool_(value) { return String(value).toLowerCase() === 'true'; }
function slug_(value) { const s=text_(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^[-]+|[-]+$/g,'').slice(0,70); return s || 'nova-content'; }
function uniqueId_(prefix) { return prefix+'-'+Utilities.getUuid().replace(/-/g,'').slice(0,12); }
function findDocumentByPrefix_(folderName,prefix) {
  try {
    const files=getOrCreateFolder_(folderName).getFilesByName(prefix);
    if(files.hasNext()) return DocumentApp.openById(files.next().getId());
  } catch(error) { console.error('Could not search existing document: '+error.message); }
  const prefixFiles=getOrCreateFolder_(folderName).getFiles();
  while(prefixFiles.hasNext()) {
    const file=prefixFiles.next();
    if(file.getName().indexOf(prefix+' - ')===0) return DocumentApp.openById(file.getId());
  }
  return null;
}

function stableResponseId_(prefix,responseId) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text_(responseId));
  const hex = digest.map(function(byte){return ('0'+(byte & 255).toString(16)).slice(-2);}).join('');
  return prefix+'-'+hex.slice(0,12);
}
function json_(payload) { return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON); }
function getRootFolder_() {
  const id = prop_('ROOT_FOLDER_ID') || NOVALAB_CONFIG.ROOT_FOLDER_ID;

  if (!id) {
    throw new Error('ROOT_FOLDER_ID is empty.');
  }

  try {
    const folder = DriveApp.getFolderById(id);

    Logger.log('Folder name: ' + folder.getName());
    Logger.log('Folder ID: ' + folder.getId());

    return folder;
  } catch (error) {
    Logger.log('Original error: ' + error.message);
    throw new Error(
      'Cannot access root folder ' + id + '. Original error: ' + error.message
    );
  }
}
function getOrCreateChild_(parent,name) { const m=parent.getFoldersByName(name); return m.hasNext() ? m.next() : parent.createFolder(name); }
function getOrCreateFolder_(name) { return getOrCreateChild_(getRootFolder_(),name); }
function extractFileId_(value) { const s=text_(value); const m=s.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]+)/); if(m)return m[1]; if(/^[a-zA-Z0-9_-]{20,}$/.test(s))return s; return ''; }
function uploadIds_(value) { if(!value)return []; if(Array.isArray(value))return value.map(extractFileId_).filter(String); return text_(value).split(',').map(extractFileId_).filter(String); }
function iso_(date,time) { const d=text_(date), t=text_(time)||'00:00'; if(!/^\d{4}-\d{2}-\d{2}$/.test(d)||!/^\d{2}:\d{2}$/.test(t))return ''; return d+'T'+t+':00'; }
function withLock_(callback) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('Processing is busy. Please retry.');
  try {
    return callback();
  } finally {
    lock.releaseLock();
  }
}
