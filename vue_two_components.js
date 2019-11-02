let vue1 = new Vue({
    el: "#totalValuationDiv",
    data: {
        total_portfolio_valuation: "3,000,000",
        ether_wallet_coins: "2,000,000",
        plasma_wallet_coins: "1,000,000"
    },
    render: function (h) {
        return h('div', {
            attrs: {
                id: "totalValuationDiv",
                class: "heading"
            }
        },
            [
                h('h2', "My Assets"),
                h('div', "Total Portfolio Valuation"),
                h('span', { attrs: { id: "portfolioBalance" } }, this.total_portfolio_valuation)
            ]
        );
    }
});
vue1.total_portfolio_valuation = "6,9999"


let vue2 = new Vue({
    el: "#myPortfolioFunds",
    render: function (h) {
        return h('table', {
            attrs: {
                id: "myPortfolioFunds",
                cellpadding: "0",
                cellspacing: "0",
                border: "0",
                class: "cw"
            }
        },
            [
                h("tHead",
                    [
                        h("tr",
                            [
                                h("th",
                                    [
                                        h("table", { attrs: { cellpadding: "0", cellspacing: "0", border: "0", class: "cw" } },
                                            [
                                                h("tHead",
                                                    [
                                                        h("tr",
                                                            [
                                                                h("th", { attrs: { class: "rline\ w30\ al", colspan: "2" } },
                                                                    [
                                                                        h("div", { attrs: { class: "wallet" } },
                                                                            [
                                                                                h("span", "Main Chain"),
                                                                                h("h4",
                                                                                    [
                                                                                        h("span", { attrs: { class: "icon\ icon-wallet" } })
                                                                                    ], "My Wallet"),
                                                                                h("br")
                                                                            ])
                                                                    ]),
                                                                h("th", { attrs: { class: "w70\ secondary\ p25", colspan: "4" } },
                                                                    [
                                                                        h("div", { attrs: { class: "wallet" } },
                                                                            [
                                                                                h("span", "Side Chain"),
                                                                                h("h4",
                                                                                    [
                                                                                        h("span", { attrs: { class: "icon\ icon-plasma" } })
                                                                                    ], "Gluon Plasma"),
                                                                                h("br")
                                                                            ])
                                                                    ])
                                                            ])
                                                    ]),
                                                h("tr", { attrs: { class: "h40" } },
                                                    [
                                                        h("td", { attrs: { class: "w15" } }, "Asset"),
                                                        h("td", { attrs: { class: "w15\ rline\ ar\ pr25" } }, "Balance"),
                                                        h("td", { attrs: { class: "ar\ w18" } }, "Balance"),
                                                        h("td", { attrs: { class: "ar\ w18" } }, "In Orders"),
                                                        h("td", { attrs: { class: "ar\ w18" } }, "Available"),
                                                        h("td", { attrs: { class: "ar\ w18\ pr25" } }, "Manage Funds")
                                                    ])
                                            ])
                                    ])
                            ])
                    ]
                ),
                this.asset_funds.map(function (asset_fund) {
                    return h("tr", { attrs: { class: "rc0" } },
                        [
                            h("td",
                                [
                                    h("table", { attrs: { cellpadding: "0", cellspacing: "0", border: "0", class: "cw\ f15" } },
                                        [
                                            h("tHead",
                                                [
                                                    h("tr", { attrs: { height: "50px" } },
                                                        [
                                                            h("th", { attrs: { class: "al\ w15" } },
                                                                [
                                                                    h("div", { attrs: { class: "ic" } },
                                                                        [
                                                                            h("img", { attrs: { src: "d.png", width: "16px", height: "28px" } })
                                                                        ]),
                                                                    h("div", { attrs: { class: "inlineBlock" } },
                                                                        [
                                                                            asset_fund.symbol, h("br"), asset_fund.assetName
                                                                        ])
                                                                ]),
                                                            h("th", { attrs: { class: "rline\ w15\ ar\ pr25" } }, "$" + asset_fund.assetHeader.myWalletBalance_USD),
                                                            h("th", { attrs: { class: "ar\ w18" } }, asset_fund.assetHeader.plasmaBalance_USD),
                                                            h("th", { attrs: { class: "ar\ w18" } }, asset_fund.assetHeader.plasmaOrders_USD),
                                                            h("th", { attrs: { class: "ar\ w18" } }, asset_fund.assetHeader.plasmaAvailable_USD),
                                                            h("th", { attrs: { class: "ac\ w18" } },
                                                                [
                                                                    h("img", { attrs: { src: "plus.png", height: "24px", width: "24px", addFunds: asset_fund.symbol } }),
                                                                    "  ",
                                                                    h("img", { attrs: { src: "minus.png", height: "24px", width: "24px", releaseFunds: asset_fund.symbol } })
                                                                ])

                                                        ])
                                                ]),
                                            h("tr", { attrs: { class: "flight", id: "inFlightHeader_" + asset_fund.symbol } },
                                                [
                                                    h("td", { attrs: { class: "em" } },
                                                        [
                                                            h("div", { attrs: { class: "ic\ inFlightHeaderExpanded", "data-symbol": asset_fund.symbol } }),
                                                            "IN FLIGHT"
                                                        ]),
                                                    h("td", { attrs: { class: "rline\ ar\ pr25" } }, asset_fund.inFlightHeader.myWalletBalance),
                                                    h("td", { attrs: { class: "ar" } }, asset_fund.inFlightHeader.plasmaBalance),
                                                    h("td", { attrs: { class: "ac" } }),
                                                    h("td", { attrs: { completeWithdrawals: asset_fund.symbol } },
                                                        [
                                                            h("a", { attrs: { href: "#" } },
                                                                [
                                                                    h("span", { attrs: { class: "grn" } }, "Complete Withdrawals")
                                                                ])
                                                        ]),
                                                    h("td", { attrs: { class: "ar" } })
                                                ]),
                                            asset_fund.inFlightDetails.map(function (detail) {
                                                let td1Fn;
                                                let td2Fn;
                                                let img = "pending1.png"
                                                //REFACTOR THIS BLOCK
                                                const pendingFn = h("img", { attrs: { src: "pending1.png", height: "12px", width: "12px", hspace: "5px" } })
                                                const readyFn = h("img", { attrs: { src: "ready.png", height: "12px", width: "12px", hspace: "5px" } })
                                                if (detail.myWalltetStatus == "Pending") {
                                                    td1Fn = h("td", { attrs: { class: "ar" } },
                                                        [
                                                            pendingFn,
                                                            detail.myWalltetStatus
                                                        ]);
                                                    td2Fn = h("td", { attrs: { class: 'rline\ ar\ pr25' } }, detail.myWalletBalance);
                                                }
                                                if (detail.myWalltetStatus == "") {
                                                    td1Fn = h("td");
                                                    td2Fn = h("td", { attrs: { class: "rline" } })
                                                }
                                                let td3Fn = h("td", { attrs: { class: "ar" } }, detail.plasmaBalance);
                                                let td4Fn;
                                                if (detail.plasmaStatus == "Pending") {
                                                    td4Fn = h("td",
                                                        [
                                                            pendingFn,
                                                            detail.plasmaStatus
                                                        ]);
                                                }
                                                if (detail.plasmaStatus == "Ready") {
                                                    td4Fn = h("td",
                                                        [
                                                            readyFn,
                                                            detail.plasmaStatus
                                                        ]);
                                                }
                                                let td5Fn = h("td", { attrs: { logId: detail.logId } },
                                                    [
                                                        h("a", {attrs:{href:"#"}}, 
                                                        [
                                                            h("span", { attrs: { class: "grn" } }, "Complete Withdrawal")
                                                        ])
                                                        
                                                    ])
                                                if (detail.plasmaStatus === 'Pending') {
                                                    td5Fn = h("td");
                                                }
                                                return h("tr", { attrs: { class: "em\ inFlightDetails" } },
                                                    [
                                                        td1Fn, td2Fn, td3Fn, td4Fn, td5Fn

                                                    ])
                                            })

                                        ])
                                ])
                        ])
                })

            ]
        );
    },
    data: {
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

    }

    

});

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
console.log("vue2 " + vue2);

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
    vue2.asset_funds.push(newArrival);
}, 10000);