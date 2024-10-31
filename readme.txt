=== PausePay for WooCommerce ===
Contributors: cashinvoice
Tags: woocommerce, ecommerce, buy now pay later, B2B, BNPL, open banking
Requires at least: 5.0
Tested up to: 6.1.1
Requires PHP: 7.0
Stable tag: 1.0.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

🇮🇹 Offri ai tuoi clienti B2B la possibilità di pagare a 90 giorni, senza carta di credito.

== Description ==
I tuoi clienti B2B (solo italiani) potranno pagare a 90 giorni, con un bonifico dilazionato senza carta di credito, in unica soluzione. 
Tu, venditore, ricevi subito l'anticipo, assicurato e garantito. Il tuo cliente pagherà a 90 giorni.
Tutte le operazioni saranno verificate in tempo reale per stabilirne l'ammissibilità. L'esito viene calcolato in pochi secondi.
La registrazione a PausePay (sia come Venditore che come acquirente) comporta il collegamento di almeno un conto bancario aziendale.
Il collegamento avviene utilizzando le tecnologie OpenBanking secondo le normative europee PSD2, quindi sarà la tua banca a richiedere l'autorizzazione.
PausePay non ti chiederà mai direttamente di inserire o condividiere le tue credenziali bancarie, sarà sempre il web banking della tua banca a chiederti l'autorizzazione.

PausePay è disponibile per importi compresi tra 500€ e 20.000€. Ad ogni richiesta di pagamento per gli importi compresi in questo range,
valuteremo in tempo reale l'ammissibilità dell'operazione.

!! Nota Bene !! Il venditore riceverà l'anticipo solo dopo aver caricato sul nostro portale (o via API) la fattura elettronica, già inviata sullo SDI,
con scadenza a 90 giorni dal pagamento. Il venditore, prima di attivare il plugin per la produzione, dovrà registrarsi su [https://app.pausepay.it](https://app.pausepay.it/seller/login) e sottoscrivere il nostro contratto.
Per ulteriori info contattaci su [https://pausepay.it](https://pausepay.it)

Guarda il video di come funziona PausePay  

https://youtu.be/XkjJPSYOGjA

Se vuoi saperne di più sull'OpenBanking, visita la pagina [Tutela Dati Bancari] (https://pausepay.it/tutela-e-sicurezza-dei-dati-bancari)

== Installation ==
1. Tramite FTP carica il plugin nella cartella \"pausepay for woocommerce\" al percorso \"/wp-content/plugins/\", oppure trascinalo con il Drang&Drop nella pagina Plugin di WordPress ;
2. Attiva il plugin tramite la pagina \"Plugins\" del menu di WordPress;
3. PausePay di default sarà attivato in modalità \"SandBox\" per il testing;
4. Trovi le credenziali di testing al link --> [Guida Seller] (https://link.pausepay.it/guida-seller)  
5. Controlla la correttezza dei nomi dei campi input \"P.IVA\" e \"Ragione Sociale\" nel form dell'indirizzo di fatturazione
6. Per abilitare la modalità \"Produzione\" (ed uscire dall'area testing), devi prima registrarti [https://app.pausepay.it](https://app.pausepay.it/seller/login), ottenere la tua API-KEY, e sottoscrivere il nostro contratto.
7. Apri il pannello di configurazione del Plugin di PausePay, sotto WooCommerce/Impostazioni/Pagamenti/Tutti i metodi di pagamento/PausePay/Gestisci
8. Inserisci la tua API-KEY e la tua P.IVA prima di disabilitare la SandBox
9. Controlla che i nomi dei campi input nel form dell'indirizzo di fatturazione dell'acquirente, corrispondano ai nomi dei campi nel pannello di configurazione
10. Attenzione, senza la firma del contratto e la nostra abilitazione, il processo dicheckout per il tuo acquirente si bloccherà.

== Frequently Asked Questions ==
Trovi le risposte alle domande più frequente sulla nostr pagina [F.A.Q.](https://pausepay.it/faq)

== Screenshots ==
1. Buy Now Pay Later B2B
2. Assicurabilità in pochi secondi
3. Open Banking
4. Configurazione PlugIn
5. Paga con PausePay

== Changelog ==
1.0.5. better webhook OK handling and POST params fix
1.0.4. better webhook OK handling
1.0.3. just documentation
1.0.2. fix item unit price, now is rounded to 2 decimal digits
