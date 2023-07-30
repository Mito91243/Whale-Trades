import fs from "fs";

let address = document.querySelector('form').addEventListener('submit' , Get_Address)

function Get_Address() {
    let add = document.querySelector('#wallet').value
    if(add) return add;
}

fs.writeFile('test.txt', address ,(err) => {
    if(err) console.error(err)
    console.log(address)
})