# Configurare pas cu pas — NovaLab

## Înainte de a începe
Aplicația scriptului nu este încă executată și nu sunt create automat resursele live. Folderul radacină configurat este `1QFLKQd_x1amji8KlcIuASrcCzsUmEO8g`.

## 1. Creează proiectul Apps Script
1. Deschide folderul radacină în Google Drive.
2. Alege **Extensii > Apps Script** dintr-un document sau, mai sigur, creează un proiect Apps Script legat de contul NovaLab.
3. Copiază toate fișierele `.gs` din `06 - GOOGLE APPS SCRIPT` și manifestul `appsscript.json` în editor.

## 2. Proprietăți Script
Setează următoarele proprietăți în **Project Settings > Script Properties**:
- `ROOT_FOLDER_ID` = `1QFLKQd_x1amji8KlcIuASrcCzsUmEO8g`
- `GEMINI_ENABLED` = `false` până când traducerea este pregătită
- `GEMINI_API_KEY` = cheia creată în Google AI Studio, numai în Script Properties
- `GEMINI_MODEL` = modelul admis în contul API; începând cu această versiune, default-ul proiectului este `gemini-3.5-flash-lite`

Imaginile rămân private după trimiterea formularului. Ele devin accesibile numai după apelarea administrativă a unei funcții de publicare pentru un articol/eveniment deja publicat. Nu exista o publicație publică automată în procesarea formularului.

`setupNovaLab()` completează automat `SPREADSHEET_ID`, `ARTICLE_FORM_ID` și `EVENT_FORM_ID`.

## 3. Rulează setup-ul
În bara de sus a editorului, alege funcția `setupNovaLab`, apoi **Run** și autorizează permisiunile. Funcția este idempotentă și reusește resursele existente.

## 4. Imagini în Google Forms
Formulare programatice nu pot crea întrebări de încărcare fișiere. În editorul fiecărui formular adaugă manual:
- butonul `+`;
- tipul `Incarcare fisier`;
- `Imagine principală (copertă)` pentru copertă;
- `Imagini suplimentare` pentru imagini suplimentare;
- limitează la imagini.
Formularele cu încărcări rămân în My Drive, nu într-un Shared Drive.

## 5. Testare
1. Trimite un articol de test.
2. Verifică documentul român, rândul Articles și imaginea.
3. Activează temporar Gemini doar după configurare.
4. Verifică documentul EN și păstrează `english_reviewed=FALSE`.
5. Marchează manual `english_reviewed=TRUE` numai după revizuire.
6. Marcheză `published=TRUE` pentru conținutul public.
7. Repetă pentru un eveniment.

## 6. API
Alege **Deploy > New deployment > Web app**. La început folosește proiectul pentru testarea API-ului read-only. Nu automatiza deploymentul și nu expune RAW sheets.

## 7. Depanare
- Folder indisponibil: verifică `ROOT_FOLDER_ID` și dreptul de acces.
- Formular lipsă: verifică proprietățile și rerulează setupNovaLab.
- Traducere lipsă: lasă `GEMINI_ENABLED=false` sau verifică cheia și modelul.
- Imagine negăsită: adaugă manual întrebările File Upload cu numele exacte indicate mai sus.
