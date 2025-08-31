function change_flag(element) {
  
  let img = element.parentElement.querySelector("img");
  img.src =`https://flagsapi.com/${countryList[element.value]}/flat/64.png`;
}

let curr_date = document.querySelector(".curr_date");


function warn() {
  let amt = document.querySelector("input").value;
  console.log(amt);
  let warning = document.querySelector(".warning");
  if(amt < 0) {
    warning.innerText = "You are Trying to enter a Negative value \n 👇"
  warning.classList.remove("hide");
  let control = document.querySelectorAll(".control");
  for(c of control) {
    if(c.name != "amt") {
      c.disabled = true;
    }
  }
  } else {
    warning.classList.add("hide");
    let control = document.querySelectorAll(".control");
  for(c of control) {
    if(c.name != "amt") {
      c.disabled = false;
    }
  }
  }
}
let container = document.querySelector(".container");

let input = document.querySelector("input");
let control = document.querySelectorAll(".control");
input.addEventListener("input",()=>{
  warn();
});

function load() {
  let icon = document.querySelector(".loading-icon");
  icon.classList.remove("hide");
  container.style.opacity= 0.5;
  for(c of control) {
    c.disabled = true;
  }
}
function stop_load() {
  let icon = document.querySelector(".loading-icon");
  icon.classList.add("hide");
  container.style.opacity= 1;
  for( c of control) {
    c.disabled = false;
  }
}
let base_url = "https://openexchangerates.org/api/latest.json?app_id=032016dfab7a4dbca4e49a54583f2e1e";
let drop_d = document.querySelectorAll("select");

for(let item of drop_d) {
  warn();
  item.addEventListener("change",async ()=> {
    
    let msg = document.querySelector(".msg");
    msg.classList.add("hide");
    change_flag(item);
    load();
  let get_data = await fetch (base_url);
  let to = document.querySelector(".to_curr").value;
  let from = document.querySelector(".from_curr").value;
let data = await get_data.json();
  let info = document.querySelector(".info");
  stop_load();
  let ratio = (data["rates"][`${to}`])/(data["rates"][`${from}`]);
  
  info.innerText = ` 1 ${from} = ${ratio} ${to}`;
  
  }
  )
  
    for(let country in countryList) {
     let el = document.createElement("option");
     el.innerText=`${country}`;
     item.append(el);
     
     if(item.name == "from" && country == "USD"){
        
        el.selected = "selected";
     }
     if(item.name == "to" && country == "INR"){
       
        el.selected = "selected";
     }
    }

}


let btn = document.querySelector("button");
btn.addEventListener("click",async (evt)=>{
  evt.preventDefault();
  load();
  let error = true;
  setTimeout(()=>{
    if(error) {
  document.querySelector(".natwar_error").classList.remove("hide");
  stop_load();
    } else {
      console.log("fine")
    }
  },10000)
  let get_data = await fetch(base_url);

let data = await get_data.json();
  error = false;
  stop_load();
  let to = document.querySelector(".to_curr").value;
  let from = document.querySelector(".from_curr").value;
  let ratio = (data["rates"][`${to}`])/(data["rates"][`${from}`]);
  let amt = document.querySelector("input").value;
  let msg = document.querySelector(".msg");
  msg.classList.remove("hide");
  if(amt < 0) {
    document.querySelector("input").value = 1;
    amt = 1;
  }
msg.innerText=`${amt} ${from} is equal to ${ratio * amt} ${to}`;
});
setInterval(()=>{
  
  curr_date.innerHTML= new Date();
},1000);
  
