var money = document.getElementById("money")
var autoclick = false
var moneyPerClick = 1
var multiply = 1
var itemBuy =[
    {name:'Bombka',  photo:'bauble_',        price: 10,   num:0,    value:1,     costNextLvL:1},
    {name:'Dzwonek',photo:'bells_',         price: 500,   num:0,    value:10,    costNextLvL:100},
    {name:'Elf',    photo:'Elf_',           price: 1000,  num:0,    value:50,    costNextLvL:500},
    {name:'Ciastek',photo:'Gingerbread_',   price: 1500,  num:0,    value:100,   costNextLvL:1000},
    {name:'Renifer',photo:'Renifer_',       price: 2000,  num:0,    value:200,   costNextLvL:5000},
]
var bonus=[
    {isBought: false,price: 1000,},
    {isBought: false,price: 2000,value: 2},
    {isBought: false,price: 3000,value: 3},
    {isBought: false,price: 4000,value: 5},
    {isBought: false,price: 5000,value: 10},
    {isBought: false,price: 6000,value: 100},
]
function setPhoto(input){
    let tmp = "./image/" + itemBuy[input].photo
    let background = "./image/background_unlocked.png"
    if(parseInt(money.innerHTML)>=itemBuy[input].price){
        tmp += "unlocked.png"
        document.getElementById('box'+input).style.backgroundImage = 'url("./image/background_unlocked.png")'
    }else{
        tmp += "locked.png"
        document.getElementById('box'+input).style.backgroundImage = 'url("./image/background_locked.png")'
    }
    document.getElementById('image'+input).src=tmp
}
function setPhotoBonus(){
    if(parseInt(money.innerHTML) >= bonus[0].price && !bonus[0].isBought){
        document.getElementById('bonus0').src = "image/autoclick_unlocked.png"
    }else{
        document.getElementById('bonus0').src = "image/autoclick_locked.png"
    }
    for(var i = 1; i<6; i++){
       if(parseInt(money.innerHTML) >= bonus[i].price &&  bonus[i-1].isBought && !bonus[i].isBought) {
        document.getElementById('bonus'+i).src = "image/x"+bonus[i].value+"_unlocked.png"
       }else{
        document.getElementById('bonus'+i).src = "image/x"+bonus[i].value+"_locked.png"
       }
    }
}
function pressFlake(){
    money.innerHTML = parseFloat(money.innerHTML)+ (moneyPerClick* multiply)
    for(i=0;i<5;i++){
        setPhoto(i)   
    }
    setPhotoBonus()
}
function pressAutoClick(){
    if(parseInt(money.innerHTML) >= bonus[0].price && !bonus[0].isBought){
        autoclick = true
        bonus[0].isBought = true
        money.innerHTML = parseInt(money.innerHTML) - bonus[0].price
    }
}

function pressBonus(input){
    if(parseInt(money.innerHTML) >= bonus[input].price && !bonus[input].isBought && bonus[input-1].isBought){
        multiply = bonus[input].value
        bonus[input].isBought = true
        money.innerHTML = parseInt(money.innerHTML) - bonus[input].price
        setPhotoBonus()
    }
}

function autoPressFun(){
    if(autoclick){
        money.innerHTML = parseFloat(money.innerHTML)+ (moneyPerClick* multiply)
        for(i=0;i<5;i++){
            setPhoto(i)   
        }
        setPhotoBonus()
    }
}

function isPossibleToBuy(input){
    return parseInt(money.innerHTML) >= input.price
}
function setNewValues(input){
    document.getElementById('name'+input).innerHTML = itemBuy[input].name
    document.getElementById('values'+input).innerHTML ='Ilość: ' + itemBuy[input].num
    document.getElementById('cost'+input).innerHTML ='Koszt: ' + itemBuy[input].price
    
    
}
function buyItem(input){
    let tmp = itemBuy[input]
    let tmpMoney = parseInt(money.innerHTML)
    if(isPossibleToBuy(tmp)){
        moneyPerClick += tmp.value
        tmpMoney-=tmp.price
        tmp.num += 1
        tmp.price += tmp.costNextLvL
        money.innerHTML = tmpMoney
        setNewValues(input)
        for(i=0;i<5;i++){
            setPhoto(i)   
        }
    }
}
function onLoadFun(){
    for(var i=0; i<5;i++){
        var child = document.getElementById('box'+i).children
        for(j=0;child[j];j++){
            child[j].onclick = buyItem(i)
        }
        setNewValues(i)
        setPhoto(i)   
    }
}

autoclickInterval = window.setInterval(autoPressFun, 1000);