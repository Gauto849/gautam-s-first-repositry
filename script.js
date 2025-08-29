function change_flag(element) {
  
  let img = element.parentElement.querySelector("img");
  img.src =`https://flagsapi.com/${countryList[element.value]}/flat/64.png`;
  
}
let base_url = "https://openexchangerates.org/api/latest.json?app_id=032016dfab7a4dbca4e49a54583f2e1e";
let drop_d = document.querySelectorAll("select");

for(let item of drop_d) {
  item.addEventListener("change",async ()=> {
    let msg = document.querySelector(".msg");
    msg.classList.add("hide");
    change_flag(item);
  let get_data = await fetch (base_url);
  let to = document.querySelector(".to_curr").value;
  let from = document.querySelector(".from_curr").value;
let data = await get_data.json();
  let info = document.querySelector(".info");
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
  
  let get_data = await fetch(base_url);
let data = await get_data.json();
  
  
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
