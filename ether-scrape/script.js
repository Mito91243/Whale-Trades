import {writeFile , fs} from "fs";

document.querySelector('form').addEventListener('submit',make)
document.querySelector('form').addEventListener('submit',(e) => {
    e.preventDefault()
})
let address = "zeby"
function make() {
    fs.writeFile('test.txt', address ,(err) => {
        if(err) console.error(err)
        console.log(address)
    })
}

