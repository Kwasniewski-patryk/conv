 // konfiguracja pól oraz węzłów (ID->zmiennych)
const ins = document.querySelector("#in")
const out = document.querySelector("#out")
const msg = document.querySelector("#msgs")
const cls = {
    a: { from:"00000000", to:"01111110" },
    b: { from:"10000000", to:"10111111" },
    c: { from:"11000000", to:"11011111" },
    d: { from:"11100000", to:"11101111" },
    e: { from:"11110000", to:"11111111" }
}
 // zakres klas

let setMsg = (type,text="")=>{
    if(type=="clear"){
        msg.innerHTML = "";
    }

    if(type=="info"){
        msg.innerHTML = '<p>'+text+'</p>';
    }
    if(type=="error"){
        msg.innerHTML = '<p style="color:red";>'+text+'</p>';
    }
}

// uzupełnianie brakujących znaków dla formatu
let strPad = (len,text,sign="0")=>{
    return sign.repeat(8-len)+""+text;
}

let checkClass = (toCheck)=>{
    var oct = toBin(toCheck);
    for( let [key,val] of Object.entries(cls)){
        if( val.from <= oct && val.to >= oct){
            setMsg('info',"Klasa: "+key);
            break;
        }
    }
}

let toBin = (digit)=>{
    let val = (digit >>> 0).toString(2);
    return strPad(val.length,val)
}

// detekcja formatu adresu: dec2bin | bin2dec
let detect = (e)=>{
    let val = e.target.value;
     if(oct[0].length+oct[1].length+oct[2].length+oct[3].length !==32){
        dec2bin(val); // 192.168 >> 1100000 
     }else{
        bin2dec(val); // 11000000 >> 192....
     }
     
}

// konwersja decimal->binary 
let dec2bin = (ip)=>{
    let binOct = "";
    let bin = "";
    let oct = ip.split('.');
    let oLen = oct.length;
    if(oLen<4)
        setMsg("error","podano tylko "+oLen+" oktety")
    else
        setMsg("clear")
    for(i=0;i<oLen;i++){
        var digit = parseInt(oct[i]);
        (i===0) ? checkClass(digit) : null;
        binOct+=(binOct===""?"":".");
        if(digit >= 0 && digit <=255){
            bin = (digit >>> 0).toString(2);
            var bLen = bin.length;
            binOct+= (bLen<8) ?strPad(bLen,bin) : bin; //działanie uzupełniania wartości binarnej  
        }else
            setMsg("error","wartość poza zakresem na oktecie "+i)
        
        
    }
    out.textContent = bin;
}

// konwersja binary->decimal
let bin2dec = (bin)=>{
    let dec = "";
    let oct = bin.split(".")
    for(i=0;i<oct.length;i++){
        dec+=(dec===""?"":".");
        dec = parseInt(oct[i],2)
    }
    out.textContent = dec
} 



// nasłuch zdarzeń ()

ins.addEventListener('focusout',detect,false);