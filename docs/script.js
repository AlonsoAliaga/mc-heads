let currentPage = 1;
let maxPerPage = 8 * 8;
let nearPageRange = 3;
let headsMap = new Map();
let availableCategories = [];
let easyMovementGlobal = true;
const usernameInput = document.getElementById('inputText');
const fonts = {
  "accent": {
    "name": "Accent",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ĀBÇÐÊFǴĦÎĴĶĿMŇήÖPQŘŞŢŬVŴXŸƵābčďéfǥĥɨĵķłmņŇǒpqřşŧùvŵxŷž⁰¹²³⁴⁵⁶⁷⁸⁹".split("")
    }
  },
  "big": {
    "name": "Big",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ᗩᗷᑕᗪEᖴGᕼIᒍKᒪᗰᑎÑOᑭᑫᖇᔕTᑌᐯᗯ᙭YᘔᗩᗷᑕᗪEᖴGᕼIᒍKᒪᗰᑎñOᑭᑫᖇᔕTᑌᐯᗯ᙭Yᘔ0123456789".split("")
    }
  },
  "bubble": {
    "name": "Bubble",
    "processed": {},
    "data": {
      tosearch: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨".split("")
    }
  },
  "currency": {
    "name": "Currency",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦ÑØ₱QⱤ₴₮ɄV₩ӾɎⱫ₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦ñØ₱QⱤ₴₮ɄV₩ӾɎⱫ0123456789".split("")
    }
  },
  "cursed": {
    "name": "Cursed",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ԹՅՇԺȝԲԳɧɿʝƙʅʍՌՌԾρφՐՏԵՄעաՃՎՀԹՅՇԺȝԲԳɧɿʝƙʅʍՌՌԾρφՐՏԵՄעաՃՎՀ0123456789".split("")
    }
  },
  "elegant": {
    "name": "Elegant",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ąɓƈđε∱ɠɧïʆҡℓɱŋñσþҩŗşŧų√щхγẕąɓƈđε∱ɠɧïʆҡℓɱŋñσþҩŗşŧų√щхγẕ0123456789".split("")
    }
  },
  "greek": {
    "name": "Greek",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"αႦƈԃҽϝɠԋιʝƙʅɱɳñσρϙɾʂƚυʋɯxყȥαႦƈԃҽϝɠԋιʝƙʅɱɳñσρϙɾʂƚυʋɯxყȥ0123456789".split("")
    }
  },
  "knight": {
    "name": "Knight",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ḀḃḉḊḕḟḠḧḭjḲḶṁṆÑṏṖqṙṠṮṳṼẇẌẏẒḀḃḉḊḕḟḠḧḭjḲḶṁṆñṏṖqṙṠṮṳṼẇẌẏẒ0123456789".split("")
    }
  },
  "krypto": {
    "name": "Krypto",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"คც८ძ૯Բ૭ҺɿʆқՆɱՈÑ૦ƿҩՐς੮υ౮ω૪עઽคც८ძ૯Բ૭ҺɿʆқՆɱՈՈ૦ƿҩՐς੮υ౮ω૪עઽ0123456789".split("")
    }
  },
  "parenthesis": {
    "name": "Parenthesis",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⒪⑴⑵⑶⑷⑸⑹⑺⑻⑼".split("")
    }
  },
  "random": {
    "name": "Random",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ᏗᏰፈᎴᏋᎦᎶᏂᎥᏠᏦᏝᎷᏁÑᎧᎮᎤᏒᏕᏖᏬᏉᏇጀᎩፚᏗᏰፈᎴᏋᎦᎶᏂᎥᏠᏦᏝᎷᏁñᎧᎮᎤᏒᏕᏖᏬᏉᏇጀᎩፚ0123456789".split("")
    }
  },
  "small-caps": {
    "name": "Small caps 💎",
    "before": function(s) {
      return s.toLowerCase();
    },
    "processed": {},
    "data": {
      tosearch:"abcdefghijklmnñopqrstuvwxyzqæƀðʒǝɠɨłꟽɯœɔȣꝵʉγλπρψ0123456789-+".split(""),
      toreplace:"ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴñᴏᴘǫʀsᴛᴜᴠᴡxʏᴢǫᴁᴃᴆᴣⱻʛᵻᴌꟺꟺɶᴐᴕꝶᵾᴦᴧᴨᴩᴪ₀₁₂₃₄₅₆₇₈₉₋₊".split("")
    }
  },
  "spaced": {
    "name": "Spaced",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ＡＢＣＤＥＦＧＨＩＪＫＬＭＮÑＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎñｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９".split("")
    }
  },
  "superscript": {
    "name": "SuperScript",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺÑᴼᴾᵠᴿˢᵀᵁⱽᵂˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿñᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹".split("")
    }
  },
  "tail": {
    "name": "Tail",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ƛƁƇƊЄƑƓӇƖʆƘԼMƝƝƠƤƢƦƧƬƲƔƜҲƳȤʌƅƈɗєƒʛɦɪʝƙʅɱɲɲơƥƣɾƨƭυvɯҳɣȥ0123456789".split("")
    }
  },
  "tailuppercase": {
    "name": "Tail Uppercase",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ƛƁƇƊЄƑƓӇƖʆƘԼMƝƝƠƤƢƦƧƬƲƔƜҲƳȤƛƁƇƊЄƑƓӇƖʆƘԼMƝÑƠƤƢƦƧƬƲƔƜҲƳȤ0123456789".split("")
    }
  },
  "taillowercase": {
    "name": "Tail Lowercase",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ʌƅƈɗєƒʛɦɪʝƙʅɱɲɲơƥƣɾƨƭυVɯҳɣȥʌƅƈɗєƒʛɦɪʝƙʅɱɲɲơƥƣɾƨƭυvɯҳɣȥ0123456789".split("")
    }
  },
  "upsidedown": {
    "name": "Upside down",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"∀ᙠƆᗡƎℲ⅁HIſ⋊˥WNÑOԀΌᴚS⊥∩ΛWX⅄Zɐqɔpǝɟɓɥıɾʞlɯuñopqɹsʇuʌʍxʎz0⇂ᄅƐㄣގ9ㄥ89".split("")
    }
  },
  "upsidedown2": {
    "name": "Upside down #2",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ɐqɔpǝɟɓɥıſʞๅɯuuodbɹsʇnʌʍxʎzɐqɔpǝɟɓɥıſʞๅɯuũodbɹsʇnʌʍxʎz0123456789".split("")
    }
  },
  "upsidedown3": {
    "name": "Upside down #3",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"∀ʙCᴅєɻƋʜǀๅĸΓWИÑObƠɩƧ⊥∏ΛMXλZɑʙcᴅєɻმʜιɿĸгwиñoƅϭʁƨ⊥nʌʍx⑃z0123456789".split("")
    }
  },
  "weird": {
    "name": "Weird",
    "processed": {},
    "data": {
      tosearch:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789".split(""),
      toreplace:"ǟɮƈɖɛʄɢɦɨʝӄʟʍռñօքզʀֆȶʊʋաӼʏʐǟɮƈɖɛʄɢɦɨʝӄʟʍռñօքզʀֆȶʊʋաӼʏʐ0123456789".split("")
    }
  }
}
let copiedTimeout;
function copyTextToClipboard(text) {
  let textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.bottom= 0;
  textArea.style.left= 0;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  /*
  let copiedElement = document.createElement('copied-element');
  copiedElement.style.display = "inline-block"
  if(copiedTimeout) {
    clearTimeout(copiedTimeout);
  }

  copiedTimeout = setTimeout(()=>{

    copiedTimeout = undefined;
  },500);
  alert('You text was copied! Ready to paste!\n\nThanks for using our tool!\n- AlonsoAliaga');
  */
  alertCopied();
  document.body.removeChild(textArea);
}
function alertCopied() {
  if(copiedTimeout) {
    clearTimeout(copiedTimeout);
    var sb = document.getElementById("snackbar");
    sb.className = sb.className.replace("show", "");
  }
  var sb = document.getElementById("snackbar");

  //this is where the class name will be added & removed to activate the css
  sb.className = "show";

  copiedTimeout = setTimeout(()=>{ sb.className = sb.className.replace("show", ""); }, 3000);
}
let usPrefix = `<span style="color: #ff756b;font-size: small;">[EN] </span>`;
let esPrefix = `<span style="color: #ff756b;font-size: small;">[ES] </span>`;
let suggestions = [
  [
    `<span style="color: gold"><b>Tip #1:</b></span>`,
    `${usPrefix}<span style="font-size: small;">Use control + click to</span>`,
    `<span style="font-size: small;">copy texture value!</span>`,
    `${esPrefix}<span style="font-size: small;">Usa control + click para</span>`,
    `<span style="font-size: small;">copiar la textura!</span>`
  ],
  [
    `<span style="color: aqua"><b>Tip #2:</b></span>`,
    `${usPrefix}<span style="font-size: small;">Use your mouse button 'Forward'</span>`,
    `<span style="font-size: small;">and 'Back' to move between pages!</span>`,
    `${esPrefix}<span style="font-size: small;">Usa los botones laterales de tu</span>`,
    `<span style="font-size: small;">mouse para navegar entre paginas!</span>`
  ],
  [
    `<span style="color: lime"><b>Tip #3:</b></span>`,
    `${usPrefix}<span style="font-size: small;">Since BetterHeads version 2.0-BETA</span>`,
    `<span style="font-size: small;">You can use '/bheads get ID' command!</span>`,
    `${esPrefix}<span style="font-size: small;">Desde BetterHeads version 2.0-BETA</span>`,
    `<span style="font-size: small;">Puedes usar el comando '/bheads get ID'!</span>`
  ],
]
let suggestionIndex = 0;
let suggestionTimeout;

function alertSuggestions() {
  
  if(suggestions.length == 0) return;

  if(suggestionIndex >= suggestions.length) suggestionIndex = 0;

  if(suggestionTimeout) {
    clearInterval(suggestionTimeout);
    var sb = document.getElementById("suggestion-snackbar");
    sb.className = sb.className.replace("show", "");
  }
  var sb = document.getElementById("suggestion-snackbar");

  //this is where the class name will be added & removed to activate the css
  sb.className = "show";

  let array = suggestions[suggestionIndex];
  
  //console.log(sb.innerText);
  sb.innerHTML = array.join("<br>");

  suggestionTimeout = setTimeout(()=>{ sb.className = sb.className.replace("show", ""); }, 9250);
  
  suggestionIndex++;
}
function markAll() {
  for(let errorType of Object.keys(errorsFormat)) {
    let errorTypeOption = document.getElementById(`${errorType}-option`);
    if(errorTypeOption) {
      errorTypeOption.checked = true;
    }
  }
}
function unmarkAll() {
  for(let errorType of Object.keys(errorsFormat)) {
    let errorTypeOption = document.getElementById(`${errorType}-option`);
    if(errorTypeOption) {
      errorTypeOption.checked = false;
    }
  }
}
function test() {
  console.log("TESTING WORKS!")
}
let t = ["appearance","easy-movement-div","inputText","download-all"];
let optionsWithDark = ["giveCommandVersion"]
function toggleDarkmode() {
  //getElementsByClassName
    if (document.getElementById('darkmode').checked == true) {
      document.body.classList.add('dark');
      let currentLight = document.querySelectorAll(".lightbuttonboxes");
      for(let n of currentLight) {
        n.classList.replace("lightbuttonboxes", "darkbuttonboxes")
      }
      let currentHeadsLight = document.querySelectorAll(".head-icon-light");
      for(let n of currentHeadsLight) {
        n.classList.replace("head-icon-light", "head-icon-dark")
      }
      for(let n of optionsWithDark) {
        let d = document.getElementById(n);
        if(!d.classList.contains("dark")) d.classList.add("dark")
      }
      for(let n of  t) {
        let d = document.getElementById(n);
        if(d) {
          d.classList.replace("lightbuttonboxes", "darkbuttonboxes")
        }
      }
      let success = document.getElementById('success_message');
      if(success) {
        success.classList.replace("successlight", "successdark")
      }
      let popupContent = document.getElementById("popupContent");
      if(popupContent) {
        popupContent.style.backgroundColor = '#3c3c3c'
      }
    } else {
      document.body.classList.remove('dark');
      let currentDark = document.querySelectorAll(".darkbuttonboxes");
      for(let n of currentDark) {
        n.classList.replace("darkbuttonboxes", "lightbuttonboxes")
      }
      let currentHeadsDark = document.querySelectorAll(".head-icon-dark");
      for(let n of currentHeadsDark) {
        n.classList.replace("head-icon-dark", "head-icon-light")
      }
      for(let n of  t) {
        let d = document.getElementById(n);
        if(d) {
          d.classList.remove("darkbuttonboxes");
          d.classList.add("lightbuttonboxes");
        }
      }
      let success = document.getElementById('success_message');
      if(success) {
        success.classList.replace("successdark", "successlight")
      }
      for(let n of optionsWithDark) {
        let d = document.getElementById(n);
        d.classList.remove("dark")
      }
      let popupContent = document.getElementById("popupContent");
      if(popupContent) {
        popupContent.style.backgroundColor = '#cdcdcd'
      }
    }
    //console.log("Dark mode is now: "+(document.getElementById('darkmode').checked))
}
function toggleEasyMovement() {
  let easyMovementGlobalDiv = document.getElementById('easy-movement');
  let easyMovementGlobalTextDiv = document.getElementById('easy-movement-text');
  if(easyMovementGlobalDiv && easyMovementGlobalTextDiv) {
    easyMovementGlobal = easyMovementGlobalDiv.checked
    if(easyMovementGlobal) {
      easyMovementGlobalTextDiv.innerText = `Global Movement 🔍`;
    }else{
      easyMovementGlobalTextDiv.innerText = `Focus Movement 🔍`;
    }
  }
}
let scheduledTargetHeadID = -1;
function checkSite(window) {
  setTimeout(()=>{
    let href = window.location.href;
    if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) {
      try{document.title = `Page stolen from https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}`;}catch(e){}
      window.location = `https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}/mc-heads/`}
  });
  let search = window.location.search;
  //console.log(search)
  if(typeof search !== "undefined" && search.length > 0) {
    let finalString = search.slice(1);
    let parts = [];
    let isBase64 = true;
    try{
      parts = atob(finalString).split("&");
    }catch(e) {
      isBase64 = false;
      //console.log(`Search is not in base64`);
      parts = search.slice(1).split("&");
    }
    //let parts = atob(search.slice(1)).split("&");
    for(let part of parts) {
      let [k,v] = part.split("=");
      //console.log(search)
      if(k == atob("c2hvd2hlYWQ=")) {
        //console.log(`Detected showhead!`)
        try{
          let headData = JSON.parse(atob(v));
          popUpHeadData(headData);
        }catch(e) {}
      }else if(k == atob("aGVhZGlk")) {
        if(!isNaN(v) && parseInt(v) >= 0) {
          let headID = parseInt(v);
          if(loadingHeads) {
            scheduledTargetHeadID = headID;
          }else{
            //console.log(`Loading target Head ID #${headID}..`);
            popUpHeadData(headID);
          }
        }
      }
    }
  }
  setInterval(()=> {
    alertSuggestions();
  },15000);
}
function selectTab(evt, tabName, buttonName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  if(evt) {
    evt.currentTarget.className += " active";
  }else if(buttonName) {
    let b = document.getElementById(buttonName);
    if(b) b.className += " active";
  }
}
//const jsyaml = require("js-yaml");
function compareFiles() {
  clearResults();
  processed1 = undefined;
  processed2 = undefined;
  outputExtension = ".yml";
  let input1 = document.getElementById("current-config");
  let input2 = document.getElementById("new-config");
  let currentFile = input1.files[0];
  let newFile = input2.files[0];
  if(typeof currentFile == "undefined") {
    alert('Current configuration cannot be empty!');
    return;
  }
  let matchExtension = allowedExtensions.find(r=> currentFile.name.endsWith(r));
  if(!matchExtension) {
    alert(`Current configuration must be a valid yaml file!\nAllowed types: ${allowedExtensions.join(" ")}`);
    return;
  }
  if(typeof newFile == "undefined") {
    alert('New configuration cannot be empty!');
    return;
  }
  if(!allowedExtensions.find(r=> newFile.name.endsWith(r))) {
    alert(`New configuration must be a valid yaml file!\nAllowed types: ${allowedExtensions.join(" ")}`);
    return;
  }
  outputExtension = matchExtension;
  // console.log(`Attempting to compare '${currentFile.name}' & '${newFile.name}'`);
  input1.value = "";
  input2.value = "";
  var reader1 = new FileReader();
  //let schem1 = jsyaml.DEFAULT_SCHEMA;
  reader1.onloadend = function(event) {
    // console.log(`Starting load of ${currentFile.name}`)
    let result = event.target.result;
    // console.log(`Successfully result ${currentFile.name}`)
    //processed1 = result;
    //console.log(result);
    /*
    processed1 = jsyaml.load(result, { schem1 });
    console.log(`Successfully loaded ${currentFile.name}`)
    console.log(processed1)
    */
    //if(processed2) processComparator();

    //var reader2 = new FileReader();
    //let schem2 = jsyaml.DEFAULT_SCHEMA;
    reader1.onloadend = function(event2) {
      // console.log(`Starting load of ${newFile.name}`)
      let result2 = event2.target.result;
      // console.log(`Successfully result ${newFile.name}`)
      //processed2 = result2;
      //console.log(result2);
      //processed2 = jsyaml.load(result2, { schem2 });
      //console.log(`Successfully loaded ${newFile.name}`)
      //console.log(processed2)
      if(result) processComparator(result,result2);
    }

    reader1.readAsText(newFile)
  }
  reader1.readAsText(currentFile)
}
function mergeObjects(obj1, obj2) {
  const diff = {};
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (
        typeof obj2[key] === "object" &&
        obj2[key] !== null &&
        typeof obj1[key] === "object" &&
        obj1[key] !== null && !Array.isArray(obj2[key])
      ) {
        const nestedDiff = mergeObjects(obj1[key], obj2[key]);
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff;
        }
      } else if (!obj1.hasOwnProperty(key)/* || obj1[key] !== obj2[key]*/) {
        diff[key] = obj2[key];
        obj1[key] = obj2[key];
      }
    }
  }
  return diff;
}
let processed1;
let processed2;
let outputExtension;
let allowedExtensions = [".yaml",".yml",".txt"]
function processComparator(processedCurrent,processedNew) {
  let schem = jsyaml.DEFAULT_SCHEMA;
  let first = jsyaml.load(processedCurrent,schem)
  let second = jsyaml.load(processedNew,schem)
  let firstToModify = jsyaml.load(processedCurrent,schem)
  // console.log(first)
  // console.log(second)
  // setTimeout(() => {
  //   first["love"] = "HOLAAAAAAAAAAAAAAAAA";
  //   second["love"] = "HOLAAAAAAAAAAAAAAAAA 2222222222222222222";
  // }, 5000);
  // console.log(`Both files were proccessed!`);
  // //console.log(jsyaml)
  // console.log(`This is processed #1:`)
  // console.log(processed1)
  // console.log(`Successfully loaded #1`)
  // //processed1 = jsyaml.load(processedCurrent,schem);
  // console.log(processed1)
  // console.log(`This is processed #2:`)
  // console.log(processed2)
  // console.log(`Successfully loaded #2`)
  // //processed2 = jsyaml.load("Hello: 10",schem);
  // console.log(processed2)
  let resultsFull = document.getElementById("results");
  if(resultsFull) {
    resultsFull.style.display = "block";
  }
  selectTab(null, 'fixed-config',"f-c-b");
  let difference = mergeObjects(firstToModify,second);
  // console.log(`This is the new yaml #1:`)
  // console.log(firstToModify);
  // console.log(`This is difference:`)
  // console.log(difference);
  let fixedYAML = jsyaml.dump(firstToModify,{skipInvalid:true,lineWidth:-1,noCompatMode:true})
  let differenceYAML;
  if(Object.keys(difference).length === 0) {
    differenceYAML = "#We couldn't find any missing option. Your config is up-to-date!";
  }else{
    differenceYAML = jsyaml.dump(difference,{skipInvalid:true,lineWidth:-1,noCompatMode:true})
  }
  processed1 = fixedYAML;
  processed2 = differenceYAML;
  document.getElementById("output-fixed").innerText = fixedYAML;
  document.getElementById("output-differences").innerText = differenceYAML;
  // console.log(fixedYAML);
  // console.log(differenceYAML);
  //console.log(YAML)
}
function downloadAll() {
  let inputBox = document.getElementById(`inputText`);
  let content = `Original:\nUnknown input`;
  if(inputBox) content = `Original:\n${inputBox.value}\n\n`;
  let i = 1;
  for(let fontType of Object.keys(fonts)) {
    let data = fonts[fontType];
    let b = document.getElementById(`${fontType}-box`);
    if(b) {
      content+= `${i}. ${data.name}:\n${b.value}\n\n`;
    }
    i++;
  }
  content += `\n💎 Thanks for using our font generator tool! 👁‍🗨\n📩 File generated using https://alonsoaliaga.com/font-generator`
  const blob = new Blob([content], { type: 'text/text' });

  // Create a URL object with the Blob data
  const url = window.URL.createObjectURL(blob);
  
  // Create a link element with download attribute pointing to the URL object
  const link = document.createElement('a');
  link.download = `fonts-${Date.now().toString()}.txt`; // Set the download file name
  link.href = url; // Set the link href to the URL object
  
  // Append the link element to the document body
  document.body.appendChild(link);
  
  // Programmatically click the link to initiate the download of the YAML file
  link.click();

  // Remove the link element from the document body
  document.body.removeChild(link);

  // Revoke the URL object to free up system resources
  window.URL.revokeObjectURL(url);
}
function readFile(evt) {
  clearIssues();
  var files = evt.target.files;
  var file = files[0];    
  // console.log(`Attempting to read ${file}`);
  document.getElementById("log-file").value = "";
  var reader = new FileReader();
  reader.onload = function(event) {
    let result = event.target.result;
    processData(result);
  }
  reader.readAsText(file)
}
function checkYamlFile(evt) {
  var files = evt.target.files;
  var file = files[0];
  clearResults();
  processed1 = undefined;
  processed2 = undefined;
  document.getElementById("output-fixed").innerText = "Loading..";
  document.getElementById("output-differences").innerText = "Loading..";
  if(typeof file == "undefined") {
    let f = document.getElementById(evt.target.id);
    if(f) f.value = "";
    console.log(`Wrong! File is null: '${file.name}'`);
    alert('Configuration cannot be empty!');
    return;
  }
  let matchExtension = allowedExtensions.find(r=> file.name.endsWith(r));
  if(!matchExtension) {
    let f = document.getElementById(evt.target.id);
    if(f) f.value = "";
    console.log(`Wrong! File type not allowed: '${file.name}'`);
    alert(`Configuration must be a valid yaml file!\nAllowed types: ${allowedExtensions.join(" ")}`);
    return;
  }
  console.log(`Detected '${evt.target.id}' file!`);
}
window.onclick = function(event) {
  if (event.target == document.getElementById("error-full")) {
    clearIssues();
  }
}
function loadFonts() {
  let fontsTable = document.getElementById('fonts-table');
  if(fontsTable) {
    let s = "";
    let i = 1;
    for(let fontType of Object.keys(fonts)) {
      let fontData = fonts[fontType];
      s += `<div class="text-type"><div class="font-name-type ${(i % 2 === 0?"even":"odd")}">${i}. ${fontData.name}</div> <textarea readonly `+
        `id="${fontType}-box" class="fontsBoxes options" type="text" `+
        `checked id="${fontType}-option" onclick="copyTextToClipboard(this.textContent);"></textarea><label for="${fontType}-option" `+
        `></label><br></div>`
      fontData.processed = {};
      if(fontData.data && fontData.data.tosearch && fontData.data.toreplace &&
        fontData.data.tosearch.length == fontData.data.toreplace.length) {
          for (let i = 0; i < fontData.data.tosearch.length; i++) {
            fontData.processed[fontData.data.tosearch[i]] = fontData.data.toreplace[i];
          }
      }
      i++;
    }
    fontsTable.innerHTML = s;
  }
}
let loadingHeads = true;
function loadHeads() {
  let link = atob("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0Fsb25zb0FsaWFnYS9BbG9uc29BbGlhZ2FBUEkvbWFpbi9hcGkvaGVhZHMvZGF0YS5qc29u");
  $.ajax({
    url: link,
    type: "GET", /* or type:"GET" or type:"PUT" */
    dataType: "json",
    data: {
    },
    success: function (result) {
      if(typeof result.heads != "undefined") {
        for(let data of result.heads) {
          if(typeof data.id != "undefined" && typeof data.texture != "undefined") {
            let textureJson = JSON.parse(atob(data.texture));
            if(typeof textureJson.textures != "undefined") {
              let dSKIN = textureJson.textures.SKIN;
              if(typeof dSKIN != "undefined") {
                let dTextureUrl = dSKIN.url;
                if(typeof dTextureUrl != "undefined") {
                  let parts = dTextureUrl.split(/\/texture\//g);
                  if(parts.length >= 2) {
                    data["clean-texture"] = parts[1];
                    data["lower-tags"] = data.tags.map(s=>s.toLowerCase());
                    let loweredTagsWords = [];
                    for(let t of data.tags) {
                      loweredTagsWords = loweredTagsWords.concat(t.toLowerCase().split(/\s+/g));
                    }
                    data["lower-tags-words"] = loweredTagsWords;
                    headsMap.set(data.id,data);
                    if(!availableCategories.includes(data.category)) availableCategories.push(data.category);
                  }
                }
              }
            }
          }
        }
      }
      console.log(`Total heads: ${headsMap.size}`);

      //let allIds = [...headsMap.keys()]
      //let randomId = allIds[Math.floor(Math.random()* allIds.length)];
      //console.log(`Random ID: ${randomId}`);
      //let randomHeadData = headsMap.get(randomId);
      //console.log(randomHeadData);
      

      if(headsMap.size <= 10000) {
        document.title = `Minecraft Heads | AlonsoAliaga Development | ${headsMap.size} heads!`;
      }else{
        const roundedNumber = roundToNearestThousand(headsMap.size);
        document.title = `Minecraft Heads | AlonsoAliaga Development | Over ${roundedNumber} heads!`;
      }
      loadCategories();
      processSearch();
      loadingHeads = false;
      if(scheduledTargetHeadID != -1) {
        //console.log(`Loading scheduled Head ID #${scheduledTargetHeadID}..`);
        popUpHeadData(scheduledTargetHeadID);
      }
      //console.log(`Successfully loaded ${headsMap.size}/${result.heads.length}!`);
      
    },
    error: function (e) {
      console.log(e);
    }
  });
}
function roundToNearestThousand(number) {
  let round = Math.floor(number / 100);
  if(`${round}`.endsWith("0")) {
      return `${round/10}k`;
  }
  return `${round/10}k`;
}
function updateCategoryState(event) {
  //console.log(event);
  processSearch();
}
function loadCategories() {
  let categoriesSection = document.getElementById("categories-section");
  let s = "";
  for(let category of availableCategories) {
    s+=`${s.length === 0?"":" "}<div style="display: inline-block;font-family: MinecraftBold;padding: 5px 10px 5px 10px; margin: 5px" class="darkbuttonboxes">
      <input type="checkbox" onchange="updateCategoryState(event);" checked id="category-${category}-option" data-custom-attribute="${category}" style="display: inline-block;"></input>
      <label for="category-${category}-option" style="margin-bottom: 0px;margin-top: 0px;"> ${category.slice(0,1).toUpperCase()}${category.slice(1)}</label>
      </div>`
  }
  categoriesSection.innerHTML = s;
}
let times = 0;
function loadCounter() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hbGlhZ2EtcGFnZS1jb3VudC5nbGl0Y2gubWUvY291bnRlcj9zaXRlPTxzaXRlPiZrZXk9PGtleT4=")
  .replace(/<site>/g,"mc-heads").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("visitor-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
       if(isNaN(result))
         document.getElementById("counter-amount").innerHTML = "Click to return!";
       else document.getElementById("counter-amount").innerHTML = `Visits: ${result}`;
     },
     error: function (e) {
       times++;
       document.getElementById("counter-amount").innerHTML = "Click to return!";
       if(times <= 1) {
        setTimeout(()=>{
          loadCounter();
        },1000*10);
       }
     }
   });
 }
}
function updateOutputBackup(event) {
  //console.log(event)
  if(event && typeof event.style !== "undefined") {
    event.style.height = "1px";
    console.log(`event.scrollHeight: ${event.scrollHeight}`)
    event.style.height = ((event.scrollHeight - 13))+"px";
  }
  let inputText = document.getElementById("inputText");
  if(inputText) {
    //console.log(`Input: ${inputText.value}`)
    let theText;
    if(!inputText.value || inputText.value.length === 0) theText = "Type your text above"
    else theText = inputText.value;
    for(let identifier of Object.keys(fonts)) {
      let toUpdate = document.getElementById(`${identifier}-box`)
      if(toUpdate) {
        let fontData = fonts[identifier];
        let toModify = theText;
        let toUse = "";
        if(typeof fontData.before != "undefined") {
          toModify = fontData.before(toModify);
        }
        let processed = fontData.processed;
        for (let i = 0; i < toModify.length; i++) {
          toUse += processed[toModify[i]] || toModify[i];
        }
        if(typeof fontData.after != "undefined") {
          toUse = fontData.after(toUse);
        }
        toUpdate.innerText = toUse.replace(/\r\n/g,"<br>");
        console.log(toUse);
        console.log(toUpdate.innerText);
      }
    }
  }
}
const popupContainer = document.getElementById('popupContainer');
const closeButton = document.getElementById('closeButton');
function addListeners() {
  const lockedText = document.querySelectorAll('.locked-text');
  for(let locked of lockedText) {
    locked.addEventListener("input", function () { 
      console.log(`Input detected in: ${locked.id}: ${this.value}`)
      console.log(this.dataset)
      if(this && this.dataset && this.dataset.lockedtextvalue) {
        this.value = this.dataset.lockedtextvalue;
      }
    }, false);
    locked.onclick = function() {
      copyTextToClipboard(this.value);
    }
  }

  closeButton.addEventListener('click', function() {
    popupContainer.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === popupContainer) {
      popupContainer.style.display = 'none';
    }
  });
  usernameInput.addEventListener("keyup", function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      processSearch();
    }
  });
}
function updateCurrentHeads(headsMapToProcess) {
  currentHeads = new Map();
  let theCurrentPage = 1;
  for (const [key, value] of headsMapToProcess) {
    const currentPageMap = currentHeads.get(theCurrentPage) || new Map();
    currentPageMap.set(key, value);
    currentHeads.set(theCurrentPage, currentPageMap);
    if (currentPageMap.size === maxPerPage) {
      theCurrentPage++;
    }
  }
  /*
  if(currentHeads.size == 0){
    console.log(`Couldn't find any head!`)
  }else{
    console.log(`Total Pages: ${currentHeads.size}`)
    for(let [k,v] of currentHeads) {
      //console.log(`Page #${k}: ${v.size} heads`)
    }
  }
  */
}
/*
function checkClick(data,event) {
  console.log(`Detected onmousedown ${data} | ${event}`);
  if(headsMap.has(data)) {
    //console.log(`Detected valid head #${data}`);
    let headData = headsMap.get(data);

    if(typeof event != "undefined") {
      if(event.button == 1 || 1 == event.button & 2) { //Middle click?
        let headData = headsMap.get(data);
        let control = event.ctrlKey;
        console.log(`Middle click was detected in head #${headData.id} | Control: ${control}`)
        console.log(headData)
        //window.open(`https://alonsoaliaga.github.io/mc-heads?headid=${headData.id}`, "_blank");
        //console.log(event)
        //window.open(window.location.href,'_self');

        let url = `https://alonsoaliaga.github.io/mc-heads?headid=${headData.id}`;
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        //link.click();
        middleClick(link);
        document.body.removeChild(link);
        //window.focus();
      }
    }
  }
}
*/
function popUpHeadData(data,event) {
  //console.log(`Detected ${data} | ${event} | data=${typeof data}`);
  if(headsMap.has(data) || typeof data === "object") {
    //console.log(`Detected valid head #${data}`);
    let headData;
    if(typeof data === "object") {
      headData = data;
    }else {
      headData = headsMap.get(data);
    }

    if(typeof event != "undefined") {
      if(event.ctrlKey) {
        event.preventDefault();
        headData = headsMap.get(data);
        copyTextToClipboard(headData.texture);
        alertCopied();
        return;
      }else if(true) {
        event.preventDefault();
      }else if(event.button == 1 || 1 == event.button & 2) { //Middle click?
        /*
        let headData = headsMap.get(data);
        console.log(`Middle click was detected in head #${headData.id}`)
        console.log(headData)

        event.preventDefault();
      }else{
        event.preventDefault();
        /*
        console.log(`Detected in head #${headData.id} =>`)
        console.log(`event.button=${event.button}`)
        console.log(`event.which=${event.which}`)
        console.log(`event.button&2=${event.button == 1 || 1 == event.button & 2}`)
        console.log(`-----------------------------------------------------`)
        */
      }
    }
    //console.log(headData)
    let title = document.getElementById("popupTitle");
    title.innerText = headData.name;

    let popupHeadID = document.getElementById("popupHeadID");
    popupHeadID.value = headData.id;
    popupHeadID.dataset.lockedtextvalue = `${headData.id}`;

    let popUpImage = document.getElementById("popupHeadImage");
    popUpImage.src = getHeadImageURL(headData);
    popUpImage.alt = headData.name||"Unknown";

    let popupBetterHeadsCommand = document.getElementById("popupBetterHeadsCommand");
    popupBetterHeadsCommand.value = `/betterheads get ${headData.id}`;
    popupBetterHeadsCommand.dataset.lockedtextvalue = `/betterheads get ${headData.id}`;

    let popupMinecraftTexture = document.getElementById("popupMinecraftTexture");
    popupMinecraftTexture.value = `http://textures.minecraft.net/texture/${headData["clean-texture"]}`;
    popupMinecraftTexture.dataset.lockedtextvalue = `http://textures.minecraft.net/texture/${headData["clean-texture"]}`;

    let popupTextureValue = document.getElementById("popupTextureValue");
    popupTextureValue.value = headData.texture;
    popupTextureValue.dataset.lockedtextvalue = headData.texture;

    let popupHeadTags = document.getElementById("popupHeadTags");
    popupHeadTags.innerText = headData.tags.length == 0 ? `No tags found` : headData.tags.join(", ");

    let currentheadid = document.getElementById("currentheadid");
    currentheadid.innerText = data;

    //console.log(headData)
    updateCommand(null,headData);

    popupContainer.style.display = 'block';
  }else{
    console.log(`Unknown head #${data}`);
  }
}
const defaultMinecraftCommandVersions = {
  "1_8to1_12_2": {
    name: "1.8 -> 1.12.2",
    commandFormat: `/minecraft:give @p minecraft:skull 1 3 {display:{Name:"{HEAD_NAME}"},SkullOwner:{Id:"{UUID}",Properties:{textures:[{Value:"{TEXTURE}"}]}}}`
  },
  "1_13to1_15_1": {
    name: "1.13 -> 1.15.1",
    commandFormat: `/minecraft:give @p minecraft:player_head{display:{Name:"{\\"text\\":\\"{HEAD_NAME}\\"}"},SkullOwner:{Id:"{UUID}",Properties:{textures:[{Value:"{TEXTURE}"}]}}} 1`
  },
  "1_16+": {
    name: "1.16+",
    commandFormat: `/minecraft:give @p minecraft:player_head{display:{Name:"{\\"text\\":\\"{HEAD_NAME}\\"}"},SkullOwner:{Id:{1_16_FORMAT_UUID},Properties:{textures:[{Value:"{TEXTURE}"}]}}} 1`
  },
}
const uuidBytes = new Uint8Array(16);
const uuidView = new DataView(uuidBytes.buffer);
const UUID_GROUP_SIZES = [8, 4, 4, 4, 12];
function to1_16UUIDFormat(uuid) {
	uuid = uuid.trim();
	if (uuid.includes('-')) {
		uuid = uuid
			.split('-')
			.map((g, i) => g.padStart(UUID_GROUP_SIZES[i], '0'))
			.join('');
	} else {
		uuid = uuid.padStart(32, '0');
	}
	uuidView.setBigUint64(0, BigInt('0x' + uuid.substring(0, 16)), false);
	uuidView.setBigUint64(8, BigInt('0x' + uuid.substring(16)), false);
    let array = [];
    for(let i = 0; i < 4; i++) {
        array[i] = uuidView.getInt32(i * 4, false)
    }
    return `[I;${array.join(",")}]`;
}
function addDefaultCommandVersions() {
  //console.log(`Adding default command versions..`);
  let giveCommandVersion = document.getElementById("giveCommandVersion");
  if(giveCommandVersion) {
    for(let value of Object.keys(defaultMinecraftCommandVersions)) {
      let preset = defaultMinecraftCommandVersions[value];
      if(preset.name && preset.name.length > 0) {
        //console.log(`Adding ${preset.name} with value ${value}`);
        let option = document.createElement('option');
        option.innerHTML = preset.name;
        option.setAttribute("value",`${value}`);
        giveCommandVersion.appendChild(option);
      }
    }
  }
}
function updateCommand(data,headData) {
  let versionData;
  if(data && data.target && typeof data.target.value != "undefined") {
    versionData = defaultMinecraftCommandVersions[data.target.value];
  }else{
    let giveCommandVersion = document.getElementById("giveCommandVersion");
    if(giveCommandVersion) {
      if(typeof giveCommandVersion.value != "undefined") {
        versionData = defaultMinecraftCommandVersions[giveCommandVersion.value];
      }
    }
    if(typeof versionData == "undefined"){
      versionData = defaultMinecraftCommandVersions["1_8to1_12_2"];
    }
  }
  if(versionData) {
    if(!headData) {
      let currentheadid = document.getElementById("currentheadid");
      //console.log(currentheadid);
      //console.log(currentheadid.innerText);
      headData = headsMap.get(parseInt(currentheadid.innerText));
      if(!headData) return;
      //console.log(`Obtaining ID from element: ${headData.id}`);
    }
    //else console.log(`Head ID available from event: ${headData.id}`);
    let popupObtainViaGiveCommand = document.getElementById("popupObtainViaGiveCommand");
    let command = versionData.commandFormat.replace(/{UUID}/g,headData.uuid)
      .replace(/{HEAD_NAME}/g,headData.name).replace(/{TEXTURE}/g,headData.texture);
    if(versionData.commandFormat.includes("{1_16_FORMAT_UUID}")) {
      command = command.replace(/{1_16_FORMAT_UUID}/g,to1_16UUIDFormat(headData.uuid))
    }
    popupObtainViaGiveCommand.innerText = command;
  }
}
function splitStringByLength(string, length) {
  const splitStrings = [];
  let startIndex = 0;

  while (startIndex < string.length) {
    splitStrings.push(string.substr(startIndex, length));
    startIndex += length;
  }

  return splitStrings;
}
let currentHeads = new Map();
currentHeads.set(1,new Map());
let pagesContainerTop = document.getElementById('pages-container-top');
let pagesContainerBotton = document.getElementById('pages-container-botton');
function processSearch() {
  currentPage = 1;
  let headsTable = document.getElementById('heads-table');
  if(headsTable) {
    let toSearchList = inputText.value.trim().toLowerCase().split(/\s+/g).map(s=>s.replace(/_/g," "));
    //Options to add
    let selectedCategories = [];
    let categoriesSection = document.getElementById('categories-section');
    for(let a of categoriesSection.children) {
      let input = a.querySelector('input');
      //console.log(input);
      if(input && input.dataset && input.dataset.customAttribute) {
        if(input.checked) selectedCategories.push(input.dataset.customAttribute);
      }
    }
    if(selectedCategories.length == availableCategories.length) selectedCategories = [];
    //console.log(`Available categories: ${availableCategories.join(",")}`)
    let includeTags = document.getElementById('include-tags-option').checked;
    let wordMatch = document.getElementById('word-match-option').checked;
    if(toSearchList.length == 1 && toSearchList[0].length == 0){
      wordMatch = false;
      console.log(`Search terms is empty. Ignoring word match..`)
    }
    //End of options
    //console.log(`################################################`)
    //console.log(`Searching for: ${toSearchList.join(",")}`);
    //console.log(`Searching in tags too: ${includeTags}`);
    //console.log(`Categories to search: ${selectedCategories.length == 0 ? "All":selectedCategories.join(", ")}`);
    let matchHeadsMap = new Map();
    if(selectedCategories.length == 0) {
      for(let [id,headData] of headsMap) {
        for(let toSearch of toSearchList) {
          if(wordMatch) {
            if(headData.name.toLowerCase().split(/\s+/g).includes(toSearch)) {
              matchHeadsMap.set(id,headData);
              continue;
            }
            if(includeTags){
              if(headData["lower-tags-words"].includes(toSearch)) {
                matchHeadsMap.set(id,headData);
                continue;
              }
            }
          }else{
            if(headData.name.toLowerCase().includes(toSearch)) {
              matchHeadsMap.set(id,headData);
              continue;
            }
            if(includeTags){
              for(let loweredTag of headData["lower-tags"]) {
                if(loweredTag.includes(toSearch)) {
                  matchHeadsMap.set(id,headData);
                  continue;
                }
              }
            }
          }
        }
      }
    }else{
      for(let [id,headData] of headsMap) {
        if(selectedCategories.includes(headData.category)) {
          for(let toSearch of toSearchList) {
            if(wordMatch) {
              if(headData.name.toLowerCase().split(/\s+/g).includes(toSearch)) {
                matchHeadsMap.set(id,headData);
                continue;
              }
              if(includeTags){
                if(headData["lower-tags-words"].includes(toSearch)) {
                  matchHeadsMap.set(id,headData);
                  continue;
                }
              }
            }else{
              if(headData.name.toLowerCase().includes(toSearch)) {
                matchHeadsMap.set(id,headData);
                continue;
              }
              if(includeTags){
                for(let loweredTag of headData["lower-tags"]) {
                  if(loweredTag.includes(toSearch)) {
                    matchHeadsMap.set(id,headData);
                    continue;
                  }
                }
              }
            }
          }
        }
      }
    }
    //console.log(`Found a total of: ${matchHeadsMap.size} heads!`)
    updateCurrentHeads(matchHeadsMap);
    showHeads();
  }
}
window.addEventListener("mouseup", (e) => {
  if(!easyMovementGlobal) return;
  let buttonId = e.button;
  if(buttonId == 3) {//Previous
    e.preventDefault();
    let newPageButton = Math.max(1,Math.min(currentHeads.size,currentPage - 1));
    if(currentPage == newPageButton) return;
    console.log(`New page: ${currentPage}->${newPageButton}`);
    currentPage = newPageButton;
    showHeads();
    //setTimeout(()=>showHeads(),1000);
  }else if(buttonId == 4) {//Next
    e.preventDefault();
    let newPageButton = Math.max(1,Math.min(currentHeads.size,currentPage + 1));
    if(currentPage == newPageButton) return;
    console.log(`New page: ${currentPage}->${newPageButton}`);
    currentPage = newPageButton;
    showHeads();
  }
});
function viewPageMouse(e) {
  if(easyMovementGlobal) return;
  let buttonId = e.button;
  //console.log(`Pressed mouse button: ${buttonId}`);
  if(buttonId == 3) {//Previous
    e.preventDefault();
    let newPageButton = Math.max(1,Math.min(currentHeads.size,currentPage - 1));
    if(currentPage == newPageButton) return;
    console.log(`New page: ${currentPage}->${newPageButton}`);
    currentPage = newPageButton;
    showHeads();
    //setTimeout(()=>showHeads(),1000);
  }else if(buttonId == 4) {//Next
    e.preventDefault();
    let newPageButton = Math.max(1,Math.min(currentHeads.size,currentPage + 1));
    if(currentPage == newPageButton) return;
    console.log(`New page: ${currentPage}->${newPageButton}`);
    currentPage = newPageButton;
    showHeads();
  }
}
function viewPage(newPage) {
  currentPage = newPage;
  showHeads();
}
function updatePages() {
  let darkMode = document.getElementById('darkmode').checked;
  if(currentHeads.size == 0) {
    pagesContainerTop.innerHTML = ``;
    pagesContainerBotton.innerHTML = ``;
    //pagesContainer.innerHTML = `<input type="checkbox" checked id="gotopage-0"></input>
    //<label class="${darkMode?"darkbuttonboxes":"lightbuttonboxes"}" for="gotopage-0" style="text-align: center;padding: 5px;margin-bottom: 0px;margin-top: 0px;"> 0 </label>`;
  }else{
    let pagesToDisplay = generateLinkedPagesArray(nearPageRange);
    let s = "";
    for(let page of pagesToDisplay) {
      let colorClass;
      if(darkMode) {
        colorClass = page == currentPage ? "lightbuttonboxes" : "darkbuttonboxes";
      }else{
        colorClass = page == currentPage ? "darkbuttonboxes" : "lightbuttonboxes";
      }
      if(isNaN(page)) {
        s+= `<input type="checkbox" checked id="gotopage-none"></input>
        <label class="${colorClass}" for="gotopage-none" style="text-align: center;padding: 5px 5px 5px 10px; margin-bottom: 0px;margin-top: 0px;">  ${page}  </label>`;
      }else{
        s+= `<input type="checkbox" checked id="gotopage-${page}" onclick="viewPage(${page});"}></input>
        <label class="${colorClass}" for="gotopage-${page}" style="text-align: center;padding: 5px 5px 5px 10px; margin-bottom: 0px;margin-top: 0px;">  ${page}  </label>`;
      }
    }
    pagesContainerTop.innerHTML = s;
    pagesContainerBotton.innerHTML = s;
  }
}
let headsTable = document.getElementById('heads-table');
let headAPIs = {
  1: {
    baseurl: atob("aHR0cHM6Ly92aXNhZ2Uuc3VyZ2VwbGF5LmNvbS9oZWFkLzUxMi97Q0xFQU5fVEVYVFVSRX0ucG5nP25vPXNoYWRvdyZ5PTcw")
  },
  2: {
    baseurl: atob("aHR0cHM6Ly9tYy1oZWFkcy5uZXQvaGVhZC97Q0xFQU5fVEVYVFVSRX0=")
  }
}
let headApiMode = 1
function showHeads() {
  let darkMode = document.getElementById('darkmode').checked;
  if(currentHeads.size == 0) {
    headsTable.style.display = "block";
    currentPage = 1;
    headsTable.innerHTML = `<img id="popupHeadImage" src="https://i.imgur.com/zHZd4Uj.png" alt="BetterHeads" style="width: 300px;height: auto;"><br><span style="font-size: 50px"><b>Couldnt't find heads!</b></span><br>`;
  }else{
    headsTable.style.display = "flex";
    let s = "";
    currentPage = Math.max(1,Math.min(currentPage,currentHeads.size));
    let pagedHeads = currentHeads.get(currentPage);
    for(let [k,v] of pagedHeads) {
      let showEnconde = btoa(JSON.stringify(v));
      s+= `<div class="head-icon ${darkMode?"head-icon-dark":"head-icon-light"}" onclick="popUpHeadData(${v.id},event);" id="head-${v.id}">
      <a href="https://alonsoaliaga.github.io/mc-heads?showhead=${showEnconde}"><img src="${getHeadImageURL(v)}" alt="${v.name||"Unknown"}" onerror="loadImageFailed();"></a><br>
        ${v.name||"Unknown"}
      </div>`
    }
    headsTable.innerHTML = s;
  }
  updatePages();
}
/*
function middleClick(element) {
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent(
    'click',        // event type
    true,           // can bubble
    true,           // cancelable
    window,         // in view
    0,              // click count
    0,              // screen X coordinate
    0,              // screen Y coordinate
    0,              // client X coordinate
    0,              // client Y coordinate
    false,          // control key
    false,          // alt key
    false,          // shift key
    true,           // meta key
    2,              // button (1: left, 2: middle, 3: right)
    null            // related target
  );
  element.dispatchEvent(event);
}
*/
function getHeadImageURL(headData) {
  return headAPIs[headApiMode].baseurl.replace(/{CLEAN_TEXTURE}/g,headData["clean-texture"]);
}
let alerted = false;
function loadImageFailed() {
  if(!alerted) {
    alerted = true;
    console.log(`Error loading images. If you read this contact support team!`)
  }
}
function generateLinkedPagesArray(range = 3) {
  let totalPages = currentHeads.size;
  const linkedPages = [];
  let startPage = Math.max(1, currentPage - range);
  let endPage = Math.min(totalPages, currentPage + range);
  if (endPage - startPage < range * 2) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + range * 2);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - range * 2);
    }
  }
  if (startPage !== 1) {
    linkedPages.push(1);
    if (startPage !== 2) {
      linkedPages.push('...');
    }
  }
  for (let page = startPage; page <= endPage; page++) {
    linkedPages.push(page);
  }
  if (endPage !== totalPages) {
    if (endPage !== totalPages - 1) {
      linkedPages.push('...');
    }
    linkedPages.push(totalPages);
  }
  return linkedPages;
}
function updateOutput(event) {
  //console.log(event)
  let inputText = document.getElementById("inputText");
  if(event && typeof event.style !== "undefined") {
    event.style.height = "1px";
    //console.log(`event.scrollHeight: ${event.scrollHeight}`)
    event.style.height = ((event.scrollHeight - 10))+"px";
  }else{
    inputText.style.height = "1px";
    //console.log(`event.scrollHeight: ${event.scrollHeight}`)
    inputText.style.height = ((inputText.scrollHeight - 8))+"px";
  }
  if(inputText) {
    let textLines = inputText.value.split("\n");
    if(inputText.value.replace(/\n/g,"").trim().length == 0) textLines = ["Type your text above AH!!"];
    //console.log(textLines)
    //console.log(`Input: ${inputText.value}`)
    //let theText;
    //if(!inputText.value || inputText.value.length === 0) theText = "Type your text above"
    //else theText = inputText.value;
    for(let identifier of Object.keys(fonts)) {
      let toUpdate = document.getElementById(`${identifier}-box`)
      if(toUpdate) {
        let fontData = fonts[identifier];
        let textToModify = textLines.concat();
        let newTextLines = [];
        for(let line of textToModify) {
          let toModify = line;
          let toUse = "";
          if(typeof fontData.before != "undefined") {
            toModify = fontData.before(toModify);
          }
          let processed = fontData.processed;
          for (let i = 0; i < toModify.length; i++) {
            toUse += processed[toModify[i]] || toModify[i];
          }
          if(typeof fontData.after != "undefined") {
            toUse = fontData.after(toUse);
          }
          newTextLines.push(toUse);
        }
        toUpdate.innerHTML = newTextLines.join("\r\n");
        toUpdate.style.height
        //console.log(`${identifier} scrollHeight: ${toUpdate.scrollHeight}`)
        toUpdate.style.height = "1px";
        toUpdate.style.height = ((toUpdate.scrollHeight - 5))+"px";
        //toUpdate.innerText = toUse.replace(/\r\n/g,"<br>");
        //console.log(toUse);
        //console.log(toUpdate.innerText);
      }
    }
  }
}
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
      window.scrollTo(0, 0);
  }
}
toggleDarkmode();
toggleEasyMovement();
addDefaultCommandVersions();
loadHeads();
//updateOutput();
addListeners();