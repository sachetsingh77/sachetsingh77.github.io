$(document).ready(function () {

                  let portfolioView = {
                  total_portfolio_valuation: "32,098 ETH ($5,008,000.00)",
                      ether_wallet_coins: "2,000.56 ETH ($47,000.00)",
                      plasma_wallet_coins: "2,056.78 ETH ($46,766.00)",
                      asset_funds: [
                          {
                              symbol: "ETH",
                              assetName: "Ether",
                              assetHeader: {
                                  myWalletBalance: "1.000",
                                  plasmaBalance: "30.999",
                                  plasmaOrders: "23.000",
                                  plasmaAvailable: "6.001",
                                  myWalletBalance_USD: "41.000",
                                  plasmaBalance_USD: "130.999",
                                  plasmaOrders_USD: "823.000",
                                  plasmaAvailable_USD: "26.001"
                              },
                              inFlightHeader: {
                                  myWalletBalance: "+100.320",
                                  plasmaBalance: "+4,000,335.140"
                              },
                              inFlightDetails: [
                                  {
                                      logId: "1234567",
                                      myWalltetStatus: "Pending",
                                      myWalletBalance: "+10.320",
                                      plasmaBalance: "-9.732",
                                      plasmaStatus: "Pending"
                                  },
                                  {
                                      logId: "2345678",
                                      myWalltetStatus: "Pending",
                                      myWalletBalance: "+ 90.320",
                                      plasmaBalance: "4,000,000",
                                      plasmaStatus: "Pending"
                                  },
                                  {
                                      logId: "3456789",
                                      myWalltetStatus: "",
                                      myWalletBalance: "",
                                      plasmaBalance: "-18.132",
                                      plasmaStatus: "Ready"
                                  },
                                  {
                                      logId: "3454444",
                                      myWalltetStatus: "",
                                      myWalletBalance: "",
                                      plasmaBalance: "-3.702",
                                      plasmaStatus: "Ready"
                                  },
                                  {
                                      logId: "56789",
                                      myWalltetStatus: "",
                                      myWalletBalance: "",
                                      plasmaBalance: "+ 346.000",
                                      plasmaStatus: "Pending"
                                  },
                                  {
                                      logId: "78901",
                                      myWalltetStatus: "",
                                      myWalletBalance: "",
                                      plasmaBalance: "+2.000",
                                      plasmaStatus: "Pending"
                                  },
                                  {
                                      logId: "98765",
                                      myWalltetStatus: "",
                                      myWalletBalance: "",
                                      plasmaBalance: "+ 22.405",
                                      plasmaStatus: "Pending"
                                  },
                                  {
                                      logId: "846575",
                                      myWalltetStatus: "",
                                      myWalletBalance: "",
                                      plasmaBalance: "-4.702",
                                      plasmaStatus: "Ready"
                                  }
                              ]
                          },
                          {
                              symbol: "LEV",
                              assetName: "Leverj",
                              assetHeader: {
                                  myWalletBalance: "2.000",
                                  plasmaBalance: "300.999",
                                  plasmaOrders: "54.000",
                                  plasmaAvailable: "61.001",
                                  myWalletBalance_USD: "81.000",
                                  plasmaBalance_USD: "13000.999",
                                  plasmaOrders_USD: "8023.000",
                                  plasmaAvailable_USD: "2600.001"
                              },
                              inFlightHeader: {
                                  myWalletBalance: "+2000.320",
                                  plasmaBalance: "+9,000.140"
                              },
                              inFlightDetails: [
                                  {
                                      logId: "555555",
                                      myWalltetStatus: "Pending",
                                      myWalletBalance: "+20.320",
                                      plasmaBalance: "-29.732",
                                      plasmaStatus: "Pending"
                                  },
                                  {
                                      logId: "5555558877",
                                      myWalltetStatus: "Pending",
                                      myWalletBalance: "+2000.320",
                                      plasmaBalance: "-19.732",
                                      plasmaStatus: "Pending"
                                  },
                                  {
                                      logId: "8888888",
                                      myWalltetStatus: "",
                                      myWalletBalance: "",
                                      plasmaBalance: "-71.732",
                                      plasmaStatus: "Ready"
                                  },
                                  {
                                      logId: "88888883355",
                                      myWalltetStatus: "",
                                      myWalletBalance: "",
                                      plasmaBalance: "-7100.732",
                                      plasmaStatus: "Ready"
                                  }
                              ]
                          },


                      ]

                  };
                  
                  function printAssets(){
                    for (assetIdx in portfolioView.asset_funds){
                        console.log("asset " + portfolioView.asset_funds[assetIdx].symbol);
                    }
                  }
                  
                  function getWalletStatusBalance(txnMap, status, wallet){
                    let sum = 0*0;
                    for (var key in txnMap){
                        let entry = txnMap[key];
                        if (entry.status == status && entry.wallet == wallet){
                            console.log("Filtered txn " + entry.logId + ":" + entry.status);
                                sum += entry.balance * 1;
                        }
                     }
                     return sum;
                  }
                  printAssets();
                  let txnMap = {};
                  let latestUpdate = {logId:"log1234567", status:"Pending", wallet:"MyWallet", balance : "1000", balanceUSD : "7000"};
                  txnMap[latestUpdate.logId] = latestUpdate;
                  
                  
                  latestUpdate = {logId:"log1234567", status:"Ready", wallet:"MyWallet", balance : "1000", balanceUSD : "8000"};
                  txnMap[latestUpdate.logId] = latestUpdate;
                  
                  latestUpdate = {logId:"log1234568", status:"Ready", wallet:"MyWallet", balance : "2000", balanceUSD : "8000"};
                  txnMap[latestUpdate.logId] = latestUpdate;
                  latestUpdate = {logId:"log1234569", status:"Pending", wallet:"MyWallet", balance : "3000", balanceUSD : "8000"};
                  txnMap[latestUpdate.logId] = latestUpdate;
                  latestUpdate = {logId:"log12345610", status:"Ready", wallet:"MyWallet", balance : "4000", balanceUSD : "8000"};
                  txnMap[latestUpdate.logId] = latestUpdate;
                  latestUpdate = {logId:"log12345611", status:"Pending", wallet:"MyWallet", balance : "5000", balanceUSD : "8000"};
                  txnMap[latestUpdate.logId] = latestUpdate;
                  latestUpdate = {logId:"log12345612", status:"Pending", wallet:"PlasmaWallet", balance : "6000", balanceUSD : "8000"};
                  txnMap[latestUpdate.logId] = latestUpdate;
                  latestUpdate = {logId:"log12345613", status:"Pending", wallet:"PlasmaWallet", balance : "3000", balanceUSD : "8000"};
                  txnMap[latestUpdate.logId] = latestUpdate;
                  latestUpdate = {logId:"log12345614", status:"Ready", wallet:"PlasmaWallet", balance : "9000", balanceUSD : "8000"};
                  txnMap[latestUpdate.logId] = latestUpdate;
                  latestUpdate = {logId:"log12345615", status:"Ready", wallet:"PlasmaWallet", balance : "19000", balanceUSD : "8000"};
                  txnMap[latestUpdate.logId] = latestUpdate;
                  
                  
                  console.log("txnMap " + JSON.stringify(txnMap));
                  let statusBalance = getWalletStatusBalance(txnMap, "Ready", "PlasmaWallet");
                  console.log("status balance " + statusBalance);
                  
                  
    
    new Vue({
        el: '#myAssetsContainer',
        data: portfolioView
    })

    setTimeout(function () {
        console.log("Vue Model Update");
        portfolioView.total_portfolio_valuation = "63,098 ETH ($6,008,000.00)"
        portfolioView.plasma_wallet_coins = "2,399.48 ETH ($65,432.75)"
        portfolioView.asset_funds[0].inFlightDetails[0].plasmaStatus = "Ready"
    }, 5000);
    setTimeout(function () {
        console.log("Vue Model Update");
        portfolioView.total_portfolio_valuation = "73,098 ETH ($7,008,000.00)"
        portfolioView.plasma_wallet_coins = "4,399.48 ETH ($85,432.75)"
        portfolioView.asset_funds[0].inFlightDetails[1].plasmaStatus = "Ready"
        portfolioView.asset_funds[0].inFlightDetails[4].plasmaStatus = "Ready"
        portfolioView.asset_funds[0].inFlightDetails[5].plasmaStatus = "Ready"
        portfolioView.asset_funds[0].inFlightDetails[6].plasmaStatus = "Ready"
    }, 7000);
    setTimeout(function () {
        newArrival =
            {
                symbol: "BAT",
                assetName: "Basic Attn Token",
                assetHeader: {
                    myWalletBalance: "61.000",
                    plasmaBalance: "3300.999",
                    plasmaOrders: "9778.000",
                    plasmaAvailable: "6141.001",
                    myWalletBalance_USD: "831.000",
                    plasmaBalance_USD: "100.999",
                    plasmaOrders_USD: "923.000",
                    plasmaAvailable_USD: "70.001"
                },
                inFlightHeader: {
                    myWalletBalance: "+900.320",
                    plasmaBalance: "+5,00.140"
                },
                inFlightDetails: [
                    {
                        logId: "55555777500",
                        myWalltetStatus: "Pending",
                        myWalletBalance: "+120777.320",
                        plasmaBalance: "-29727.732",
                        plasmaStatus: "Pending"
                    },
                    {
                        logId: "888888823456",
                        myWalltetStatus: "",
                        myWalletBalance: "",
                        plasmaBalance: "-71.732",
                        plasmaStatus: "Ready"
                    },
                    {
                        logId: "8888882355",
                        myWalltetStatus: "",
                        myWalletBalance: "",
                        plasmaBalance: "-7150.732",
                        plasmaStatus: "Ready"
                    }
                ]
            }
        portfolioView.asset_funds.push(newArrival);
    }, 10000);
    function toggleInFlight(symbol) {
        $("#inFlightHeader_" + symbol).siblings(".inFlightDetails").toggle();
    }
    function tempAlert(msg, duration) {
        var el = document.createElement("div");
        el.setAttribute("style", "position:absolute;top:50%;left:50%;background-color:#52cbc3;z-index:1");
        el.innerHTML = msg;
        setTimeout(function () {
            el.parentNode.removeChild(el);
        }, duration);
        document.body.appendChild(el);
    }
    $(document).on("click", ".inFlightHeaderExpanded", function () {
        console.log("Toggle In Flight Details " + $(this).attr("data-symbol"));
        toggleInFlight($(this).attr("data-symbol"));
        $(this).toggleClass("inFlightHeaderCollapsed");
    });
    $(document).on("click", "td[logId]", function () {
        console.log("Complete Withdrawal for logId " + $(this).attr("logId"));
        tempAlert("Complete Withdrawal for logId " + $(this).attr("logId"), 1000);
    });
    $(document).on("click", "img[addFunds]", function () {
        console.log("Add Funds for " + $(this).attr("addFunds"));
        tempAlert("Add Funds for " + $(this).attr("addFunds"), 1000);
    });
    $(document).on("click", "img[releaseFunds]", function () {
        console.log("Withdraw Funds for " + $(this).attr("releaseFunds"));
        tempAlert("Withdraw Funds for " + $(this).attr("releaseFunds"), 1000);
    });
    $(document).on("click", "td[completeWithdrawals]", function () {
        console.log("Complete all Withdrawals for token " + $(this).attr("completeWithdrawals"));
        tempAlert("Complete all Withdrawals for token " + $(this).attr("completeWithdrawals"), 1000);
    });
});
