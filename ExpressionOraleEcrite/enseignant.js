
const baseEndpoint = "http://localhost:8003";
const conteneurGeneral = document.getElementById('conteneurDetails');
const formulaireAjout=document.getElementById('formulaireAjoutDialogue') 
const formulaireCreationTest=document.getElementById('formulaireCreationTest')
const formulaireModif=document.getElementById('formulaireModifDialogue')
const conteneurGeneralEnsei = document.getElementById('conteneurGeneralEnsei');
const conteneurDetailsTitre = document.getElementById('titreDialogue');
const conteneurDetailsTheme = document.getElementById('themeDialogue');
const conteneurDetailsLangue = document.getElementById('ecritureLangue');
const conteneurDetailsFrançais = document.getElementById('ecritureFrançais');
const conteneurAudio = document.getElementById('audioPrononciation');
const conteneurRegles = document.getElementById('reglesARetenir');
const urlParams =new URLSearchParams( window.location.search); //récupérer une info dans l'url(id du dialogue)window.location.search.split("?").join("");
const url_idUtilisateur= urlParams.get('us');
const url_idDialogue= urlParams.get('di');
const url_idLangue= urlParams.get('la');
const listeDeroulanteNivForm = document.getElementById('Listniv');
const listeDeroulanteTheme = document.getElementById('Listtheme');
const nomUser1=document.getElementById('nomUtilisateur1');
const nomUser2=document.getElementById('nomUtilisateur2');
const niveauUser=document.getElementById('niveauUtilisateur');
const boutonRetourDashboard=document.getElementById('boutonRetourDashboard');
const boutonRetourVueEnseignant=document.getElementById('boutonRetourVueEnseignant');
const boutonRetourDetailsDialogue=document.getElementById('boutonRetourDetailsDialogue');
const langueselectionnee1=document.getElementById('langueselectionnee1');
const langueselectionnee2=document.getElementById('langueselectionnee2');
const langueselectionnee3=document.getElementById('langueselectionnee3');
const payslangue=document.getElementById('payslangue');
const langueEnseignée=document.getElementById('langueEnseignée');
const formulaireAjoutDialogue=document.querySelector('#formulaireAjoutDialogue');
const boutonExam=document.getElementById("boutonExam")
//const conteneurBoutonEnregistrer=getElementById("conteneurBoutonEnregistrer");

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
                    récupThemeDialogue(tableNivFormation,"form1");
                }
                if(utilité==3){
                    récupThemeDialogue(tableNivFormation,"form2");
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
                if(utilite=="form1"){
                    complèteFormulaireAjout(tableNivFormation,tableInfosThemes)
                }
                if(utilite=="form2"){
                    complèteFormulaireModif(tableNivFormation,tableInfosThemes)
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

        var i=0;
        while (i < tableNivFormation.length) {
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
                    div2.innerHTML = ` <a href="VueEnseignantDetails.html?us=${url_idUtilisateur}&la=${url_idLangue}&di=${tableInfosDialogues[j].id_Dialogue}">

                    <img src="${tableInfosDialogues[j].imageIllustrative}" style="width:20%"> <br>
                    ${tableInfosDialogues[j].titreDialogue}</a>`

                    div1.appendChild(div2);
                    
                }
                j=j+1
            }
            conteneurGeneral.appendChild(div1);
            i=i+1
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

        var boutonInsertionDialogue = document.createElement('boutonInsertionDialogue');
        boutonInsertionDialogue.innerHTML= `
        <a href="VueFormulaireAjoutDialogue.html?us=${url_idUtilisateur}&la=${url_idLangue}" style="display:flex;color:green" >
            <img src="img/plus.png" style="width: 60px;margin-left: 70%;margin-top:12%"> 
            <span style="font-width:90px;margin-left:1%;margin-top:15%;"> Nouvelle leçon </span>
         </a>`;
        conteneurGeneral.appendChild(boutonInsertionDialogue);

        //bouton de gestion des exams
       boutonExam.innerHTML=` <button class="button" id="boutonExam" style="width: max-content; height: 40px;color: white;  background-color: #5AE083; border: none;border-radius:20px;box-shadow:3px 3px 3px 0px  rgb(127, 133, 133);">
                                                  
       <a href="VueFormulaireCréationTest.html?us=${url_idUtilisateur}&la=${url_idLangue}" style="color: white" ><table> <tr><td style="font-size: 85%; font-weight: bold;" >Gérer l'examen</td>
        <td><img src="img/Back_32px - Copie.png" style="width: 20px;"  alt="next"></td></tr></table></a> </button>`
        
    }
    

    // fonction qui récupère les détails d'un seul dialogue
function détailDialogue(utilite) {
    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/detailsDialogue/${url_idDialogue}`;
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
                    a=tableDétails.ecritureDialogueLangue[i];
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
                conteneurDetailsFrançais.appendChild(div);

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
            //bouton de modification
            var boutonModificationDialogue = document.createElement('boutonModificationDialogue');
            boutonModificationDialogue.innerHTML= `<a href="VueFormulaireModifDialogue.html?us=${url_idUtilisateur}&la=${url_idLangue}&di=${url_idDialogue}">
            <button class="button" style="width: fit-content; height: 50px;color: GREEN; border: none;border-radius:10px;padding-left:20px;padding-right: 60px;margin-right:15px">
                <table>
                <tr><td><img src="img/icons8_edit_delivery_terms_48px.png" style="width: 20px;"  alt="back"></td>
                    <td style="font-size: 85%;">Modifier </td></tr>
                </table>
        </button></a>`;
             conteneurBoutonSupMod.appendChild(boutonModificationDialogue);


            
             //bouton de suppression
            var boutonSupressionDialogue = document.createElement('boutonSupressionDialogue');
            boutonSupressionDialogue.innerHTML= `
            <button class="button" style="width: fit-content; height: 50px;color: #F25C6F; border: none;border-radius:10px;padding-left:20px;padding-right: 60px;">
                <table>
                <tr><td><img src="img/supprimer.png" style="width: 20px;"  alt="back"></td>
                    <td style="font-size: 85%;">Supprimer</td></tr>
                </table>
            </button>`;
            conteneurBoutonSupMod.appendChild(boutonSupressionDialogue);

            boutonSupressionDialogue.addEventListener('click',async (e) =>{
                e.preventDefault();
                if(confirm("Voulez vous vraiment supprimer ce dialogue?")){
                    try {
                        const response = await fetch(`http://localhost:8000/ExpressionOraleEcrite/supprimerDialogue/${url_idDialogue}/`, {
                          method: 'DELETE',
                          headers:{
                            'Content-Type':'application/json'
                          }
                        });
                            console.log(response);
                        if (!response.ok) {
                          throw new Error(`Erreur HTTP! status: ${response.status}`);
                        }
                    
                        alert(`Le dialogue supprimées avec succès!`);
                          open(`VueEnseignant.html?us=${url_idUtilisateur}&la=${url_idLangue}`);
                    
                      } catch (error) {
                        console.error('Erreur:', error);
                      }
                }
                
              });
             //fin bouton de suppression

}

//ajout de la liste déroulante au formulaire d"ajout de dialogue 
function complèteFormulaireAjout(tableNivFormation,tableInfosThemes){
   
    let data1=""
    let data2=""
    var i=0       
    while ( i < tableNivFormation.length) {

        data1+= `<option value="${tableNivFormation[i].id_Niveau}">${tableNivFormation[i].libelleNiveauFormation}</option>`
        i=i+1
    } 
    listeDeroulanteNivForm.innerHTML=data1
    i=0  
    while ( i < tableInfosThemes.length) {
        
        data2+= `<option value="${tableInfosThemes[i].id_theme}">${tableInfosThemes[i].libelleTheme}</option>`
        i=i+1
    } 
    listeDeroulanteTheme.innerHTML=data2
    
}

//ajout des infos dans les champs du formulaire de modifications
function complèteFormulaireModif(tableNivFormation,tableInfosThemes){

    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/detailsDialogue/${url_idDialogue}`;
    const options = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",  
        }
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(tableDétails=>{
        titreDialogue.setAttribute("value",tableDétails.titreDialogue)
        //image illustrative      
        var taille=tableDétails.imageIllustrative.length;
        var code=tableDétails.imageIllustrative.substring(28,taille);
        imageIllustrative.setAttribute("value",tableDétails.imageIllustrative)
        //imageIllustrative.files.name=tableDétails.imageIllustrative
        
        //Audio de prononciation     
        taille=tableDétails.audioDialogue.length;
        code=tableDétails.audioDialogue.substring(28,taille);
        audioDialogue.setAttribute("value",tableDétails.audioDialogue)

        document.getElementById("ecritureDialogueLangue").innerHTML=tableDétails.ecritureDialogueLangue
        document.getElementById("ecritureDialogueFrançais").innerHTML=tableDétails.ecritureDialogueFrançais
        document.getElementById("regleUsage").innerHTML=tableDétails.regleUsage
       

        let data1=""
        let data2=""
        var i=0   
         
        while ( i < tableNivFormation.length) {
            if(tableNivFormation[i].id_Niveau==tableDétails.niveauFormation){
                data1+= `<option value="${tableNivFormation[i].id_Niveau}" selected="selected">${tableNivFormation[i].libelleNiveauFormation}</option>`
            }else{
                data1+= `<option value="${tableNivFormation[i].id_Niveau}">${tableNivFormation[i].libelleNiveauFormation}</option>`
            }
            i=i+1 
        } 
        listeDeroulanteNivForm.innerHTML=data1
        i=0  
        while ( i < tableInfosThemes.length) {
            if(tableInfosThemes[i].id_theme==tableDétails.theme){
                data2+= `<option value="${tableInfosThemes[i].id_theme}" selected="selected">${tableInfosThemes[i].libelleTheme}</option>`
            }else{
                data2+= `<option value="${tableInfosThemes[i].id_theme}">${tableInfosThemes[i].libelleTheme}</option>`
            }
            i=i+1
        } 
        listeDeroulanteTheme.innerHTML=data2

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
            boutonRetourDashboard.innerHTML=`<a href="../../../pageAcceuil/DashbordEnseignant.html?us=${url_idUtilisateur}&la=${url_idLangue}">
            <button class="button" style="width: max-content; height: 50px;color: white;  background-color: #FDB54B; border: none;border-radius:10px;padding-left:20px;padding-right: 60px;">
                <table>
                <tr><td><img src="img/Back_32px.png" style="font-size: 20px;"  alt="back"></td>
                    <td style="font-size: 85%;">Retour au menu principal </td></tr>
                </table>
        </button></a>`
    }
    if(boutonRetourVueEnseignant){
                    //creer le bouton de retour aux leçons
             boutonRetourVueEnseignant.innerHTML=`<a href="VueEnseignant.html?us=${url_idUtilisateur}&la=${url_idLangue}">
            <button class="button" style="width: max-content; height: 50px;color: white;  background-color: #FDB54B; border: none;border-radius:10px;padding-left:20px;padding-right: 60px;">
                <table>
                <tr><td><img src="img/Back_32px.png" style="font-size: 20px;"  alt="back"></td>
                    <td style="font-size: 85%;">Retour aux leçons </td></tr>
                </table>
        </button></a>`
    }

    if(boutonRetourDetailsDialogue){
                //creer le bouton de retour aux leçons
        boutonRetourDetailsDialogue.innerHTML=`<a href="VueEnseignantDetails.html?us=${url_idUtilisateur}&la=${url_idLangue}&di=${url_idDialogue}">
        <button class="button" style="width: max-content; height: 50px;color: white;  background-color: #FDB54B; border: none;border-radius:10px;padding-left:20px;padding-right: 60px;">
            <table>
            <tr><td><img src="img/Back_32px.png" style="font-size: 20px;"  alt="back"></td>
                <td style="font-size: 85%;">Retour aux leçons </td></tr>
            </table>
        </button></a>`
    }
   
        
}




//afficher les informations sur une langue 
function recupNomLangue(utilité){ 
    const endpoint = `${baseEndpoint}/ExpressionOraleEcrite/detailsLangue/${url_idLangue}`;
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
            if(langueselectionnee3){
                langueselectionnee3.innerHTML=tableDétails.libelleLangue;
               
            }
            payslangue.innerHTML=`<img src="${tableDétails.drapeauPaysLangue}" style="width: 20px;">${tableDétails.paysLangue}`
            langueEnseignée.innerHTML=tableDétails.libelleLangue;
        }

        if(utilité==2){//afficher lid de la langue dans le formulaire d'ajout et de modification
        
            idLangueEnseignee.setAttribute("value", url_idLangue)  
                
           
        }
        
    })
    
}

 //ce qui se passe dans la page index ou page d'acceuil de l'enseignant 
if(conteneurGeneral ){
    
    récupNomUser();
    recupNomLangue(1);
    récupInfosNivFormation(1);
   
    
}

//ce qui se passe dans la page de détalis du dialogue 
if(conteneurDetailsTitre   && conteneurDetailsLangue  && conteneurDetailsFrançais ){
    récupNomUser();
    recupNomLangue(1);
    détailDialogue(1);
    
}

//ce qui se passe quand on arrive sur le formulaire d'ajout de Dialogue
if (formulaireAjout) {
    récupNomUser();
    recupNomLangue(1);
    recupNomLangue(2);
    récupInfosNivFormation(2);

    // ce qui se passe quand on clique sur le bouton d'ajoutDialogue
    formulaireAjoutDialogue.addEventListener('submit', function ajoutDialogue(e) {
        e.preventDefault();
        const DataFormData = new FormData(formulaireAjoutDialogue);
  
          fetch(`http://localhost:8000/ExpressionOraleEcrite/ajouterDialogue/`,{
            method: 'POST',
            body: DataFormData
            })
          .then(response => response.json())
          .then(data=> alert("Le dialogue a bien été enregistré"))
          .catch(error =>console.error(error));
          
  })
  
}


//ce qui se passe quand on arrive sur le formulaire d'ajout de Dialogue
if ( formulaireModif) {
    récupNomUser();
    recupNomLangue(1);
    recupNomLangue(2);
    récupInfosNivFormation(3);
    // ce qui se passe quand on clique sur le bouton d'ajoutDialogue
    formulaireModifDialogue.addEventListener('submit', function modifDialogue(e) {
        e.preventDefault();
        const DataFormData = new FormData(formulaireModifDialogue);
  
          fetch(`http://localhost:8000/ExpressionOraleEcrite/modifierDialogue/${url_idDialogue}/`,{
            method: 'PATCH',
            body: DataFormData
            })
          .then(response => response.json())
          .then(data=> alert("Les modifications ont été bien effectuée"))
          .catch(error =>console.error(error));
          
  })
  
}

//ce qui se passe quand on arrive sur le formulaire de crétion de test
if (formulaireCreationTest) {
    récupNomUser();
    recupNomLangue(1);
    recupNomLangue(2);
    récupInfosNivFormation(2);

    // ce qui se passe quand on clique sur le bouton d'ajoutDialogue
    formulaireCreationTest.addEventListener('submit', function créationTest(e) {
        e.preventDefault();
        const DataFormData = new FormData(formulaireCreationTest);
  
          fetch(`http://localhost:8000/ExpressionOraleEcrite/ajouterTest/`,{
            method: 'POST',
            body: DataFormData
            })
          .then(response => response.json())
          .then(data=> alert("La question a bien été enregistrée"))
          .catch(error =>console.error(error));
          
           //setTimeout(window.open (window.location.href),1000);
           
          
  })
  
}