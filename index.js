const userdata=document.querySelector(".usertext");
const addBtn=document.querySelector(".addUserbtn");
const userDis=document.getElementById("discription");

const addBtn1=addBtn.innerText;
let display=document.querySelector("#display-container");
let userArray=[];
let edit_id=null;

let objData=localStorage.getItem("title");
if(objData!= null){
    userArray=JSON.parse(objData);
}


console.log(userArray);

displayData();

addBtn.addEventListener("click",()=>{

   const entredData= userdata.value;
   const userDiscription= userDis.value;
   if(edit_id!=null){
    //edit karna hai
    userArray.splice(edit_id,1,{"name":entredData,"discription":userDiscription})

    edit_id=null;
   }
   else{
    //insert karna hai
    userArray.push({"name":entredData,"discription":userDiscription});
   }
   
   saveData(userArray);
   userdata.value="";
   userDis.value="";
   displayData();
   addBtn.innerText=addBtn1;
   
  
})

// create a function which are used to save detaile

function saveData(ary){
    let str= JSON.stringify(ary);
localStorage.setItem("title",str)//here is problem when i refresh and new data enter so the previous data delete thats why we need to save it
}

// create a function which are used to display user data on display
function displayData(){
    let statement="";
    userArray.forEach((user,id)=>{
        statement+=`<tr style="  "  >
        <td style="width:5%;">${id+1}</td>
          <td style="width:15%;">${user.name}</td>
          <td style="width:60%; ">${user.discription}</td>
          <td style="color:red ";
          "><i  class="fa fa-edit " style="font-size:28px; margin-right:1em;  cursor: pointer;"  onclick="editData(${id})"></i>
          <i  class="fa fa-times-circle" style="font-size:28px;  cursor: pointer;" onclick="deleteData(${id})"></i></td>
          </tr>
        
       `
    })

    display.innerHTML=statement;

}

//create a function which are used to delete detaile
function deleteData(id){
userArray.splice(id,1);
saveData(userArray);
displayData();
}

//create a function which are used to edit detaile

function editData(id){
 edit_id=id;
 addBtn.innerText="Save Changes";
 userdata.value=userArray[id].name;
 userDis.value=userArray[id].discription;


}