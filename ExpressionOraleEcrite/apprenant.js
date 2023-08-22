
const baseEndpoint = "http://localhost:8003";
const conteneurGeneral = document.getElementById('conteneurDetails');
const formulaireAjout=document.getElementById('formulaireAjoutDialogue')
const formulaireModif=document.getElementById('formulaireModifDialogue')
const conteneurGeneralEnsei = document.getElementById('conteneurGeneralEnsei');
const conteneurDetailsTitre = document.getElementById('titreDialogue');
const conteneurDetailsTheme = document.getElementById('themeDialogue');
const conteneurDetailsLangue = document.getElementById('ecritureLangue');
const conteneurDetailsFancais = document.getElementById('ecritureFrancais');
const conteneurAudio = document.getElementById('audioPrononciation');
const conteneurRegles = document.getElementById('reglesARetenir');
const urlParams =new URLSearchParams( window.location.search); //récupérer une info dans l'url(id du dialogue)window.location.search.split("?").join("");
const url_idUtilisateur= urlParams.get('us');
const url_idDialogue= urlParams.get('di');
const url_idLangue= urlParams.get('la');
const url_idNiveau= urlParams.get('ni');
const listeDeroulanteNivForm = document.getElementById('Listniv');
const listeDeroulanteTheme = document.getElementById('Listtheme');
const nomUser1=document.getElementById('nomUtilisateur1');
const nomUser2=document.getElementById('nomUtilisateur2');
const niveauUser=document.getElementById('niveauUtilisateur');
const boutonRetourDashboard=document.getElementById('boutonRetourDashboard');
const boutonRetourVueApprenant=document.getElementById('boutonRetourVueApprenant');
const langueApprise=document.getElementById('langueApprise');
const langueselectionnee1=document.getElementById('langueselectionnee1');
const langueselectionnee2=document.getElementById('langueselectionnee2');

const boutonExam=document.getElementById("boutonExam")
// fonction qui récupère les noms des niveau de formation
function récupInfosNivFormation(utilité) {
    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/listerNiveauFormation/`;
            const options = {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",  
                }
            }
            fetch(endpoint, options)
            .then(response=>response.json())
            .then(tableNivFormation=>{
                if(utilité==1){
                    récupTitreDialogue(tableNivFormation);
                }
                if(utilité==2){
                    récupThemeDialogue(tableNivFormation,"form");
                }
                
            })
    
}

//fonction qui récupère les données des dialogues
function récupTitreDialogue (tableNivFormation){
    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/listerDialogue/`;
            const options = {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",  
                }
            }
            fetch(endpoint, options)
            .then(response=>response.json())
            .then(tableInfosDialogues=>{
               writeTocontainer(tableInfosDialogues,tableNivFormation);
            })
    
}

//fonction qui récupère les thèmes des dialogues
function récupThemeDialogue (tableNivFormation,utilite){
    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/listerTheme/`;
            const options = {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",  
                }
            }
            fetch(endpoint, options)
            .then(response=>response.json())
            .then(tableInfosThemes=>{
                if(utilite=="form"){
                    complèteFormulaire(tableNivFormation,tableInfosThemes)
                }else{
                    //Ecrire le theme du dialogue
                    var i=0
                    while(i<tableInfosThemes.length){

                        if(tableInfosThemes[i].id_theme==utilite ){
                            var div = document.createElement('div');
                            div.className = 'theme';
                             div.innerHTML =  `Theme: ${tableInfosThemes[i]. libelleTheme}`;
                            conteneurDetailsTheme.appendChild(div);
                        }
                        i=i+1
                    }
                
                }
               
            })
    
}

 

// fonction qui ecrit les titres des dialogues par niveau 
function writeTocontainer(tableInfosDialogues,tableNivFormation) {

    //bouton de passage des exams
    boutonExam.innerHTML=` <button class="button" id="boutonExam" style="width: max-content; height: 40px;color: white;  background-color: #5AE083; border: none;border-radius:20px;box-shadow:3px 3px 3px 0px  rgb(127, 133, 133);">
                                                  
    <a href="VuepageTestEvaluation.html?us=${url_idUtilisateur}&la=${url_idLangue}" style="color: white" ><table> <tr><td style="font-size: 85%; font-weight: bold;" >Passer l'examen</td>
     <td><img src="img/Back_32px - Copie.png" style="width: 20px;"  alt="next"></td></tr></table></a> </button>`

        for ( let i=0; i <= url_idNiveau;i++) {
            //Ecrire le nom du niveau disponible 
            var button = document.createElement('button');
            button.className = 'accordion';
            button.style='margin-top:1%;display:flex';
            var span1 = document.createElement('span1');
            span1.innerHTML = `Niveau${i+1}-${tableNivFormation[i].libelleNiveauFormation}`;
            span1.style='width:800px';
            button.appendChild(span1);
            var span3 = document.createElement('span3');
            span3.innerHTML= `<img src="img/Back_32px - Co.png">`;
            
            button.appendChild(span3);
            conteneurGeneral.appendChild(button);
            var j=0  
            var div1 = document.createElement('div1');
                    div1.className = 'panel';
                    div1.style="display:none; padding:3%"

            while(j < tableInfosDialogues.length){
                if(tableInfosDialogues[j].niveauFormation==tableNivFormation[i].id_Niveau && tableInfosDialogues[j].langue==url_idLangue){

                     //Ecrire les titres des dialogues  us=1&la=1&ni=1
                    var div2 = document.createElement('div2');
                    div2.className = 'TitreDialogue';
                    if(conteneurGeneral){
                    div2.innerHTML = ` <a href="VueApprenantDetails.html?us=${url_idUtilisateur}&la=${url_idLangue}&ni=${url_idNiveau}&di=${tableInfosDialogues[j].id_Dialogue}">

                    <img src="${tableInfosDialogues[j].imageIllustrative}" style="width:20%"> <br>
                    ${tableInfosDialogues[j].titreDialogue}</a>`
                    }else{
                        div2.innerHTML = `<a href="VueEnseignantDetails.html?us=${url_idUtilisateur}&la=${url_idLangue}&ni=${url_idNiveau}&di=${tableInfosDialogues[j].id_Dialogue}">
                    ${tableInfosDialogues[j].titreDialogue}</a> <br>`
                    }
                    div1.appendChild(div2);
                    
                }
                j=j+1
            }
            conteneurGeneral.appendChild(div1);
                
            button.addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "none") {
                  panel.style.display = "flex";
                    this.style='background-color:#5AE083;margin-top:1%;display:flex';
                    span3.innerHTML= `<img src="img/Back_32px - Cop.png">`;
                } else {
                  panel.style.display = "none";
                  this.style='background-color:#eee;margin-top:1%;display:flex';
                  span3.innerHTML= `<img src="img/Back_32px - Co.png">`;
                }

              });

        }
        var k=parseInt(url_idNiveau)+1;
        for ( let i=k; i <= tableNivFormation.length;i++) {
            //Ecrire le nom du niveau non disponible 
            var button = document.createElement('button');
            button.className = 'accordion';
            button.style='margin-top:1%;display:flex';
            var span1 = document.createElement('span1');
            span1.innerHTML = `Niveau${i+1}-${tableNivFormation[i].libelleNiveauFormation}`;
            span1.style='width:800px; ';
            button.appendChild(span1);
            //petit cadénas
            var span2 = document.createElement('span2');
            span2.innerHTML= `<img src="img/cadenas.png" style="width:20px;margin-left:13px">`;
            span1.appendChild(span2);
            

            var span3 = document.createElement('span2');
            span3.innerHTML= `<img src="img/Back_32px - Co.png">`;
            button.appendChild(span3);

            conteneurGeneral.appendChild(button);
            var j=0  
            var div1 = document.createElement('div1');
                    div1.className = 'panel';
                    div1.style="display:none; padding:3%"

            while(j < tableInfosDialogues.length){
                if(tableInfosDialogues[j].niveauFormation==tableNivFormation[i].id_Niveau && tableInfosDialogues[j].langue==url_idLangue){

                     //Ecrire les titres des dialogues  us=1&la=1&ni=1
                    var div2 = document.createElement('div2');
                    div2.className = 'TitreDialogue';
                    if(conteneurGeneral){
                    div2.innerHTML = ` 
                    <img src="${tableInfosDialogues[j].imageIllustrative}" style="width:20%"> <br>
                    ${tableInfosDialogues[j].titreDialogue}`
                    }else{
                        div2.innerHTML = `<a href="VueEnseignantDetails.html?us=${url_idUtilisateur}&la=${url_idLangue}&ni=${url_idNiveau}&di=${tableInfosDialogues[j].id_Dialogue}">
                    ${tableInfosDialogues[j].titreDialogue}</a> <br>`
                    }
                    div1.appendChild(div2);
                    
                }
                j=j+1
            }
            conteneurGeneral.appendChild(div1);
                
            button.addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "none") {
                  panel.style.display = "flex";
                    this.style='background-color:#5AE083;margin-top:1%;display:flex';
                    span3.innerHTML= `<img src="img/Back_32px - Cop.png">`;
                } else {
                  panel.style.display = "none";
                  this.style='background-color:#eee;margin-top:1%;display:flex';
                  span3.innerHTML= `<img src="img/Back_32px - Co.png">`;
                }

              });

        }

    }
    

    // fonction qui récupère les détails d'un seul dialogue
function détailDialogue(id) {
    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/detailsDialogue/${id}`;
            const options = {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",  
                }
            }
            fetch(endpoint, options)
            .then(response=>response.json())
            .then(tableDétails=>{
                //Ecrire le titre du dialogue
                var div = document.createElement('div');
                div.className = 'titre';
                div.innerHTML =  `Titre: ${tableDétails.titreDialogue}`;
                conteneurDetailsTitre.appendChild(div);

                //Ecrire le theme du dialogue
                récupThemeDialogue("null",tableDétails.theme);

                //Ecrire le dialogue en langue
                var div = document.createElement('div');
                div.className = 'ecritureLangue';
                div.style='margin:10px';
                var a=""
                var b=0
                var code=""
                var i=0
                var taille=tableDétails.ecritureDialogueLangue.length;
                while(i<taille){
                    a=tableDétails.ecritureDialogueLangue[i]
                    if(a==";"){
                        code=code+tableDétails.ecritureDialogueLangue.substring(b,i+1)+"<br>";
                        b=i+1
                    }
                    i=i+1;
                }
                div.innerHTML = code;
                conteneurDetailsLangue.appendChild(div);

                //Ecrire le dialogue en français
                var div = document.createElement('div');
                div.className = 'ecriturFrançais';
                div.style='margin:10px';
                var a=""
                var b=0
                var code=""
                var i=0
                var taille=tableDétails.ecritureDialogueFrançais.length;
                while(i<taille){
                    a=tableDétails.ecritureDialogueFrançais[i]
                    if(a==";"){
                        code=code+tableDétails.ecritureDialogueFrançais.substring(b,i+1)+"<br>";
                        b=i+1
                    }
                    i=i+1;
                }
                div.innerHTML = code;
                conteneurDetailsFancais.appendChild(div);

                //Audio de prononciation     
                var taille=tableDétails.audioDialogue.length;
                var code="../"+tableDétails.audioDialogue.substring(21,taille);
                conteneurAudio.setAttribute("src", code )  
                
            
                
                //Ecrire les regles à retenir
                if(tableDétails.regleUsage==null){
                    conteneurRegles.innerHTML=`<strong><em> Nous vous donnerons des règles à retenir dans le maniment de la langue</em></strong>`
                }else{
                    conteneurRegles.innerHTML=`<strong><em> "${tableDétails.regleUsage}"</em></strong>`
                }
                
            })
    
}


//afficher les informations de l'utilisateur sur l'interface(nom et niveau)
function récupNomUser(){
    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/detailsUtilisateur/${url_idUtilisateur}`;
    const options = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",  
        }
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(tableDétails=>{
        //Ecrire le nom de l'utilisateur partout
        nomUser1.innerHTML = tableDétails.prenom;
        nomUser2.innerHTML = tableDétails.prenom;
              
    })
    if(boutonRetourDashboard){
                //creer le bouton de retour au dashboard
            boutonRetourDashboard.innerHTML=`<a href="../../../pageAcceuil/DashbordApprenant.html?us=${url_idUtilisateur}&la=${url_idLangue}&ni=${url_idNiveau}">
            <button class="button" style="width: max-content; height: 50px;color: white;  background-color: #FDB54B; border: none;border-radius:10px;padding-left:20px;padding-right: 60px;">
                <table>
                <tr><td><img src="img/Back_32px.png" style="font-size: 20px;"  alt="back"></td>
                    <td style="font-size: 85%;">Retour au menu principal </td></tr>
                </table>
        </button></a>`
    }
    if(boutonRetourVueApprenant){
                    //creer le bouton de retour au dashboard
             boutonRetourVueApprenant.innerHTML=`<a href="VueApprenant.html?us=${url_idUtilisateur}&la=${url_idLangue}&ni=${url_idNiveau}">
            <button class="button" style="width: max-content; height: 50px;color: white;  background-color: #FDB54B; border: none;border-radius:10px;padding-left:20px;padding-right: 60px;">
                <table>
                <tr><td><img src="img/Back_32px.png" style="font-size: 20px;"  alt="back"></td>
                    <td style="font-size: 85%;">Retour aux leçons </td></tr>
                </table>
        </button></a>`
    }
   
        
}
//afficher le niveau de formation de la personne connectée par rapport à la langue sélectionnée
function récupNomNiveau(){ 
    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/detailsNiveauFormation/${url_idNiveau}`;
    const options = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",  
        }
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(tableDétails=>{
        niveauUser.innerHTML=`<strong> Niveau ${tableDétails.libelleNiveauFormation} </strong>`
        
        
    })
 
}
//récupérer les informations de l'utilisateur dans la tble enseignement
function recupInfosEnsei(){
    
    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/detailsEnseignement/`;
    const options = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",  
        }
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(tableDétails=>{
       var i=0
        while(i<tableDétails.length){
            if(tableDétails[i].utilisateur==url_idUtilisateur){
                if(tableDétails[i].langue!=url_idLangue){
                    recupNomLangue(tableDétails[i].langue,tableDétails[i].niveau,2); 
                }
            }
            i=i+1;
        }
        
    })
}



//afficher les informations sur une langue 
function recupNomLangue(idLangue,niveau,utilité){ 
    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/detailsLangue/${idLangue}`;
    const options = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",  
        }
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(tableDétails=>{
        if(utilité==1){//afficher le nom de la langue à des endroits spécifiques
            if(langueselectionnee1){
                langueselectionnee1.innerHTML=tableDétails.libelleLangue;
            }
            if(langueselectionnee2){
                langueselectionnee2.innerHTML=tableDétails.libelleLangue;
            }
            //afficher en orange la langue sélectionnée 
            var pourcentage=url_idNiveau*20;
            var tr = document.createElement('tr');
            tr.id = `${idLangue}`;
            tr.innerHTML=`<tr>
                <td><strong> ${tableDétails.libelleLangue}</strong></td>
                <td  style="width:90%;height: auto;">
                    <div class="progress" style="height: 12px;">
                        <div class="progress-bar" style="width:${pourcentage}%;background-color: #FDB504"><span style="font-size: 8px;">${pourcentage}%</span></div>
                    </div>
            </td>
            </tr>`
            
                langueApprise.appendChild(tr);
            
           
        
        }
        
        
        if(utilité==2){//afficher toute les langue qu'il apprend
            var pourcentage=niveau*20;
            var tr = document.createElement('tr');
            tr.id = `${idLangue}`;
            tr.innerHTML=`<tr>
                <td><a href="VueApprenant.html?us=${url_idUtilisateur}&la=${idLangue}&ni=${niveau}" style="color:grey"> ${tableDétails.libelleLangue} <a> </td>
                <td  style="width:90%;height: auto;">
                    <div class="progress" style="height: 12px;">
                        <div class="progress-bar" style="width:${pourcentage}%;background-color: #5AE083"><span style="font-size: 8px;">${pourcentage}%</span></div>
                    </div>
               </td>
            </tr>`
                langueApprise.appendChild(tr);
            
            
        }
    })
    
}


 //ce qui se passe dans la page index ou page d'acceuil de l'enseignant 
if(conteneurGeneral || conteneurGeneralEnsei ){
    
    récupNomUser();
    récupNomNiveau();
    recupNomLangue(url_idLangue,null,1);
    recupInfosEnsei();
    récupInfosNivFormation(1);
   
    
}

//ce qui se passe dans la page de détalis du dialogue 
if(conteneurDetailsTitre   && conteneurDetailsLangue  && conteneurDetailsFancais ){
    récupNomUser();
    récupNomNiveau();
    recupNomLangue(url_idLangue,null,1);
    recupInfosEnsei();
    détailDialogue(url_idDialogue);
    
}

//ce qui se passe quand on arrive sur le formulaire d'ajout de Dialogue
if (formulaireAjout || formulaireModif) {
    récupInfosNivFormation(2);
}
