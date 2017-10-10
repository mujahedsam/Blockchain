var blocktrail = require("blocktrail-sdk");
var promise = require('promise');
var key = "9c60cbc64f97096eb2d4ec709aedd4afe2a39e7a";
var secret = "dc4dd1256e3f6b399c2eb83fc40d11bca5ef27c5";
var client = blocktrail.BlocktrailSDK({
    apiKey: key,
    apiSecret: secret,
    network: "BTC",
    testnet: true
});

export class Managewallet{

		//to retrieve the balanace,transac history and addresses info***
		managewallet(req,res){
				 let walletname=req.body.walletname;
				 let wpassword=req.body.wpassword;
				 client.initWallet(walletname, wpassword,(err, wallet)=>{
				    	wallet.getBalance((err, confirmedBalance, unconfirmedBalance)=>{

				    					if(err){
				    						res.status(404).send({
			                                 message: "error balance retrieval",
			                                 })
				    					}else{
					    					//*****to retreive the transactions history******
					    					let datatosend=[];
					    					
									         wallet.transactions(function(err, result) { 
									         if(err){
									         	res.status(404).send({
				                                 message: "error transactions history retrieval",
				                                 })
									         } else{
									         		  for(let i=0;i<result.data.length;i++){
									         		  	 let obj={};
									    	 			 obj.hash = result.data[i].hash;
									    	 			 obj.addresses = result.data[i].addresses;
									    	 			  let d = new Date(result.data[i].time);
                                                          let n = d.toLocaleString();
                                                          obj.time=n;
									    	 			  datatosend.push(obj);
								    	 		      }
								    	 		    res.status(200).send({
				                                        result:datatosend,
				                                        walletname:walletname,
				                                     	wpassword:wpassword,
				                                     	balance:blocktrail.toBTC(confirmedBalance),
				                                     	unconfirmedBalance:blocktrail.toBTC(unconfirmedBalance)
				                                    })
									         }   
								    	 		
						    	 	          });
				    					}
							    });

				    });

		}
}