var money = document.getElementById("money")
var autoclick = false
var moneyPerClick = 1
var itemBuy =[
    {name:'Bąbka',  photo:'bauble_',        price: 100,   num:0,    value:1     },
    {name:'Dzwonek',photo:'bells_',         price: 500,   num:0,    value:10    },
    {name:'Elf',    photo:'Elf_',           price: 1000,  num:0,    value:50    },
    {name:'Ciastek',photo:'Gingerbread_',   price: 1500,  num:0,    value:100   },
    {name:'Renifer',photo:'Renifer_',       price: 2000,  num:0,    value:200   },
]
function pressFlake(){
    money.innerHTML = parseFloat(money.innerHTML)+ moneyPerClick
}

function autoPressFun(){
    if(autoclick){
        press()
    }
}

function buyItem(input){
    moneyPerClick += itemBuy[input].value
}

autoclickInterval = window.setInterval(autoPressFun, 1000);