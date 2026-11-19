function createArticleForm_(){
  const old=prop_('ARTICLE_FORM_ID'); if(old){try{return FormApp.openById(old);}catch(e){}}
  const f=FormApp.create('NovaLab — Trimiteți un articol');
  f.setCollectEmail(true).setAllowResponseEdits(false);
  f.setDescription('Trimiteți un articol original în limba română.');
  addText_(f,'Titlul articolului','Un titlu clar și specific.',FormApp.ItemType.TEXT,true);
  addText_(f,'Autor','Numele autorului.',FormApp.ItemType.TEXT,true);
  addChoice_(f,'Disciplină','Alegeți disciplina.',['Biologie','Chimie','Astrofizică'],true);
  addChoice_(f,'Tipul articolului','Alegeți tipul.',['Explicație','Cercetare științifică','Experiment','Interviu','Opinie','Alt tip'],true);
  addText_(f,'Rezumat scurt','Rezumat de 1–3 propoziții.',FormApp.ItemType.PARAGRAPH_TEXT,true);
  addText_(f,'Introducere','Prezentarea problemei sau întrebării.',FormApp.ItemType.PARAGRAPH_TEXT,true);
  for(let i=1;i<=3;i++){
    addText_(f,'Titlul secțiunii '+i,'Poate rămâne necompletat.',FormApp.ItemType.TEXT,false);
    addText_(f,'Conținutul secțiunii '+i,'Conținutul secțiunii '+i+'; poate rămâne necompletat.',FormApp.ItemType.PARAGRAPH_TEXT,false);
  }
  addText_(f,'Concluzie','Concluziile și limitele articolului.',FormApp.ItemType.PARAGRAPH_TEXT,true);
  addText_(f,'Surse și referințe','Surse verificabile și citări.',FormApp.ItemType.PARAGRAPH_TEXT,false);
  setProp_('ARTICLE_FORM_ID',f.getId());
  return f;
}
function createEventForm_(){
  const old=prop_('EVENT_FORM_ID'); if(old){try{return FormApp.openById(old);}catch(e){}}
  const f=FormApp.create('NovaLab — Trimiteți un eveniment');
  f.setCollectEmail(true).setAllowResponseEdits(false);
  f.setDescription('Introduceți evenimentul în limba română. Fusul orar este Europe/Bucharest.');
  addText_(f,'Titlul evenimentului','Titlul evenimentului în română.',FormApp.ItemType.TEXT,true);
  addChoice_(f,'Disciplină','Alegeți disciplina.',['Biologie','Chimie','Astrofizică'],true);
  addChoice_(f,'Tipul evenimentului','Alegeți tipul.',['Atelier','Conferință','Observație','Vizită','Ședință de club','Alt tip'],true);
  addText_(f,'Descriere scurtă','Rezumat scurt pentru afișare.',FormApp.ItemType.PARAGRAPH_TEXT,true);
  addText_(f,'Descriere completă','Detalii și informații pentru participanți.',FormApp.ItemType.PARAGRAPH_TEXT,true);
  addText_(f,'Organizator','Persoana sau echipa organizatoare.',FormApp.ItemType.TEXT,true);
  addText_(f,'Data început','Format YYYY-MM-DD.',FormApp.ItemType.TEXT,true);
  addText_(f,'Ora început','Format HH:MM.',FormApp.ItemType.TEXT,true);
  addText_(f,'Data sfârșit','Format YYYY-MM-DD.',FormApp.ItemType.TEXT,true);
  addText_(f,'Ora sfârșit','Format HH:MM.',FormApp.ItemType.TEXT,false);
  addText_(f,'Locație','Numele locului.',FormApp.ItemType.TEXT,true);
  addText_(f,'Adresă','Adresa completă.',FormApp.ItemType.PARAGRAPH_TEXT,false);
  addText_(f,'Link înscriere','Link complet pentru înscriere.',FormApp.ItemType.TEXT,false);
  addText_(f,'Contact','Email sau telefon pentru participanți.',FormApp.ItemType.TEXT,false);
  setProp_('EVENT_FORM_ID',f.getId());
  return f;
}
function addText_(f,title,help,type,required){const i=type===FormApp.ItemType.PARAGRAPH_TEXT?f.addParagraphTextItem():f.addTextItem();i.setTitle(title).setHelpText(help).setRequired(required);}
function addChoice_(f,title,help,choices,required){f.addMultipleChoiceItem().setTitle(title).setHelpText(help).setChoiceValues(choices).setRequired(required);}
