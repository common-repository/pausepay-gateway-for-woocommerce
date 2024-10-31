<?php
/*
 * Plugin Name: PausePay for WooCommerce
 * Plugin URI: https://pausepay.it
 * Description: Pay in 90 days with OpenBanking for Italian B2B
 * Author: CashInvoice spa sb
 * Author URI: https://cashinvoice.it
 * Version: 1.0.5
 * user guide https://link.pausepay.it/guida-seller
 * dev plugin guide https://rudrastyh.com/woocommerce/payment-gateway-plugin.html
 */

 /*
 * This action hook registers our PHP class as a WooCommerce payment gateway
 */
add_filter( 'woocommerce_payment_gateways', 'pausepay_add_gateway_class' );
function pausepay_add_gateway_class( $gateways ) {
	$gateways[] = 'WC_Pausepay_Gateway'; // your class name is here
	return $gateways;
}

/*
 * The class itself, please note that it is inside plugins_loaded action hook
 */
add_action( 'plugins_loaded', 'pausepay_init_gateway_class' );


add_action('wp_enqueue_scripts','pausepay_sdk_init');

function pausepay_sdk_init() {
    wp_enqueue_script( 'pausepay_sdk', plugins_url( '/pausepay_sdk_0.0.8.js', __FILE__ ));
}



function pausepay_init_gateway_class() 
{

	class WC_Pausepay_Gateway extends WC_Payment_Gateway {

 		/**
 		 * Class constructor, more about it in Step 3
 		 */

		  const SANDBOX_ENDPOINT	 = "https://pausepay-test.herokuapp.com/public/fake_cart";
		  const PRODUCTION_ENDPOINT  = "https://api.pausepay.it/order";
		  const SANDBOX_APIKEY		 = "4a7c454e958faa2ee9e368fc97c8aba14c93414d349cf3f82a6403b206470cfe";

		  public function __construct() 
		  {

			$this->id = 'pausepay'; // payment gateway plugin ID
			$this->icon = plugin_dir_url( __FILE__ ).'/logo_full_xs.png'; // URL of the icon that will be displayed on checkout page near your gateway name
			$this->has_fields = false; // in case you need a custom credit card form
			$this->method_title = 'Pausepay paga a 90 giorni';
			$this->method_description = '<img src="'.plugin_dir_url( __FILE__ ).'./logo_full.svg" style="width:200px; text-align:center;">
										  <br> 
										  <div>
										  	Permetti ai tuoi clienti (se ammissibili) di pagare con un unico bonifico dilazionato a 90 giorni, senza carta di credito. 
											Tu ricevi l\'importo in anticipo, assicurato e garantito.
										  </div>
										 '; // will be displayed on the options page
		
			// gateways can support subscriptions, refunds, saved payment methods,
			// but in this tutorial we begin with simple payments
			$this->supports = array(
				'products'
			);
		
			// Method with all the options fields
			$this->init_form_fields();
		
			// Load the settings.
			$this->init_settings();
			$this->title = $this->get_option( 'title' );
			$this->seller_vat = $this->get_option( 'seller_vat' );
			$this->sandboxmode = 'yes' === $this->get_option( 'sandboxmode' );
			$this->sandboxflow = sanitize_text_field($this->get_option( 'sandboxflow'));
			// $this->description = $this->get_option( 'description' );
			$this->description = "<p>
										[solo B2B] Paga a 90 giorni, in unica soluzione, senza carta di credito. 
										Con <a href='https://pausepay.it' target='_blank' >PausePay</a> puoi autorizzare un bonifico dilazionato online dalla tua banca
								  		(<b>per importi tra 500,00€ e 20.000,00€</b>). 
										Scegli la tua banca, verifica l'ammissibilità in pochi secondi e autorizza il pagamento.
								  </p>
								  <!--
								  <p style='font-size:x-small;'>PausePay utilizza l'OpenBanking secondo le normative europee PSD2 
								     per la verifica di titolarità del tuo c/c aziendale, tramite autorizzazione dal web banking della tua banca.
									 <a href='https://pausepay.it/tutela-e-sicurezza-dei-dati-bancari' target='_blank' >Scopri come</a>.
								  </p> 
								  -->

								  <!-- <div class='pausepay-wanna_pay_in_90days'></div> -->
								  <div id='woocommerce-gateway-pausepay-error'> <!-- should replicate the error message here --></div>
								 ";

			$this->title = "Paga a 90 giorni con PausePay ";
			$this->enabled = $this->get_option( 'enabled' );
			$this->fieldname_billing_company_vat = sanitize_text_field($this->get_option( 'fieldname_billing_company_vat' ));
			$this->fieldname_billing_company_name = sanitize_text_field($this->get_option( 'fieldname_billing_company_name' ));
			
			$this->private_key = $this->sandboxmode ? self::SANDBOX_APIKEY   : sanitize_text_field($this->get_option( 'private_key' ));
			$this->endpoint    = $this->sandboxmode ? self::SANDBOX_ENDPOINT : self::PRODUCTION_ENDPOINT;
			// This action hook saves the settings
			add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );
		
			// We need custom JavaScript to obtain a token
			add_action( 'wp_enqueue_scripts', array( $this, 'payment_scripts' ) );
			
			// Register webhooks here
			// https://ecommerce_website.it/wc-api/{webhook name}/
			 add_action( 'woocommerce_api_pausepay_ok', array( $this, 'webhook_ok' ) );
			 add_action( 'woocommerce_api_pausepay_ko', array( $this, 'webhook_ko' ) );


			// SOME CHECKS
			if($this->sandboxmode)
				{ 
					$this->description = $this->description."<br> <div style='color:red; text-align:center;'><b>SandBox Mode</b></div>"; 
				}
				
			if(!isset($this->private_key))
				{ 
					if($this->sandboxmode)
						{ 
							$this->description = $this->description."<br> <div style='color:orange; text-align:center;'><b>Il Venditore dovrà inserire la sua Api-Key prima di andare in Produzione</b></div>"; 
						}		
					else
						{    $this->description = $this->description."<br> <div style='color:red; text-align:center;'><b>Il Venditore deve inserire la sua Api-Key nelle impostazioni di PausePay.</b></div>"; }
				}
				
			if(!isset($this->seller_vat))
				{ 
					$this->description = $this->description."<br> <div style='color:red; text-align:center;'><b>Il Venditore non ha inserito la sua P.IVA nelle impostazioni di PausePay.</b></span>"; 
				}
			else
				{ 
					if(!preg_match("/^((IT)[0-9]{11})$/i", $this->seller_vat))
					{
						if(preg_match("/^([0-9]{11})$/i", $this->seller_vat))
						{
							/* ok */
						}
						else
						{
							$this->description = $this->description."<br> <div style='color:red; text-align:center;'><b>La P.IVA ".$this->seller_vat."inserita dal Venditore nelle impostazioni di PausePay non è valida.</b></span>"; 				
						}
					}
				}

			



		 }

		/**
 		 * Plugin options, we deal with it in Step 3 too
 		 */
 		public function init_form_fields()
		{
			 
			$this->form_fields = array(
				'seller_vat' => array(
					'title'       => 'La tua P.IVA',
					'label'       => 'P.Iva',
					'type'        => 'text',
					'description' => 'La tua P.IVA in quanto venditore, che utilizzerai per emettere fattura',
					'desc_tip'    => true,
				),				
				// 'title' => array(
				// 	'title'       => 'Title',
				// 	'type'        => 'text',
				// 	'description' => 'This controls the title which the user sees during checkout.',
				// 	'default'     => 'Paga a 90 giorni con PausePay ',
				// 	'desc_tip'    => true,
				// ),
				// 'description' => array(
				// 	'title'       => 'Description',
				// 	'type'        => 'textarea',
				// 	'description' => 'This controls the description which the user sees during checkout.',
				// 	'default'     => '<b>Paga a 90 giorni</b>, in unica soluzione, senza carta di credito. Con PausePay puoi autorizzare un bonifico dilazionato online con la tua banca',
				// ),
				'fieldname_billing_company_vat' => array(
					'title'       => 'Nome del campo P.IVA Buyer',
					'label'       => 'P.Iva',
					'type'        => 'text',
					'description' => 'Il nome del campo contenente la p.iva, nella sezione "Dettagli di Fatturazione" ',
					'default'     => 'billing_vat',
					'desc_tip'    => true,
				),
				'fieldname_billing_company_name' => array(
					'title'       => 'Nome del campo Ragione Sociale Buyer ',
					'label'       => 'Ragione Sociale',
					'type'        => 'text',
					'description' => 'Il nome del campo contenente la Ragione Sociale, nella sezione "Dettagli di Fatturazione" ',
					'default'     => 'billing_company',
					'desc_tip'    => true,
				),
				
				'private_key' => array(
					'title'       => 'API-KEY Seller',
					'type'        => 'password',
					'description' => 'Il token di autenticazione della tua società, disponibile solo a registrazione completata su <a href=https://app.pausepay.it">app.pausepay.it</a> e dopo nostra approvazione, come spiegato nella <a href="https://link.pausepay.it/guida-seller">Guida Seller</a>. ',
					'label'		  => 'Prima di utilizzare PausePay in produzione (non in sandbox), dovrai completare l\'onboarding in quanto Seller, ed ottenere la tua Api-Key. Scopri come fare su <a href="https://pausepay.it/vendi-con-pausepay/" target="_blank">PausePay.it</a>'
				),
				'sandboxmode' => array(
					'title'       => 'SandBox mode',
					'label'       => 'Abilita la <b>Sandbox</b> per fare dei test. Se abilitata, la tua API-KEY sarà ignorata.
										<ul>
										<li>• Il Buyer sarà sempre forzato ad essere l\'"Azienda B" IT82500048660 </li>
										<li>• Il Seller diventerà  sempre l\'"Azienda A" IT73228252614 </li> 
										</ul>
										Come spiegato nella <a href="https://link.pausepay.it/guida-seller">Guida Seller</a>, nella Sandbox non è possibile
										utilizzare la propria azienda come seller.
										Per testare il pagamento da parte del Buyer, utilizza queste credenziali:
										<ul>
											<li>• Buyer - Credenziali PausePay</li>
												<ul>
													<li>•• <i>username:</i> Martino.Bianchi1269592030633719343@fly.sbx</li>
													<li>•• <i>psw:</i> 1OpDmoHKmi</li>
												</ul>
											<li>
											<li>• Buyer - Credenziali Banca Wolkswagen</li>
												<ul>
													<li>•• <i>username:</i>TEST000</li>
													<li>•• <i>psw:</i> numeri random</li>
												</ul>
											<li>											
										</ul>
									 ',
					'type'        => 'checkbox',
					'description' => 'Abilita la modalità di Test nella SandBox',
					'default'     => 'yes',
					'desc_tip'    => true,
				),
				'sandboxflow' => array(
					'title'       => 'SandBox prefix order number',
					'label'		  => 'Scrivi uno dei seguenti prefissi, per testare le diverse modalità in Sandbox
									  <ul>
										<li><b>NE-</b> Buyer non ammissibile;
										<li><b>NC-</b> Buyer ammissibile, senza copertura assicurativa;
										<li><b>YC-</b> Ammissibilità non ancora disponibile;
										<li><b>NR-</b> Buyer ammissibile, con copertura assicurativa.
									  </ul>',
					'type'        => 'text',
					'description' => 'Testa i diversi flussi di checkout',
					'desc_tip'    => true,
				),	
				'enabled' => array(
					'title'       => 'Enable/Disable',
					'label'       => 'Enable Pausepay Gateway',
					'type'        => 'checkbox',
					'description' => '
					
				
				
				   
					<div class="pausepay pp_tos_page_container" style="text-align:center;  margin-right:20px;
																	   border-radius:10px; border-width:3px; border-style:solid; border-color:#00AF8C; padding:10px;">
							<div style="text-align:center; ">
								<!-- logo -->
								<img style="width:60%; text-align:center; max-width: 200px;" src="https://sdk-web.pausepay.it/images/logo_completo.svg">
							</div>
				
							<div style="height: 50px;">
								<!-- divider -->
							</div>
				
							<div style="width:100%; text-align: center;">
								<!-- banner -->
								<img style="width:60%; border-radius: 30px; box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;" 
									 src="https://sdk-web.pausepay.it/images/tos_seller_banner.png">
							</div>
							
							<div style="height: 50px;">
								<!-- divider -->
							</div>
						
				
							<div style="text-align: center;">
									<p><a href="https://pausepay.it" style="color:#00AF8C;">PausePay</a> 
									  è il primo metodo di pagamento BNPL italiano per il B2B, con bonifico differito a 90 giorni in unica soluzione.
									</p>
									<p>
										Grazie al bonifico differito, irrevocabile, i tuoi clienti non saranno vincolati dal plafond della carta di credito, 
										potranno quindi incrementare il volume del carrello.
									</p>
							</div>
				
							<div>
							   <b> No cost for the Buyer </b>
							</div>
				
							<!-- green blocks -->
							<div style="text-align:center; width:100%;">
								<div style="float:left; margin:auto; width:25%; margin-left:4%; margin-right:4%; background-color:#00AF8C; border-radius: 20px; padding:10px; color:white; margin:20px; min-height: 60px; text-align: center;">
									<p>Bonifico differito, <br> in unica soluzione , a 90 giorni</p>
								</div>
				
								<div style="float:left; margin:auto; width:25%; margin-left:4%; margin-right:4%; background-color:#00AF8C; border-radius: 20px; padding:10px; color:white; margin:20px; min-height: 60px; text-align: center;">
									<p>No Carta di Credito, <br> importi al carrello più alti</p>
								</div>
				
								<div style="float:left; margin:auto; width:25%; margin-left:4%; margin-right:4%; background-color:#00AF8C; border-radius: 20px; padding:10px; color:white; margin:20px; min-height: 60px; text-align: center;">
									<p>Ammissibilità<br> in pochi secondi</p>
								</div>
								<div style="clear:both;"></div>
							</div>            
				
							<div style="height: 50px;">
								<!-- divider -->
							</div>     
							
							<div style="background-color:#00AF8C; height:60px; color:white; font-size: large; text-align: center; padding:10px; padding-top:18px;
										padding-left:20px; padding-right:20px; display: flex; justify-content: center; align-items: center;">
								
									Prima di disattivare la Sandbox e andare live,  
									<a href="https://pausepay.it/buy-now-pay-later-per-il-tuo-ecommerce/" style="color:#bbdce3;" target="_blank">
										<u> Registrati a PausePay </u></a> 
									per ottenere la API-KEY
								
							</div>   
							
							<div style="height: 50px;">
								<!-- divider -->
							</div>                
				
							
						 
				
							<div style="display: flex; justify-content: space-between; align-items:center;">
								<div style="float:left; margin:auto; width:25%; margin-left:4%; margin-right:4%;">
									<a class="pausepay" id="pp_support"  href="https://sdk-web.pausepay.it/help_desk.html" target="_blank">
										<div class="pausepay pp_button" style="position:relative; color:black;background-color: white;overflow: hidden;border-radius: 8px; border-width: 1px; border-style: solid; border-color:#00af8c; cursor:pointer;text-decoration: none!important;box-shadow: inset 0 0 0 0 #00af8c;-webkit-transition: ease-in-out 0.4s;-moz-transition: ease-in-out 0.4s;transition: ease-in-out 0.4s;    text-align: center;padding: 5px;width: min(100% - 8px, 600px);margin-inline: auto;display: flex;justify-content:center;align-items:center;     flex-wrap:wrap;   ">
											<div class="dot_step" style="background-color: white; border-radius:100px;  width:50px; height:50px; text-align:center; margin:auto;display: flex; justify-content: center; align-items: center;border-style: solid;border-color:white;">
												<img style=" width:30px;" src="https://sdk-web.pausepay.it/icons/support_green.svg">
											</div>                        
											<div>Assistenza</div>
										</div>
									</a>
								</div>                                    
								<div style="float:left; margin:auto; width:25%; margin-left:4%; margin-right:4%;">
									<a class="pausepay" id="pp_website_buyer" href="https://link.pausepay.it/guida-seller" target="_blank">
										<div class="pausepay pp_button" style="position:relative; color:black;background-color: white;overflow: hidden;border-radius: 8px; border-width: 1px; border-style: solid; border-color:#00af8c; cursor:pointer;text-decoration: none!important;box-shadow: inset 0 0 0 0 #00af8c;-webkit-transition: ease-in-out 0.4s;-moz-transition: ease-in-out 0.4s;transition: ease-in-out 0.4s;    text-align: center;padding: 5px;width: min(100% - 8px, 600px);margin-inline: auto;display: flex;justify-content:center;align-items:center;     flex-wrap:wrap;   ">
											<div class="dot_step" style="background-color: white; border-radius:100px;  width:50px; height:50px; text-align:center; margin:auto;display: flex; justify-content: center; align-items: center;border-style: solid;border-color:white;">
												<img style=" width:30px;" src="https://sdk-web.pausepay.it/icons/website_green.svg"> 
											</div>                        
											<div>Leggi la Guida</div>
										</div>
									</a>
								</div>  
								<div style="float:left; margin:auto; width:25%; margin-left:4%; margin-right:4%;">
									<a class="pausepay" id="pp_website_buyer" href="https://pausepay.it/faq" target="_blank">
										<div class="pausepay pp_button" style="position:relative; color:black;background-color: white;overflow: hidden;border-radius: 8px; border-width: 1px; border-style: solid; border-color:#00af8c; cursor:pointer;text-decoration: none!important;box-shadow: inset 0 0 0 0 #00af8c;-webkit-transition: ease-in-out 0.4s;-moz-transition: ease-in-out 0.4s;transition: ease-in-out 0.4s;    text-align: center;padding: 5px;width: min(100% - 8px, 600px);margin-inline: auto;display: flex;justify-content:center;align-items:center;     flex-wrap:wrap;   ">
											<div class="dot_step" style="background-color: white; border-radius:100px;  width:50px; height:50px; text-align:center; margin:auto;display: flex; justify-content: center; align-items: center;border-style: solid;border-color:white;">
												<img style=" width:30px;" src="https://sdk-web.pausepay.it/icons/website_green.svg"> 
											</div>                        
											<div>F.A.Q.</div>
										</div>
									</a>
								</div> 
								<div style="clear:both;"></div>                   
							</div>                               
				</div>  							
					  				',
					'default'     => 'no'
				),											
			);
		}

		/**
		 * You will need it if you want your custom credit card form, Step 4 is about it
		 */
		// public function payment_fields() {

		// ...
				 
		// }

		/*
		 * Custom CSS and JS, in most cases required only when you decided to go with a custom credit card form
		 */
	 	public function payment_scripts() {

	 	}

		/*
 		 * Fields validation, more in Step 5. called after click on "make order"
		 */
		public function validate_fields() 
		{

			global $woocommerce;
			// error_log "PausePay validate_fields()\n";
			// error_log $this->fieldname_billing_company_name . "\n";

			/** api key */
			if(!isset($this->private_key))
			{
				wc_add_notice(  'Il Venditore deve inserire l\'API-KEY nelle impostazioni di PausePay', 'error' );
				return false;				
			}

			/**  ragione sociale */
			// error_log $_POST[ $this->fieldname_billing_company_name ]. "\n";
			if( empty( $_POST[ $this->fieldname_billing_company_name ]) ) 
			{
				wc_add_notice(  '<b>Ragione Sociale</b> è un campo obbligatorio', 'error' );
				return false;
			}

			/** seller p.iva */
			if(!isset($this->seller_vat))
				{ 
					wc_add_notice(  'Il Venditore non ha inserito la sua P.IVA nelle impostazioni di PausePay', 'error' );
					return false;
				}
			else
				{ 
					if(!preg_match("/^((IT)[0-9]{11})$/i", $this->seller_vat))
						{
							if(preg_match("/^([0-9]{11})$/i", $this->seller_vat))
								{
									$this->seller_vat = "IT".$this->seller_vat;
								}
							else
								{
									wc_add_notice(  "La P.IVA ".$this->seller_vat."inserita dal Venditore nelle impostazioni di PausePay non è valida", 'error' );
									return false;
								}
						}
				}

			/** buyer p.iva  */
			if( $this->sandboxmode )
				{
					// in sandbox, always use "Azienda B".
					$_POST[ $this->fieldname_billing_company_vat ] = "IT82500048660";
				}
			else
			   {
				if( empty( $_POST[ $this->fieldname_billing_company_vat ]) ) 
					{
						wc_add_notice(  '<b>Partita Iva</b> è un campo obbligatorio', 'error' );
						return false;
					}
				else
					{   // sanitize
						$buyer_piva = sanitize_text_field($_POST[ $this->fieldname_billing_company_vat ]);
						// validate
						if(!preg_match("/^((IT)[0-9]{11})$/i", $buyer_piva))
							{
								if(preg_match("/^([0-9]{11})$/i", $buyer_piva))
								{
									$buyer_piva = "IT".$buyer_piva;
									$_POST[ $this->fieldname_billing_company_vat ] = $buyer_piva;
								}
								else
								{
									wc_add_notice(  '<b>Partita Iva</b> '.$buyer_piva.' non valida', 'error' );
									return false;					
								}
							}						
					}					
			   }


			   	   

			   /** importo  */
			   $cart_total = $woocommerce->cart->total;
			if($cart_total < 500 || $cart_total > 20000)
				{
					wc_add_notice(  '  <b>PausePay</b> è disponibile solo per importi: <br>
									   • superiori a <b>500,00€</b>  		<br>
									   • inferiori a <b>20.000,00€</b>	<br>
									 ', 
									 'error' );
					return false;					
				}


			

			if( empty( $_POST[ 'billing_email' ]) ) {
				wc_add_notice(  'l\'indirizzo email è obbligatorio!', 'error' );
				return false;
			}

			return true;

		}

		/*
		 * We're processing the payments here, everything about it is in Step 5
		 */
		public function process_payment( $order_id ) 
		{
		 		global $woocommerce;
			 
		 		// we need it to get any order detailes
		 		$order = wc_get_order( $order_id );
			 
			 
		 		/*
		 		  * Array with parameters for API interaction
		 		 */
		 		$pp_endpoint = $this->endpoint;
		 		$private_key = $this->private_key;
		 		$current_user = wp_get_current_user();
		 		$wp_items = $order->get_items();
				 
		 		// $cart_items = array();
				foreach ($wp_items as $wp_item) 
					{
						$product_price    = $wp_item->get_total();
						$product_quantity = $wp_item->get_quantity();
						$unit_price = $product_price / $product_quantity;	
						$unit_price = round($unit_price, 2);		// item price could have more than 2 decimal digits, when discount plugin are used											
						
						$item = array(
									   "description" => $wp_item->get_name(),
									   "quantity"    => $wp_item->get_quantity(),
									   "amount"      => $unit_price
									  );
						$cart_items[] = $item;

					}				
				

				$webhook_url_ok = str_replace( 'http:', 'https:', add_query_arg( array ( 
																						'wc-api'   => 'pausepay_ok',
																						'order_id' => $order_id
																				     ), 
																			  home_url( '/' ) 
																			) 
										   );
				$webhook_url_ko = str_replace( 'http:', 'https:', add_query_arg( array ( 
																						'wc-api'   => 'pausepay_ko',
																						'order_id' => $order_id
																				     ), 
																			  home_url( '/' ) 
																			) 
										   );

				$okRedirect  = $this->get_return_url( $order );
				$koRedirect  = home_url( '/' )."checkout/order-pay/".$order->get_order_number()."/?pay_for_order=true&key=".$order_id;

				$order_number = $order->get_order_number();
				if (isset($this->sandboxflow)) 
					{
						$order_number = $this->sandboxflow."".$order_number."#".$this->seller_vat;
					}
				

				$cart = array( 
								'amount'      => $order->get_total(), 
								'number'      => $order_number, 
								'issueDate'   => date("Y-m-d"), 
								'description' => get_bloginfo('name').", ordine n.".$order->get_order_number()." del ".date("d-m-Y"),
								'remittance'  => get_bloginfo('name').", ordine n.".$order->get_order_number()." del ".date("d-m-Y"),
								'okRedirect'  => $okRedirect,
								'koRedirect'  => $koRedirect,
								'allowToEditRemittance' => false,
								'buyerInfo' => array(
													'name'     => sanitize_text_field($_POST[ $this->fieldname_billing_company_name ]),
													'vatCode'  => sanitize_text_field($_POST[ $this->fieldname_billing_company_vat ]),
													'email'    => sanitize_email($_POST[ 'billing_email' ]),
													'pec'	   => sanitize_email($_POST[ 'billing_email' ])
													),
								'items' => $cart_items,
								'allowSCTPayment' => true
							  );		 

				$args = array(
						'method' => 'POST',
						// 'timeout' => 45,
						// 'redirection' => 5,
						// 'httpversion' => '1.0',
						'blocking' => true,
						'headers' => array(
											"Content-type"   => "application/x-www-form-urlencoded;charset=UTF-8",
											"X-PausePay-Key" => $private_key
											)
						);
						
				 if($this->sandboxmode)
				 	{
				 	  // make it for "fake cart", so can use custom webhook for seller
				 	  $args['body'] = array(
											'cart'		=> $cart,
											'okWebhook' => $webhook_url_ok,
											'koWebhook' => $webhook_url_ko
					  					   );
				 	}
				 else
				 	{
				 	  // make it for "fake cart", so can use custom webhook for seller
				 	  $args['body'] = $cart;
				 	}

				// Just log the generated webhook url, should be used in the Seller dashboard in https://app.pausepay.it
				// error_log("[PausePay] Weebhook called");							
				// ob_start();
				// var_dump($webhook_url_ok);
				// $contents = ob_get_contents();
				// ob_end_clean();
				// error_log($contents);					


				// Log the payload used
				//   error_log ("[PausePay] Payload passed to create an order");
				//   ob_start();
				//   var_dump($args);
				//   $contents = ob_get_contents();
				//   ob_end_clean();
				//   error_log($contents);				  
				  


				

				// Your API interaction could be built with wp_remote_post() 
				 $response = wp_remote_post( $pp_endpoint, $args );
				
			 
				 if( !is_wp_error( $response ) ) 
					{ 
						$body = json_decode($response['body'], true);
						if ( !empty($body['url']))
								{
									wc_add_notice(  json_encode($body['data']), 'success' );
									return array(
													'result' => 'success',
													'redirect' => $body['url']
												);									
								}						
						else
						 {
						//   error_log("[PausePay] error on creating an order");							
						//   ob_start();
						//   var_dump($response);
						//   $contents = ob_get_contents();
						//   ob_end_clean();
						//   error_log($contents);							
							wc_add_notice(  'Something went wrong '. esc_html($response['body']), 'error' );
						 }
						
					}
				 else 
				 {
					// error_log("[PausePay] Connection Error on creating an order");							
					// error_log 'response '.print_r($response);
					wc_add_notice(  'Connection error.', 'error' );
				 }
			 
		}

		
		
		
			/*
		 * In case you need a webhook, like PayPal IPN etc
		 */
		
		
		 public function webhook_ok() 
		{
			global $woocommerce;

			// ==== check Headers for Authentication ====
			$headers = [];
			if (!function_exists('getallheaders'))  {
					// if PHP or Nginx doesn't support getallheaders() function, create it
					foreach ($_SERVER as $name => $value) {
						if (substr($name, 0, 5) == 'HTTP_') {
							$headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
						}
					}

			} 
			else {
				$headers = getallheaders(); 
			}			

			$XPS  = '';
			$DATE = '';
			if(!isset($headers['X-Pausepay-Signature'])) {
				if(!isset($headers['x-pausepay-signature'])) {
					 http_response_code(403); die('Missing XP Authorization Data');  // error missing param
				} 
				else { 
					$XPS = $headers['x-pausepay-signature']; 
				}
			  }
			else {
				 $XPS = $headers['X-Pausepay-Signature']; 
			}          
	
			if(!isset($headers['Date'])) {
				if(!isset($headers['date'])) {
					 http_response_code(403); die("Missing D Authorization Data");  // error missing param
				}
				else{ 
					$DATE = $headers['date']; 
				}
			}
			else {
				 $DATE = $headers['Date']; 
			}    
			
			

			// ==== retrieve data  ===== */
			if(!empty($_POST))
			{
				// when using application/x-www-form-urlencoded or multipart/form-data as the HTTP Content-Type in the request
				// NOTE: if this is the case and $_POST is empty, check the variables_order in php.ini! - it must contain the letter P
				http_response_code(403); die($error_msg.'Missing Post Data');  // error missing param
			}
		
			// when using application/json as the HTTP Content-Type in the request 
			$post_body_params = file_get_contents('php://input');
			if(!isset($post_body_params)) {
				http_response_code(403); die($error_msg.'Missing Post Data');  // error missing param
		   }   

		   $post_body_params =  json_decode($post_body_params);		   

				if(!isset($post_body_params->orderID)) {
					http_response_code(403); die($error_msg.'Missing ord Data');  // error missing param
			}           
				if(!isset($post_body_params->eventID)) {
					http_response_code(403); die($error_msg.'Missing evtI Data');  // error missing param
			}           
				if(!isset($post_body_params->eventType)) {
					http_response_code(403); die($error_msg.'Missing evtT Data');  // error missing param
			}           
				if(!isset($post_body_params->createdAt)) {
					http_response_code(403); die($error_msg.'Missing crd Data');  // error missing param
			} 		   
			
						
			$pausepay_order_id   = sanitize_text_field($post_body_params->orderID);		// 03CCCCA4-5DA5-4E3F-80B1-F631250E8680
			$eventID   			 = sanitize_text_field($post_body_params->eventID);   	// 85205DAA-B8C2-401A-8870-0B3D4BDC84E7
			$eventType 			 = sanitize_text_field($post_body_params->eventType); 	// order.ok
			$createdAt 			 = sanitize_text_field($post_body_params->createdAt); 	// 2022-12-06T08:17:05Z

			// error_log("[PausePay] Data passed to the WebHook");							
			// error_log "<br>orderID: ".$pausepay_order_id."<br>";
			// error_log "<br>eventID: ".$eventID."<br>";
			// error_log "<br>eventType: ".$eventType."<br>";        
			// error_log "<br>createdAt: ".$createdAt."<br>";        

			

			/** ==== retrieve seller api key  ===== */
			$seller_api_key = "";
			if($this->sandboxmode)
				{
					// SANDBOX
					$seller_api_key = self::SANDBOX_APIKEY; // azienda A
				}
			else
				{
					// PRODUCTION
					$seller_api_key = $this->get_option( 'private_key' );
				}


			// try to check if hmac is valid
			$sign = $XPS;
			$date = $DATE;				

			
			$params_post = [];
			$params_post['source']  = get_bloginfo('name');
			$params_post['body'] 	= $post_body_params; // the whole body, since fields order is not guaranteed;
			$params_post['headers'] = [
											'x-pausepay-signature'  => $sign,
											'date'                  => $date,
									  ];
			$params_post['sellerKey']  = $seller_api_key;
			
			$payload = false;
			$payload = array(
							'headers' 	  => array('Content-Type' => 'application/json; charset=utf-8'),
							'body'    	  => json_encode($params_post),
						    'method'      => 'POST',
						    'data_format' => 'body'
						   );
			
			$pp_url = "https://cashinvoice-api-gateway.herokuapp.com/prod/sic/public/seller_webhook/validation";
			

		$result = wp_remote_post( $pp_url, $payload );


		if( !is_wp_error( $response ) ) 
			{ 
                 try { $result = json_decode($result, true);	}
				catch (\Error $e)  
					 { 
					   /* echo 'Caught exception: ',  $e->getMessage(), "\n\n";  */
					   echo (print_r($result['body'] . "\n"));					   
					 }

			}
		else 
		{
			error_log("[PausePay] Error on checking webhook data integrity");										
			ob_start();
			var_dump($result);
			$contents = ob_get_contents();
			ob_end_clean();
			error_log($contents);
			http_response_code(400);
			die("error on webhook validation");	
		}


		   
			if($result->data == 1){
				 echo "<br> payload security signature check OK. <br>";   
			}
			else{
   			 	http_response_code(403); 
				die("Error: payload security signature check NOT passed"); 
			}



			/** ==== close the order as paid!  ====  */
			$order_id 	= sanitize_text_field($_GET['order_id']);
			$order 		= wc_get_order( $order_id );
			$woocommerce->cart->empty_cart();
			$order->payment_complete();
			$order->reduce_order_stock();

			$order->add_order_note( 'Pagato con PausePay, bonifico a 90 giorni - ref:'.$order_id, true );

			update_option('webhook_debug', $_GET);

				// Redirect to the thank you page
				return array(
					'result' => 'success',
					'redirect' => $this->get_return_url( $order )
				);			
					
	 	}

		public function webhook_ko() 
		{
			$order = wc_get_order( sanitize_text_field($_GET['order_id']) );

				// Redirect to the thank you page
				return array(
					'result' => 'fail',
					'redirect' => $this->get_return_url( $order )
				);			
					
	 	}

 	}
}
