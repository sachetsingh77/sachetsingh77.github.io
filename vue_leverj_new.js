$(document).ready(function(){
    
    /**
     * Creates a dummy buy/sell book starting from a given mid rate, and applying increasing spreads.
     * Hard coded DP of 6 decimals for this mockup
     * @param {*} midRate 
     * @param {*} depth
    */
    function createOrderBook(midRate, spread, depth){
        let buyBookRaw = []
        let sellBookRaw = []
        let oclh = []
        
        for (let d=0; d<depth; d++){    
            let nextBuyQuote = midRate  - d - spread
            let nextSellQuote = midRate + d + spread
            let nextBuyAmount = Math.floor(Math.random() * 100000) + 1000; //1k to 100k random number 
            let nextSellAmount = Math.floor(Math.random() * 100000) + 1000; //1k to 100k random number
            let oclhRandom = Math.floor(Math.random() * 20)
            oclh.push([nextBuyQuote, nextSellQuote+10, nextBuyQuote-5, nextSellQuote]) 
            //console.log((nextBuyQuote/1000000).toFixed(6) + ":" + (nextSellQuote/1000000).toFixed(6))
            buyBookRaw.push({price: nextBuyQuote, amount: nextBuyAmount})
            sellBookRaw.push({price: nextSellQuote, amount: nextSellAmount})
        }
        sellBookRaw.sort((a, b) => a.price - b.price)
        buyBookRaw.sort((a, b) => b.price - a.price)
        return {
            buyBookRaw, sellBookRaw, oclh
        }
    }

    /*let newSeries = [
        [1538856000000, [6593.34, 6600, 6582.63, 6600]], 
        [1538856900000, [6595.16, 6604.76, 6590.73, 6593.86]],
        [1538857000000, [6593.34, 6600, 6582.63, 6600]], 
        [1538857100000, [6595.16, 6604.76, 6590.73, 6593.86]],
        [1538857300000, [6593.34, 6600, 6582.63, 6600]], 
        [1538857400000, [6595.16, 6604.76, 6590.73, 6593.86]]
      ]*/
    function createOCLHSeries(oclh, ticks){

        let timeSeries = []
        let currentTimestamp = new Date().getTime()
        for (let t=0; t<ticks; t++){
            currentTimestamp -= t*1000
            let data = [currentTimestamp, oclh[t]]
            timeSeries[t] = data
            //console.log("oclh t " + JSON.stringify(oclh[t]) + ":" + currentTimestamp + ":" + timeSeries.length);
        }
        //console.log("timeseries " + JSON.stringify(timeSeries));
        /*timeSeries = [
            [1538856000000, [6593.34, 6600, 6582.63, 6600]], 
            [1538856900000, [6595.16, 6604.76, 6590.73, 6593.86]],
            [1538857000000, [6593.34, 6600, 6582.63, 6600]], 
            [1538857100000, [6595.16, 6604.76, 6590.73, 6593.86]],
            [1538857300000, [6593.34, 6600, 6582.63, 6600]], 
            [1538857400000, [6595.16, 6604.76, 6590.73, 6593.86]]
          ]*/
          //console.log("timeseries " + JSON.stringify(timeSeries) + ":" + timeSeries.length);
          //timeSeries.push([1538856900000, [6595.16, 6604.76, 6590.73, 6593.86]]);
          //console.log("timeseries " + JSON.stringify(timeSeries) + ":" + timeSeries.length);
        return timeSeries;
    }

    /*let buyBookDemo = []
    let sellBookDemo = []
    let bestBuy = 169
    let bestSell = 244
    for (let d=0; d<10; d++){
        let nextBuyQuote = bestBuy - d
        let nextSellQuote = bestSell + d*2
        console.log((nextBuyQuote/1000000).toFixed(6) + ":" + (nextSellQuote/1000000).toFixed(6))
    }*/
    

    let orderBookVue = new Vue({
        el: "#orderBookContainer",
        data:{
            topOfTheBookSpreadPercent : "",
            lastTradedRate : "",
            buyBookDisplay:[],
            sellBookDisplay: []
        }
    })

      var options = {
        chart: {
          type: 'candlestick',
          width: "700"
        },
        
        series: [{
          name: 'trades',
          data: [
            
          ]
        }]
      }
      
      var chart = new ApexCharts(document.querySelector("#vueChart"), options);
      
      chart.render();

      setTimeout(function(){
        let newSeries = [
            [1, [6593.34, 6600, 6570.63, 6580]], 
            [2, [6595.16, 6604.76, 6590.73, 6593.86]],
            [3, [6597.34, 6608, 6582.63, 6600]], 
            [4, [6585.16, 6620.76, 6580.73, 6593.86]],
            [5, [6588.34, 6615, 6582.63, 6600]], 
            [6, [6587.16, 6625.76, 6570.73, 6593.86]]
          ]
        chart.updateSeries([{
            data: newSeries
          }])
      }, 1000)
    
    function getDisplayOrderBook(rawOrderBook, buySell){
        let totalBookLiquidity = rawOrderBook.reduce(function(accumulator, bookEntry){
            return accumulator + bookEntry.amount
        }, 0)
        let cumulativeSums = []
        rawOrderBook.reduce(function(accumulator, bookEntry, index){
            return cumulativeSums[index] = accumulator + bookEntry.amount
        }, 0)
        return rawOrderBook.map(function(bookEntry){
            let indexOfBookEntry = rawOrderBook.findIndex(entry => entry.price === bookEntry.price)
            let termAmount = (bookEntry.price * bookEntry.amount).toFixed(2)
            let cumulativeLiquidityAtPrice = cumulativeSums[indexOfBookEntry]
            let quoteLiquidityPercentage = (100*bookEntry.amount/totalBookLiquidity).toFixed(2)
            let bookLiquidityAtQuotePercentage = (100*cumulativeLiquidityAtPrice/totalBookLiquidity).toFixed(2)
            let sellCSS = "background: linear-gradient(to right, rgb(151, 54, 90), rgb(151, 54, 90)" +quoteLiquidityPercentage+ "%, rgb(93, 51, 80) " +quoteLiquidityPercentage+ "%, rgb(93, 51, 80) " +bookLiquidityAtQuotePercentage+ "%, transparent " +bookLiquidityAtQuotePercentage+ "%);"
            let buyCSS = "background: linear-gradient(to right, rgb(79, 140, 118), rgb(79, 140, 118) " + quoteLiquidityPercentage+ "%, rgb(60, 91, 93) " +quoteLiquidityPercentage+ "%, rgb(60, 91, 93) " +bookLiquidityAtQuotePercentage+ "%, transparent " +bookLiquidityAtQuotePercentage+ "%);"
            let rowCSS = buySell === "B" ? buyCSS : sellCSS
            return {
                price: (bookEntry.price),// / 1000000).toFixed(6),
                baseAmount : bookEntry.amount.toFixed(2),
                termAmount : (bookEntry.price * bookEntry.amount).toFixed(2),
                rowStyle : rowCSS
                
            }
        })
    }
    
    let tradeBook1 = {
        todayTrades : [
        {price: 180, amount: 10000, timestamp: "18:53:35", side:"S", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01705"},
        {price: 185, amount: 20000, timestamp: "16:33:45", side:"B", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01704"},
        {price: 181, amount: 30000, timestamp: "15:23:32", side:"B", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01704"},
        {price: 200, amount: 15000, timestamp: "12:43:31", side:"S", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01705"},
        {price: 202, amount: 25000, timestamp: "12:43:31", side:"S", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01705"},
        ],
        ydayTrades: [
            {price: 190, amount: 11000, timestamp: "18:53:35", side:"B", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01704"},
            {price: 195, amount: 23000, timestamp: "16:33:45", side:"B", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01704"},
            {price: 184, amount: 33000, timestamp: "15:23:32", side:"B", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01705"},
            {price: 207, amount: 15000, timestamp: "12:43:31", side:"S", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01705"}
        ],
        dayBeforeTrades : [
        
        ],
        yday: "10 Nov",
        dayBefore : "09 Nov"
    };
    let tradeBook2 = {
        todayTrades : [
        {price: 190, amount: 10000, timestamp: "18:53:35", side:"S", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01704"},
        {price: 195, amount: 20000, timestamp: "16:33:45", side:"S", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01704"},
        {price: 171, amount: 30000, timestamp: "15:23:32", side:"S", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01704"},
        {price: 205, amount: 15000, timestamp: "12:43:31", side:"B", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01705"}
        ],
        ydayTrades: [
            {price: 190, amount: 11000, timestamp: "18:53:35", side:"B", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01704"},
            {price: 195, amount: 23000, timestamp: "16:33:45", side:"B", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01704"},
            {price: 184, amount: 33000, timestamp: "15:23:32", side:"B", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01705"},
            {price: 207, amount: 15000, timestamp: "12:43:31", side:"S", styleClass:"c01711 c01708 c01712 exchange-numberSmall c01705"}
        ],
        dayBeforeTrades : [
        
        ],
        yday: "10 Nov",
        dayBefore : "09 Nov"
    };
    //let tradeBook = tradeBook2
    let tradeBookVue = new Vue({
        el: "#tradeBookContainer",
        data : {
            tradeBook : tradeBook1
        }
    });
    setInterval(function(){
        let depth = 20
        let randomSpread = Math.floor(Math.random()*10) + 5
        let midRate =  200
        let {buyBookRaw, sellBookRaw, oclh} = createOrderBook(midRate, randomSpread, depth)
        let buyBookDisplay = getDisplayOrderBook(buyBookRaw, "B")
        let sellBookDisplay = getDisplayOrderBook(sellBookRaw, "S")
        let spread = (sellBookRaw[0].price - buyBookRaw[0].price)
        //console.log("Display Book Buy " + JSON.stringify(buyBookDisplay));
        //console.log("Display Book Sell " + JSON.stringify(sellBookDisplay));
        orderBookVue.buyBookDisplay = buyBookDisplay
        orderBookVue.sellBookDisplay = sellBookDisplay
        orderBookVue.topOfTheBookSpreadPercent = (100*spread/(buyBookRaw[0].price)).toFixed(2) + "%"
        orderBookVue.lastTradedRate = buyBookRaw[5].price
        //chart.updateSeries([{
          //  data: createOCLHSeries(oclh, 10)
        //}])
        if (tradeBookVue.tradeBook.todayTrades.length == 5){
            tradeBookVue.tradeBook = tradeBook2
        }
        else {
            tradeBookVue.tradeBook = tradeBook1
        }
        

    }, 3000);

    function showNavMenu(){
        console.log('show Nav Menu');
        var menuDivs = document.getElementsByClassName('c0198 c01105');
        var menuDiv = menuDivs[0];
        console.log(menuDiv.style.display);
        if (menuDiv.style.display == "initial"){
            menuDiv.style.display = "none"
        }
        else {
            menuDiv.style.display = "initial"
        }
        console.log(menuDiv.style.display);
    }
    var mainMenu = document.getElementById("mainMenuNav");
    console.log('mainMenuNav ' + mainMenu.class);
    mainMenu.addEventListener("click", showNavMenu);

    /*$(".c01295").hover(function(){
        console.log("hover " + $(this).attr("id"));
        $(this).append("<div class='hoverlay'>Liquidity Info</div>");
    }, function(){
        $(this).children('.hoverlay').remove();
    });*/
      $(document).on("mouseenter", ".c01295", function(){
        console.log("mouseenter " + $(this).attr("id"));
        let id = $(this).attr("id");
        let index = id.substring("sell".length + 1);
        console.log("index " + index);
        let divElem = $(this).children()[0]
        $(this).append("<div class='hoverlay'>Liquidity Info</div>");            
    });
    
    $(document).on("mouseleave", ".c01295", function(){
        console.log("mouseleave " + $(this).attr("class"));
        $(this).children('.hoverlay').remove();
    });
});

    