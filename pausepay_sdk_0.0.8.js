/* ====== version 0.0.8  )))) */
var pausepay_sdk = 
function()
{
  
 const version = 'v.0.0.8';
 const BASE_URL = `https://sdk-web.pausepay.it/embeddable/${version}`;
console.log("======== PausePay WooCommerce "+version);


/* ===== Load GTAG for WebWidgets ====== */
var script_tag = document.createElement('script');
script_tag.setAttribute("type","text/javascript");
script_tag.innerHTML = `
<!-- Google Tag Manager -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PFFQLQ8');
<!-- End Google Tag Manager -->
`;
document.getElementsByTagName("head")[0].appendChild(script_tag);

var script_tag = document.createElement('noscript');
script_tag.innerHTML = `
<!-- Google Tag Manager (noscript) -->
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PFFQLQ8"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
<!-- End Google Tag Manager (noscript) -->
`;
document.getElementsByTagName("body")[0].appendChild(script_tag);


/* ===== Load specific JQuery for PausePay (no conflict) ==== */

var head = document.getElementsByTagName("head")[0];
// save original jquery
var script_tag0 = document.createElement('script');
script_tag0.setAttribute("type","text/javascript");
script_tag0.innerHTML= `
                         var pp_jQuery = jQuery;
                         console.log('[Original] jQuery v.'+jQuery().jquery);    
                         console.log('[PausePay SDK] pp_jQuery v.'+pp_jQuery().jquery);                         
                        `;
head.appendChild(script_tag0); 
jqueryReady();



function jqueryReady() 
{ // Called once jQuery is loaded    
    pp_jQuery(document).ready(function() 
    {
        main();
    });
}


function main()
{
 loadLibraries(); 
 modal_how_it_works();
 renderUntilAllVisible();   
}


function renderUntilAllVisible()
{ 
 try { if(!pp_jQuery) {} }
 catch(e){ setTimeout(() => { renderUntilAllVisible(); }, 1000); return;}

    console.log("pausepay renderUntilAllVisible");
   if( !checkIfAllElementsAreVisible(pp_jQuery(".pausepay")))
       { setTimeout(() => { renderUntilAllVisible(); }, 3000); return;}
   else
       { renderBanners(); }
}
renderUntilAllVisible();




function checkIfAllElementsAreVisible(elms) 
{
 if(!elms || elms.length == 0) {return false;}
 for(let i in elms)
     {
         try {
                 var elm = elms[i];
                 var bounding = elm.getBoundingClientRect();
                 if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight) 
                     { /*is visible */
                       continue;
                     }
                 else  
                    { // not yet visible
                      return false;
                    }
             }
         catch(e){}
     }
    return true;
 }   


function modal_how_it_works()
{
 
  var modal = `
  <style>
  
  .pausepay.pp_how_it_works .dot_step,
  .pausepay.pp_wanna_try .dot_step,
  .pausepay.pp_checkout_help .dot_step,
  .pausepay.pp_checkout_start .dot_step
  {
      border-radius:100px; background-color: #00AF8C; 
      width:40px; height:40px; 
      text-align:center; margin:auto;
      display: flex; justify-content: center; align-items: center;
      border-style: solid;
      border-color:white;
  }
  
  .pausepay.pp_how_it_works .dot_step img,
  .pausepay.pp_wanna_try .dot_step img,
  .pausepay.pp_checkout_help .dot_step img,
  .pausepay.pp_checkout_start .dot_step img
  {
    width:25px;
  }
  </style>
  
  <!-- how it works -->
  <div  class="pausepay pp_how_it_works" style="display:none;">
      <div style="text-align:center;">
          <img src="https://sdk-web.pausepay.it/images/solo scritta.svg" style="margin:auto; height:40px;">
      </div>
      <div style="text-align:left; font-size:16px; line-height: 20px;  margin-bottom:15px;">
          Il primo metodo di pagamento online B2B dilazionato, con bonifico a 90 giorni in unica soluzione.
          <br>
          Per pagamenti compresi tra 500€ e 20.000€
      </div>
  
      <div style="height:3px; margin:auto; margin-bottom: -25px; margin-top:30px; width:80%;  background-color: rgb(231, 231, 231);"></div>
  
      <div style="display:flex; font-size: xx-small;">
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/cart.svg">
              </div>
              Check-Out
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/pause.svg">
              </div>
              Bonifico in Pausa
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/box.svg">
              </div>
              Ricevi la merce
  
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/calendar.svg">
              </div>
              Attendi 90 giorni
  
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/play.svg">
              </div>
              Addebito
          </div>                        
      </div>
  
      <hr>
      
      <div style=" text-align:left; font-size:14px; line-height: 20px; margin-left:10px;">
          <div>
              <ol>
              <li> Aggiungi al carrello gli articoli da acquistare</li>
              <li> In fase di check-out scegli 
                  <img src="https://sdk-web.pausepay.it/images/solo scritta.svg" style="margin:auto; height:20px;">
              </li>
              <li> 
                   Se è la tua prima volta, scegli la tua banca da utilizzare per il pagamento tramite <b>Open Banking</b>
                   <br>
                   <span style="font-size:9px;">Potrebbe interessarti <a href="https://pausepay.it/tutela-e-sicurezza-dei-dati-bancari/" target="_blank"><u>Tutela Credenziali Bancarie</u></a></span>
              </li>
              <li> Autorizza il pagamento irrevocabile dilazionato a 90 giorni</li>
              <li> Noi anticipiamo l'importo al venditore, e tu ricevi subito la merce!</li>
              </ol>
          </div>
  
  
          <div style="text-align:left; font-size:16px; line-height: 20px;  margin-bottom:15px; text-align: center;;">
              Domande?
          </div>
  
  
          <div style="display:flex; justify-content:space-around;">
  
              <div style="display: flex; justify-content: space-between; align-items:center;">
                  <div style="width:45%;">
                      <a class="pausepay" id="pp_support"  href="https://sdk-web.pausepay.it/help_desk.html" target="_blank"
                          onclick="window.open(this.href, 'mywin', 'left=20,top=20,width=500,height=890,toolbar=1,resizable=0'); return false;">
                          <div class="pausepay pp_button">
                              <div class="dot_step" style="background-color: white;">
                                  <img src="https://sdk-web.pausepay.it/icons/support_green.svg">
                              </div>                        
                              <div>Chatta con un operatore</div>
                          </div>
                      </a>
                  </div>                                    
                  <div style="width:45%;">
                      <a class="pausepay" id="pp_website_buyer" href="https://pausepay.it/compra-ora-paga-dopo-90giorni-b2b-bnpl/" target="_blank">
                          <div class="pausepay pp_button">
                              <div class="dot_step" style="background-color: white;">
                                  <img src="https://sdk-web.pausepay.it/icons/website_green.svg">
                              </div>                        
                              <div>Visita il nostro sito</div>
                          </div>
                      </a>
                  </div>     
              </div>                               
          </div>
      </div>
      <br>
      <div style="text-align: center;">
          <img  style="height:18px; margin:auto;" src="https://sdk-web.pausepay.it/images/allianzTrade.svg"> 
      </div>             
  </div>


  <!-- wanna try? -->
  <div  class="pausepay pp_wanna_try" style="display:none;">
      <div style="text-align:center;">
          <img src="https://sdk-web.pausepay.it/images/solo scritta.svg" style="margin:auto; height:40px;">
      </div>
      <div style="text-align:left; font-size:16px; line-height: 20px;  margin-bottom:15px;">
          Il primo metodo di pagamento online B2B dilazionato, con bonifico a 90 giorni in unica soluzione.
          <br>
          Per pagamenti compresi tra 500€ e 20.000€
      </div>
  
      <div style="height:3px; margin:auto; margin-bottom: -25px; margin-top:30px; width:80%;  background-color: rgb(231, 231, 231);"></div>
  
      <div style="display:flex; font-size: xx-small;">
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/cart.svg">
              </div>
              Check-Out
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/pause.svg">
              </div>
              Bonifico in Pausa
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/box.svg">
              </div>
              Ricevi la merce
  
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/calendar.svg">
              </div>
              Attendi 90 giorni
  
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/play.svg">
              </div>
              Addebito
          </div>                        
      </div>
  
      <hr>
      
      <div style=" text-align:left; font-size:14px; line-height: 20px; margin-left:10px;">
          <div>
              Svincolati dal plafond della carta di credito. Noi anticipiamo subito l'importo al venditore, tu paghi a 90 giorni.
              <ul style="margin-top:10px;">
                  <li>Procedi con il checkout, dovrai collegare un conto aziendale.</li>
                  <li>Ricevi l'esito di ammissibilità in pochi secondi.</li>
                  <li>Autorizza il pagamento a 90 giorni.</li>
                  <li>L'importo sul tuo conto non sarà vincolato, ma dovrà essere disponibile al momento del checkout, e al 90° giorno.</li>
              </ul>
             
          </div>
          <br>
  
          <div style="text-align:left; font-size:16px; line-height: 20px;  margin-bottom:15px; text-align: center;;">
              Domande?
          </div>
  
  
          <div style="display:flex; justify-content:space-around;">
  
              <div style="display: flex; justify-content: space-between; align-items:center;">
                  <div style="width:45%;">
                      <a class="pausepay" id="pp_support"  href="https://sdk-web.pausepay.it/help_desk.html" target="_blank"
                          onclick="window.open(this.href, 'mywin', 'left=20,top=20,width=500,height=890,toolbar=1,resizable=0'); return false;">
                          <div class="pausepay pp_button">
                              <div class="dot_step" style="background-color: white;">
                                  <img src="https://sdk-web.pausepay.it/icons/support_green.svg">
                              </div>                        
                              <div>Chatta con un operatore</div>
                          </div>
                      </a>
                  </div>                                    
                  <div style="width:45%;">
                      <a class="pausepay" id="pp_website_buyer" href="https://pausepay.it/compra-ora-paga-dopo-90giorni-b2b-bnpl/" target="_blank">
                          <div class="pausepay pp_button">
                              <div class="dot_step" style="background-color: white;">
                                  <img src="https://sdk-web.pausepay.it/icons/website_green.svg">
                              </div>                        
                              <div>Visita il nostro sito</div>
                          </div>
                      </a>
                  </div>     
              </div>                               
          </div>
      </div>
      <br>
      <div style="text-align: center;">
          <img  style="height:18px; margin:auto;" src="https://sdk-web.pausepay.it/images/allianzTrade.svg"> 
      </div>             
  </div>


  <!-- checkout help -->
  <div  class="pausepay pp_checkout_help" style="display:none;">
      <div style="text-align:center;">
          <img src="https://sdk-web.pausepay.it/images/solo scritta.svg" style="margin:auto; height:40px;">
      </div>
      <div style="text-align:left; font-size:16px; line-height: 20px;  margin-bottom:15px;">
          Bonifico dilazionato a 90 giorni, senza vincolare l'importo sul conto. 
      </div>
  
      <div style="height:3px; margin:auto; margin-bottom: -25px; margin-top:30px; width:80%;  background-color: rgb(231, 231, 231);"></div>
  
      <div style="display:flex; font-size: xx-small;">
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/cart.svg">
              </div>
              Check-Out
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/pause.svg">
              </div>
              Bonifico in Pausa
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/box.svg">
              </div>
              Ricevi la merce
  
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/calendar.svg">
              </div>
              Attendi 90 giorni
  
          </div>
          <div style="width:20%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/play.svg">
              </div>
              Addebito
          </div>                        
      </div>
  
      <hr>
      
      <div style=" text-align:left; font-size:14px; line-height: 20px; margin-left:10px;">
          <div>
              <ol>
              <li> Scegli di acquistare con
                  <img src="https://sdk-web.pausepay.it/images/solo scritta.svg" style="margin:auto; height:20px;">
              </li>
              <li> 
                   Se è la tua prima volta, dovrai registrarti e collegare almeno un conto bancario aziendale tramite <b>Open Banking</b>
                   <br>
                   <span style="font-size:9px;">Potrebbe interessarti <a href="https://pausepay.it/tutela-e-sicurezza-dei-dati-bancari/" target="_blank"><u>Tutela Credenziali Bancarie</u></a></span>
              </li>
              <li> Verifichiamo in pochi secondi l'ammissibilità dell'operazione</li>
              <li> Conferma e autorizza la tua banca al pagamento dilazionato irrevocabile</li>
              <li> Potresti ancora vedere il carrello aperto, non preoccuparti e attendi qulche minuto. Il tuo ordine è già chiuso.</li>
              <li> Il bonifico sarà eseguito in automatico al 90° giorno</li>
              </ol>
          </div>
  
  
          <div style="text-align:left; font-size:16px; line-height: 20px;  margin-bottom:15px; text-align: center;;">
              Domande?
          </div>
  
  
          <div style="display:flex; justify-content:space-around;">
  
              <div style="display: flex; justify-content: space-between; align-items:center;">
                  <div style="width:45%;">
                      <a class="pausepay" id="pp_support"  href="https://sdk-web.pausepay.it/help_desk.html" target="_blank"
                          onclick="window.open(this.href, 'mywin', 'left=20,top=20,width=500,height=890,toolbar=1,resizable=0'); return false;">
                          <div class="pausepay pp_button">
                              <div class="dot_step" style="background-color: white;">
                                  <img src="https://sdk-web.pausepay.it/icons/support_green.svg">
                              </div>                        
                              <div>Chatta   <br> <span style="font-size: 9px;"> con un operatore</span> </div>
                          </div>
                      </a>
                  </div>                                    
                  <div style="width:45%;">
                      <a class="pausepay" id="pp_website_buyer" href="https://pausepay.it/compra-ora-paga-dopo-90giorni-b2b-bnpl/faq" target="_blank">
                          <div class="pausepay pp_button">
                              <div class="dot_step" style="background-color: white;">
                                  <img src="https://sdk-web.pausepay.it/icons/website_green.svg">
                              </div>                        
                              <div>F.A.Q. <br> <span style="font-size: 9px;"> domande frequenti</span> </div>
                          </div>
                      </a>
                  </div>     
              </div>                               
          </div>
      </div>
      <br>
      <div style="text-align: center;">
          <img  style="height:18px; margin:auto;" src="https://sdk-web.pausepay.it/images/allianzTrade.svg"> 
      </div>             
  </div>    

  <!-- checkout start -->
  <div  class="pausepay pp_checkout_start" style="display:none;">
      <div style="text-align:center;">
          <img src="https://sdk-web.pausepay.it/images/solo scritta.svg" style="margin:auto; height:40px;">
      </div>
      <div style="text-align:center; font-size:16px; line-height: 20px;  margin-bottom:15px;">
          Procedi per verificare l'ammissibilità dell'operazione, e autorizzare il pagamento a 90 giorni
      </div>
  
      <div style="height:3px; margin:auto; margin-bottom: -25px; margin-top:30px; width:80%;  background-color: rgb(231, 231, 231);"></div>
  
      <div style="display:flex; font-size: xx-small;">
          <div style="width:25%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/login.svg">
              </div>
              Accedi <br> a PausePay
          </div>
          <div style="width:25%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/bank.svg">
              </div>
              Scegli <br> la banca
          </div>
          <div style="width:25%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/check.svg">
              </div>
              Verifica <br> ammissibilità 
  
          </div>
          <div style="width:25%; text-align: center;">
              <div class="dot_step">
                      <img src="https://sdk-web.pausepay.it/icons/sca.svg">
              </div>
              Autorizza <br> pagamento 90g
  
          </div>                       
      </div>
  
      <hr>

      <p style="text-align: center;">Ordine n. ##order_number##</p>

      <style>
          .pausepay .pp_box_checkout
          { 
              box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
              text-align: center; 
              border-radius: 5px; border-width: 0.5px; border-color: #00AF8C; 
              padding: 5px; height: 50px; 
              margin: auto;
              overflow: auto;
          }

      </style>
      
      <div style=" text-align:left; font-size:14px; line-height: 20px; margin-left:10px; ">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center;">

              <div class="pp_box_checkout" style="">
                  La tua p.iva: 
                  <br>
                  ##buyer_piva##  
                  <!-- <br><br>
                  La tua email: 
                  <br>
                  ##buyer_email## -->
              </div>
              <div class="pp_box_checkout" >
                  Importo: 
                  <br>
                  <b>##cart_amount_formatted##</b>
              </div>
              <div class="pp_box_checkout" >
                  Prodotti: 
                  <br>
                  ##cart_items_html##
              </div>
              
          </div>
  
          <br><br>
          Non preoccuparti se al termine del pagamento vedi ancora il carrello pieno.
          Attendi qualche minuto per far sì che il Venditore chiuda l'ordine.
          <br><br>
  
          <div style="display:flex; justify-content:space-around;">
                  <div style="width:45%;">
                      <a class="pausepay"
                          onclick="getCheckoutUrl('##cart_amount##', 
                                                  '##order_number##', 
                                                  '##cart_items_b64##', 
                                                  '##buyer_piva##', 
                                                  '##buyer_email##',
                                                  '##buyer_name##',
                                                  '##is_sandbox##'
                                                  )
                                   ">
                          <div class="pausepay pp_button" style="padding:10px;">
                              <b>Procedi</b>
                              <div class="pp_sandbox" style="position:absolute; bottom:0px; width:100%; text-align:center; color: red; font-size: xx-small;">
                                  TEST SANDBOX
                              </div>                                
                          </div>
                      </a>
                  </div>                                   
          </div>
      </div>
      <br>
      <div style="text-align: center;">
          <img  style="height:18px; margin:auto;" src="https://sdk-web.pausepay.it/images/allianzTrade.svg"> 
      </div>             
  </div>    
  


  <!-- pausepay handle script -->
  <script type="text/javascript">
  
  
      var eventMethod  = window.addEventListener ? "addEventListener" : "attachEvent";
      var eventer      = window[eventMethod];
      var messageEvent = eventMethod === "attachEvent" ? "onmessage": "message";
      eventer(messageEvent, function (e) 
      {
          //data you receive from parent is stored inside e.data
          var function_name = e.data.name;
          var params        = e.data.params;
          if(pausepay_functions[function_name])
              {
                  pausepay_functions[function_name](params);
              }
      });
    
    function pausepay_how_it_works() 
      {
          pp_jQuery(".pp_how_it_works").pp_modal(
              {
                  fadeDuration: 200,
                  fadeDelay: 0.5 ,
                  closeExisting: true,
                  overlayCss: {backgroundColor:"rgba(0,0,0, 0.2"},
                  overlayClose:true,
                  escapeClose: true,
                  clickClose: true,
                  showClose: true
              });                        
        
      };
      
    function pausepay_wanna_try() 
      {
          pp_jQuery(".pp_wanna_try").pp_modal(
              {
                  fadeDuration: 200,
                  fadeDelay: 0.5 ,
                  closeExisting: true,
                  overlayCss: {backgroundColor:"rgba(0,0,0, 0.2"},
                  overlayClose:true,
                  escapeClose: true,
                  clickClose: true,
                  showClose: true
              });                        
        
      };

    function pausepay_checkout_help() 
      {
          pp_jQuery(".pp_checkout_help").pp_modal(
              {
                  fadeDuration: 200,
                  fadeDelay: 0.5 ,
                  closeExisting: true,
                  overlayCss: {backgroundColor:"rgba(0,0,0, 0.2"},
                  overlayClose:true,
                  escapeClose: true,
                  clickClose: true,
                  showClose: true
              });                        
        
      };

    function pausepay_checkout_start(params) 
      {
          var html = pp_jQuery(".pp_checkout_start").html();
          html = html.replace(/##buyer_piva##/g, params['buyer_piva']);
          html = html.replace(/##buyer_email##/g, params['buyer_email']);
          html = html.replace(/##buyer_name##/g, params['buyer_name']);
          html = html.replace(/##cart_amount_formatted##/g, getFormattedCurrency(params['cart_amount']));
          html = html.replace(/##cart_amount##/g, parseFloat(params['cart_amount']).toFixed(2));
          html = html.replace(/##order_number##/g, params['order_number']);
          html = html.replace(/##is_sandbox##/g, params['is_sandbox']);
          var items_html_list = "<ul>";
          var cart_items_json = params['cart_items'];
          // console.log(cart_items_json);
          for(let i in cart_items_json)
              {
                  var item = cart_items_json[i];
                  items_html_list += "<li>"+item.description+" ("+item.quantity+" x)</li>";
              }
          items_html_list += "</ul>";
          html = html.replace(/##cart_items_html##/g, items_html_list);
          html = html.replace(/##cart_items_b64##/g, btoa(JSON.stringify(cart_items_json)));
          pp_jQuery(".pp_checkout_start").html(html);
          pp_jQuery(".pp_checkout_start").pp_modal(
              {
                  fadeDuration: 200,
                  fadeDelay: 0.5 ,
                  closeExisting: true,
                  overlayCss: {backgroundColor:"rgba(0,0,0, 0.2"},
                  overlayClose:true,
                  escapeClose: true,
                  clickClose: true,
                  showClose: true
              });   

          if(params['is_sandbox'] == false)
            { pp_jQuery('.pausepay .pp_sandbox').css("display","none"); }
      };
      
      /**
       * @param {Object} params
       * @param {String}  params.event_name
       */
      function pp_trigger_gat_event(params)
      {
          var event_name   = params['event_name'];
          var cart_amount  = params['cart_amount'];
          var user_id      = params['user_id'];
          var hostname     = window.location.hostname;
          var source_url   = window.location.href;

          // set Cart Range
          var cart_range = false;
          if(cart_amount)
              {
              var amount = parseFloat(cart_amount);
              if(amount <= 1000)       { cart_range = "1 - 1.000";       }
              else if(amount <= 2000)  { cart_range = "1.000 - 2.000";   }
              else if(amount <= 5000)  { cart_range = "2.000 - 5.000";   }
              else if(amount <= 10000) { cart_range = "5.000 - 10.000";  }
              else if(amount <= 20000) { cart_range = "10.000 - 20.000"; }
              else                     { cart_range = "> 20.000"; }
              }            

          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({'event'             : event_name, 
                                  'Page Hostname'    : hostname, 
                                  'custom_event'     : 'true', 
                                  'PP Source Url'    : source_url, 
                                  'PP User Id'       : user_id, 
                                  'PP Cart Amount'   : cart_amount,
                                  'PP Cart Range'    : cart_range
                                });
      }      
    
    var pausepay_functions = {
                              "pausepay_how_it_works"  : pausepay_how_it_works,
                              "pp_trigger_gat_event"   : pp_trigger_gat_event,
                              "pausepay_wanna_try"     : pausepay_wanna_try,
                              "pausepay_checkout_help" : pausepay_checkout_help,
                              "pausepay_checkout_start" : pausepay_checkout_start
                            };


      // Create our number formatter.
      var formatter = new Intl.NumberFormat('it-IT', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 2,
          // the default value for minimumFractionDigits depends on the currency
          // and is usually already 2
      });
      
      function getFormattedCurrency (value)
      {
        if(isNaN(value)) {return '##';}
        return formatter.format(value);
      }    
      
      
      
      function getCheckoutUrl(amount, order_number, items_64, buyer_piva, buyer_email, buyer_name, is_sandbox)
      {
        var url = "";
        var headers = { /* 'Content-Type' : 'application/json' */ };
        var today = new Date();
        amount = parseFloat(amount);
        is_sandbox = (is_sandbox == "false") ? false : true; // arrives as string
        console.log("is_sandbox "+is_sandbox);
        console.log(atob(items_64));
        console.log(JSON.parse(atob(items_64)));
        var request = {};
        var cart = {
                      "okRedirect"    : "https://pausepay.it/acquisto-andato-a-buon-fine",
                      "koRedirect"    : "https://pausepay.it/acquisto-fallito",                        

                      "amount"        : amount,
                      "number"        : order_number,
                      "issueDate"     : today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate(),
                      "description"   : "Widget",
                      "remittance"    : "[PausePay] ordine "+order_number+" del "+(today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes(),
                      "buyerInfo": 
                                    {
                                        "name"      : buyer_name,
                                        "vatCode"   : buyer_piva,
                                        "email"     : buyer_email,
                                        "pec"       : buyer_email,
                                        "sdi"       : "000000",
                                        "address"   : "",
                                        "phone"     : ""                                        
                                    },
                      "allowSCTPayment": true,
                      "allowToEditRemittance": false,
                      "items"          : JSON.parse(atob(items_64))
                    };

       if(is_sandbox)
         { // sandbox
          url = "https://pausepay-test.herokuapp.com/public/fake_cart";
          request   = {
                          cart        : cart,
                          okWebhook   : "",
                          koWebhook   : ""                               
                      };   
          }
       else
          { // production
           url = "https://cashinvoice-api-gateway.herokuapp.com/prod/api/pausepay/web_widget/checkout";
           request = cart;
           headers['Authorization'] = "apikey 5ZBHxdpQdn4KX7f3uvhH0N:7cEiRNYG9H2BEvjFDbQQbh"; //webwidget scope     
          }  
      // console.log(request);
      pp_jQuery.ajax( {
                       url     : url, 
                       type    : 'post',
                       data    : request,
                       headers : headers,
                       dataType: 'json',
                       success : function(response) 
                          {
                              // console.log(response); 
                              // alert(response.url);
                              window.location = response.url;

                          }
                       })
          .done(function() 
              {
                  // alert( "second success" );
              })
          .fail(function(err) 
              {
                  console.error(err);
                  alert( "error" );
              })
          .always(function() 
              {
                  // alert( "finished" );
              });                        
      }
    </script>  
  `;
        
    pp_jQuery("body").append(modal);

}

function renderBanners()
{
    // host details
    var hostname   = window.location.hostname;
    var source_url = window.location.href;



    // get Cart Amount
    var cart_amount = false;
    if(!cart_amount && pp_jQuery(".pausepay-wanna_pay_in_90days")[0])  { cart_amount = pp_jQuery(".pausepay-wanna_pay_in_90days").attr("cart_amount"); }
    if(!cart_amount && pp_jQuery(".pausepay-pay_in_90days")[0])        { cart_amount = pp_jQuery(".pausepay-pay_in_90days").attr(      "cart_amount"); }
    if(!cart_amount && pp_jQuery(".pausepay-website_enabled")[0])      { cart_amount = pp_jQuery(".pausepay-website_enabled").attr(    "cart_amount"); }
    if(!cart_amount && pp_jQuery(".pausepay-sticker")[0])              { cart_amount = pp_jQuery(".pausepay-sticker").attr(            "cart_amount"); }
    if(!cart_amount && pp_jQuery(".pausepay-checkout")[0])             { cart_amount = pp_jQuery(".pausepay-checkout").attr(           "cart_amount"); }

    // get User Id
    var user_id = false;
    if(!user_id && pp_jQuery(".pausepay-wanna_pay_in_90days")[0])      { user_id = pp_jQuery(".pausepay-wanna_pay_in_90days").attr("user_id"); }
    if(!user_id && pp_jQuery(".pausepay-pay_in_90days")[0])            { user_id = pp_jQuery(".pausepay-pay_in_90days").attr(      "user_id"); }
    if(!user_id && pp_jQuery(".pausepay-website_enabled")[0])          { user_id = pp_jQuery(".pausepay-website_enabled").attr(    "user_id"); }
    if(!user_id && pp_jQuery(".pausepay-sticker")[0])                  { user_id = pp_jQuery(".pausepay-sticker").attr(            "user_id"); }
    if(!user_id && pp_jQuery(".pausepay-checkout")[0])                 { user_id = pp_jQuery(".pausepay-checkout").attr(           "user_id"); }

    // set Cart Range
    var cart_range = false;
    if(cart_amount)
        {
          var amount = parseFloat(cart_amount);
          if(amount <= 1000)       { cart_range = "1 - 1.000";       }
          else if(amount <= 2000)  { cart_range = "1.000 - 2.000";   }
          else if(amount <= 5000)  { cart_range = "2.000 - 5.000";   }
          else if(amount <= 10000) { cart_range = "5.000 - 10.000";  }
          else if(amount <= 20000) { cart_range = "10.000 - 20.000"; }
          else                     { cart_range = "> 20.000"; }
        }


    // get Cart Items
    var cart_items_64 = false;
    
    try{  
        if(!cart_items_64) 
            {
                var elem =  pp_jQuery(".pausepay-checkout");
                if(elem[0])
                 { 
                    cart_items_64 = elem.attr( "cart_items"); 
                    // cart_items should be the json in base64. check it
                    if(cart_items_64)
                        {
                         var decode_64 = atob(cart_items_64);
                         decode_64 = decode_64.replace(/\s*,\s*]/, "]");
                         var json = JSON.parse(decode_64);
                        }
                }
            } 

        } 
    catch(err)
        {
            console.error("[PausePay] 'cart_items' field. "+err);
            console.error(cart_items_64);
            cart_items_64 = "not valid json";
        }
    
    
    // get Buyer Piva
    var buyer_piva = false;
    if(!buyer_piva && pp_jQuery(".pausepay-checkout")) { buyer_piva = pp_jQuery(".pausepay-checkout").attr( "buyer_piva"); }    

    // get Buyer email
    var buyer_email = false;
    if(!buyer_email && pp_jQuery(".pausepay-checkout")) { buyer_email = pp_jQuery(".pausepay-checkout").attr( "buyer_email"); }   


    // get Buyer name
    var buyer_name = false;
    if(!buyer_name && pp_jQuery(".pausepay-checkout")) { buyer_name = pp_jQuery(".pausepay-checkout").attr( "buyer_name"); }   


    // get Order number
    var order_number = false;
    if(!order_number && pp_jQuery(".pausepay-checkout")) { order_number = pp_jQuery(".pausepay-checkout").attr( "order_number"); }   
    
    // Is Sandbox?    
    var is_sandbox = true;
    if(is_sandbox == true && pp_jQuery(".pausepay-checkout")[0])  { is_sandbox = pp_jQuery(".pausepay-checkout").attr("is_sandbox"); }    
    


    var iframe_url_params = `?hostname=${hostname}&source_url=${encodeURIComponent(source_url)}`;
    if(cart_amount)      { iframe_url_params += `&cart_amount=${encodeURIComponent(cart_amount)}`;}
    if(cart_range)       { iframe_url_params += `&cart_range=${encodeURIComponent(cart_range)}`;}
    if(user_id)          { iframe_url_params += `&user_id=${encodeURIComponent(user_id)}`;}
    if(cart_items_64)    { iframe_url_params += `&cart_items=${encodeURIComponent(cart_items_64)}`;}
    if(buyer_piva)       { iframe_url_params += `&buyer_piva=${encodeURIComponent(buyer_piva)}`;}
    if(buyer_email)      { iframe_url_params += `&buyer_email=${encodeURIComponent(buyer_email)}`;}
    if(buyer_name)       { iframe_url_params += `&buyer_name=${encodeURIComponent(buyer_name)}`;}
    if(order_number)     { iframe_url_params += `&order_number=${encodeURIComponent(order_number)}`;}
    if(is_sandbox)       { iframe_url_params += `&is_sandbox=${encodeURIComponent(is_sandbox)}`;}

    // console.log("hostname "+hostname);
    // console.log("source_url "+source_url);
    // console.log("cart_amount "+cart_amount);
    // console.log("cart_range "+cart_range);
    // console.log("user_id "+user_id);
    // console.log("cart_items_64");
    // console.log(cart_items_64);
    // console.log("buyer_piva "+buyer_piva);
    // console.log("buyer_email "+buyer_email    );
    // console.log("buyer_name "+buyer_name    );
    // console.log("order_number "+order_number    );
    // console.log("is_sandbox "+is_sandbox    );
    // console.log("iframe_url_params "+iframe_url_params    );
    

    // replace element with iFrame
    pp_jQuery(".pausepay-wanna_pay_in_90days").html(   `<iframe src='${BASE_URL}/wanna_pay_90_days.html${iframe_url_params}'   width='100%'  height='80px'  scrolling='no'  style='border:none;'  ></iframe>`);                    
    pp_jQuery(".pausepay-pay_in_90days").html(         `<iframe src='${BASE_URL}/pay_in_90days.html${iframe_url_params}'       width='100%'  height='80px'  scrolling='no'  style='border:none;'  ></iframe>`);                    
    pp_jQuery(".pausepay-website_enabled").html(       `<iframe src='${BASE_URL}/website_enabled.html${iframe_url_params}'     width='200px' height='80px'  scrolling='no'  style='border:none;'  ></iframe>`);                    
    pp_jQuery(".pausepay-sticker").html(               `<iframe src='${BASE_URL}/sticker.html${iframe_url_params}'             width='120px' height='135px' scrolling='no'  style='border:none;'  ></iframe>`);                    
    pp_jQuery(".pausepay-tos_page").html(              `<iframe src='${BASE_URL}/terms_conditions.html${iframe_url_params}'    width='100%' height='100%'   scrolling='auto'  style='border:none;height: 100vh; width: 100%'  ></iframe>`);                    
    pp_jQuery(".pausepay-checkout").html(              `<iframe src='${BASE_URL}/checkout_button.html${iframe_url_params}'     width='300px' height='135px' scrolling='no'  style='border:none; width:300px'  ></iframe>`);                    

     // Is Logo Wide?    
    if(pp_jQuery(".pausepay-logo-wide")[0])
     {
        pp_jQuery(".pausepay-logo-wide").each(function( index ) 
         {
            var elem = pp_jQuery(this);
            if(!elem) {return false;}
            elem = pp_jQuery(elem);
            var logo_type_wide = elem.attr("logo_type");
            if(!logo_type_wide) {return false;}
            var temp_iframe_url_params = iframe_url_params; 
            temp_iframe_url_params += `&logo_type=${encodeURIComponent(logo_type_wide)}`;     
            elem.html(`<iframe src='${BASE_URL}/just_logo_wide.html${temp_iframe_url_params}'      width='100px' height='30px'  scrolling='no'  style='border:none; width:100px'  ></iframe>`);                        
         });
     }


     // Is Logo Square?    
    if(pp_jQuery(".pausepay-logo-square")[0])
     {
        pp_jQuery(".pausepay-logo-square").each(function( index ) 
         {
            var elem = pp_jQuery(this);
            if(!elem) {return false;}
            elem = pp_jQuery(elem);
            var logo_type_square = elem.attr("logo_type");
            if(!logo_type_square) {return false;}
            var temp_iframe_url_params = iframe_url_params; 
            temp_iframe_url_params += `&logo_type=${encodeURIComponent(logo_type_square)}`;     
            elem.html(`<iframe src='${BASE_URL}/just_logo_square.html${temp_iframe_url_params}'    width='60px' height='40px'   scrolling='no'  style='border:none; width:60px'  ></iframe>`);                                   
         });
     }


}


function loadLibraries()
{

/* ===== Load Custom PausePay JQuery Modal ==== */
var script_tag = document.createElement('script');
script_tag.setAttribute("type","text/javascript");
script_tag.innerHTML = `!function(o){"object"==typeof module&&"object"==typeof module.exports?o(require("jquery"),window,document):o(pp_jQuery,window,document)}(function(o,t,i,e){var s=[],l=function(){return s.length?s[s.length-1]:null},n=function(){var o,t=!1;for(o=s.length-1;o>=0;o--)s[o].$pp_blocker&&(s[o].$pp_blocker.toggleClass("current",!t).toggleClass("behind",t),t=!0)};o.pp_modal=function(t,i){var e,n;if(this.$body=o("body"),this.options=o.extend({},o.pp_modal.defaults,i),this.options.doFade=!isNaN(parseInt(this.options.fadeDuration,10)),this.$pp_blocker=null,this.options.closeExisting)for(;o.pp_modal.isActive();)o.pp_modal.close();if(s.push(this),t.is("a"))if(n=t.attr("href"),this.anchor=t,/^#/.test(n)){if(this.$elm=o(n),1!==this.$elm.length)return null;this.$body.append(this.$elm),this.open()}else this.$elm=o("<div>"),this.$body.append(this.$elm),e=function(o,t){t.elm.remove()},this.showSpinner(),t.trigger(o.pp_modal.AJAX_SEND),o.get(n).done(function(i){if(o.pp_modal.isActive()){t.trigger(o.pp_modal.AJAX_SUCCESS);var s=l();s.$elm.empty().append(i).on(o.pp_modal.CLOSE,e),s.hideSpinner(),s.open(),t.trigger(o.pp_modal.AJAX_COMPLETE)}}).fail(function(){t.trigger(o.pp_modal.AJAX_FAIL);var i=l();i.hideSpinner(),s.pop(),t.trigger(o.pp_modal.AJAX_COMPLETE)});else this.$elm=t,this.anchor=t,this.$body.append(this.$elm),this.open()},o.pp_modal.prototype={constructor:o.pp_modal,open:function(){var t=this;this.block(),this.anchor.blur(),this.options.doFade?setTimeout(function(){t.show()},this.options.fadeDuration*this.options.fadeDelay):this.show(),o(i).off("keydown.pp_modal").on("keydown.pp_modal",function(o){var t=l();27===o.which&&t.options.escapeClose&&t.close()}),this.options.clickClose&&this.$pp_blocker.click(function(t){t.target===this&&o.pp_modal.close()})},close:function(){s.pop(),this.unblock(),this.hide(),o.pp_modal.isActive()||o(i).off("keydown.pp_modal")},block:function(){this.$elm.trigger(o.pp_modal.BEFORE_BLOCK,[this._ctx()]),this.$body.css("overflow","hidden"),this.$pp_blocker=o('<div class="'+this.options.pp_blockerClass+' pp_blocker current"></div>').appendTo(this.$body),n(),this.options.doFade&&this.$pp_blocker.css("opacity",0).animate({opacity:1},this.options.fadeDuration),this.$elm.trigger(o.pp_modal.BLOCK,[this._ctx()])},unblock:function(t){!t&&this.options.doFade?this.$pp_blocker.fadeOut(this.options.fadeDuration,this.unblock.bind(this,!0)):(this.$pp_blocker.children().appendTo(this.$body),this.$pp_blocker.remove(),this.$pp_blocker=null,n(),o.pp_modal.isActive()||this.$body.css("overflow",""))},show:function(){this.$elm.trigger(o.pp_modal.BEFORE_OPEN,[this._ctx()]),this.options.showClose&&(this.closeButton=o('<a href="#close-pp_modal" rel="pp_modal:close" class="close-pp_modal '+this.options.closeClass+'">'+this.options.closeText+"</a>"),this.$elm.append(this.closeButton)),this.$elm.addClass(this.options.pp_modalClass).appendTo(this.$pp_blocker),this.options.doFade?this.$elm.css({opacity:0,display:"inline-block"}).animate({opacity:1},this.options.fadeDuration):this.$elm.css("display","inline-block"),this.$elm.trigger(o.pp_modal.OPEN,[this._ctx()])},hide:function(){this.$elm.trigger(o.pp_modal.BEFORE_CLOSE,[this._ctx()]),this.closeButton&&this.closeButton.remove();var t=this;this.options.doFade?this.$elm.fadeOut(this.options.fadeDuration,function(){t.$elm.trigger(o.pp_modal.AFTER_CLOSE,[t._ctx()])}):this.$elm.hide(0,function(){t.$elm.trigger(o.pp_modal.AFTER_CLOSE,[t._ctx()])}),this.$elm.trigger(o.pp_modal.CLOSE,[this._ctx()])},showSpinner:function(){this.options.showSpinner&&(this.spinner=this.spinner||o('<div class="'+this.options.pp_modalClass+'-spinner"></div>').append(this.options.spinnerHtml),this.$body.append(this.spinner),this.spinner.show())},hideSpinner:function(){this.spinner&&this.spinner.remove()},_ctx:function(){return{elm:this.$elm,$elm:this.$elm,$pp_blocker:this.$pp_blocker,options:this.options}}},o.pp_modal.close=function(t){if(o.pp_modal.isActive()){t&&t.preventDefault();var i=l();return i.close(),i.$elm}},o.pp_modal.isActive=function(){return s.length>0},o.pp_modal.getCurrent=l,o.pp_modal.defaults={closeExisting:!0,escapeClose:!0,clickClose:!0,closeText:"Close",closeClass:"",pp_modalClass:"pp_modal",pp_blockerClass:"jquery-pp_modal",spinnerHtml:'<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',showSpinner:!0,showClose:!0,fadeDuration:null,fadeDelay:1},o.pp_modal.BEFORE_BLOCK="pp_modal:before-block",o.pp_modal.BLOCK="pp_modal:block",o.pp_modal.BEFORE_OPEN="pp_modal:before-open",o.pp_modal.OPEN="pp_modal:open",o.pp_modal.BEFORE_CLOSE="pp_modal:before-close",o.pp_modal.CLOSE="pp_modal:close",o.pp_modal.AFTER_CLOSE="pp_modal:after-close",o.pp_modal.AJAX_SEND="pp_modal:ajax:send",o.pp_modal.AJAX_SUCCESS="pp_modal:ajax:success",o.pp_modal.AJAX_FAIL="pp_modal:ajax:fail",o.pp_modal.AJAX_COMPLETE="pp_modal:ajax:complete",o.fn.pp_modal=function(t){return 1===this.length&&new o.pp_modal(this,t),this},o(i).on("click.pp_modal",'a[rel~="pp_modal:close"]',o.pp_modal.close),o(i).on("click.pp_modal",'a[rel~="pp_modal:open"]',function(t){t.preventDefault(),o(this).pp_modal()})});`;
document.getElementsByTagName("head")[0].appendChild(script_tag);
console.log("[PausePay SDK] import no-conflit pp-jquery-modal/0.9.1");

// Custom PP JQuery Modal CSS
pp_jQuery("head").append("<link>");
var css = pp_jQuery("head").children(":last");
css.attr({
           rel:  "stylesheet",
           type: "text/css",
           href: BASE_URL+"/pp_jquery_modal.css?v=0.0.6"
           });   


/* ===== Load PausePay CSS ==== */
pp_jQuery("head").append("<link>");
var css = pp_jQuery("head").children(":last");
css.attr({
           rel:  "stylesheet",
           type: "text/css",
           href: BASE_URL+"/pausepay_css.css?v=0.0.6"
           });       
}

return {
    renderBanners : renderBanners
       };
};
setTimeout(() => {
    pausepay_sdk()
}, 2000);
