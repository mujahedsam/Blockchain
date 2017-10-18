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
		//*******to generate address and can recieve bitcoins over the address&&&**********
		generateaddress(req,res){
			let username=req.body.username;
			let walletname=req.body.walletname;
		    let wpassword=req.body.wpassword;

			client.initWallet(walletname,wpassword,(err, wallet)=>{
				 if(wallet){
				 		wallet.getNewAddress(function(err, address) {
				 			if(err){
				 				res.status(404).send({
							         message: "error in new address generation",
							     })
				 			}else{
				 					res.status(200).send({
				                                        address:address,
				                                        walletname:walletname,
				                                     	wpassword:wpassword,
				                                     	username:username				                                     	 
				                                    })
				 			}
				 		});
				 }else{
				 	res.status(404).send({
				         message: "error in wallet init",
				     })
				 }

			});
		}
 //*********to send bitcoins *********
	send(req,res){
			let username=req.body.username;
			let walletname=req.body.walletname;
		    let wpassword=req.body.wpassword;
		    let address=req.body.address;
		    let amount=req.body.amount;

			client.initWallet(walletname,wpassword,(err, wallet)=>{
				 if(wallet){
				 		    //value = blocktrail.toSatoshi(1.1);
				 		 	var pay = {};
            				pay[address] = blocktrail.toSatoshi(amount);
            				console.log(pay);
							wallet.pay(pay, null, false, true, blocktrail.Wallet.FEE_STRATEGY_BASE_FEE,
							    (err, result)=>{
							    	if(err){
							    			res.status(404).send({
										         message: "error in transcation",
										     })
							    	}else{
							    		res.status(200).send({
				                                        result:result,
				                                        amount:amount,
				                                        walletname:walletname,
				                                     	wpassword:wpassword,
				                                     	username:username				                                     	 
				                                    })
							    	}
							    });
				 }else{
				 	res.status(404).send({
				         message: "error in wallet init",
				     })
				 }

			});

	}
	//*********to retrieve history*********
			history(req,res){
				let username=req.body.username;
				let walletname=req.body.walletname;
		   		let wpassword=req.body.wpassword;

			client.initWallet(walletname,wpassword,(err, wallet)=>{
				 if(wallet){
				 		 wallet.transactions((err, result)=>{
				 		 	if(err){
				 		 		 res.status(404).send({
							         message: "error in transactions history",
							     })
				 		 	}else{
				 		 		res.status(200).send({
				                                        result:result,				                   
				                                        walletname:walletname,
				                                     	wpassword:wpassword,
				                                     	username:username				                                     	 
				                                    })
				 		 	}
				 		 });
				 }else{
				 	res.status(404).send({
				         message: "error in wallet init",
				     })
				 }

			});
			}
}