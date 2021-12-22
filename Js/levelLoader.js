var url

function changeL(){
 url = path

var xhr = new XMLHttpRequest()
xhr.open("get",url)

xhr.onreadystatechange = function(){
if(xhr.readyState == 4){

output(xhr.responseText)


}

}

xhr.send()



function output(str){
data = JSON.parse(str)
area = data.name
world = data.data

}

}



function init(){
var xhr = new XMLHttpRequest()
xhr.open("get",url)

xhr.onreadystatechange = function(){
if(xhr.readyState == 4){
output(xhr.responseText)
}
}

xhr.send()


function output(str){
resp = JSON.parse(str)
area = resp.name
arr2d = resp.data // we grab level's data


world = arr2d

mapW = world[0].length*ts
mapH = world.length*ts

}

}

