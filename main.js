
let titleInput=document.getElementById("task-title");
let date=document.getElementById("deadline");
let textArea=document.getElementById("description");
let noTask=document.getElementById("noTask")




const newItem=document.getElementById("incomplete");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    validate();
})

// validation of data on the inputs
let validate= ()=> {
    if (titleInput.value === "") {
    alert(" You have not add the title and descriptions")
    }

    else {
     noTask.innerHTML = " You have succesfull submited";
     addActivity();
}
}


// add new task to the array local storage.
let activity=[];

let addActivity=()=>{
    activity.push(
        {
          title:titleInput.value,
          date:date.value,
          description: textArea.value
        });
localStorage.setItem("activity", JSON.stringify(activity));
 newActivity()

}
// once i submit task a new to reset values to empty string
let clearForm= ()=>{
  titleInput.value="";
  date.value="";
  textArea.value=""
}
// appending and li element to the list of uncompledte items
const newActivity=()=>{
    newItem.innerHTML="";
    activity.forEach((el, index)=>{
       return( newItem.innerHTML += `
       <li id=${index}>
       <input type="checkbox" class="complete" onClick="clickHander(this)">
        <span style="font-size:24px; font-weight:700; color:black;"> ${el.title}</span>
        <span style="display:block"> Due:${el.date}</span>
        <p>${el.description}</p>

        <button class="edit" onClick="editActivity(this)">Edit</button>
        <button class="delete"  onClick="activitydelete(this);newActivity()" >Delete</button>
        </li>
        `);

    })
    clearForm()
    }
    

// updating the data whever i delete, edit or add new activity
    (() => {
      activity = JSON.parse(localStorage.getItem("activity")) || [];
      newActivity();
  
    })();

// edit button function
    let editActivity = (e) => {
      let editItem = e.parentElement;
      titleInput.value = editItem.children[1].innerHTML;
      date.value = editItem.children[2].innerHTML;
      textArea.value = editItem.children[3].innerHTML;
      activitydelete(e);
      callModal();
    }

  
  // create modal openning function
let chekBox=document.getElementById("click")
let callModal=()=>{
chekBox.checked=true;
chekBox.style.opacity="1";
chekBox.style.visibility="visible"

 }

 let submited=()=>{
chekBox.checked=false;
chekBox.style.opacity="1";
chekBox.style.visibility="visible";
 }


// delete button function
let activitydelete = (e) => {
    e.parentElement.remove();
    activity.splice(e.parentElement.id, 1)

    localStorage.setItem("activity", JSON.stringify(activity));
    activity = JSON.parse(localStorage.getItem("activity")) || [];

  };

  
  
 




let markActivity=[]
let itemComplete=document.getElementById('mark-comp')

// function to split the array and move to the next array

  let clickHander=(e)=>{
  let itemSplit=activity.splice(e.parentElement.id, 1)
  
  localStorage.setItem("activity", JSON.stringify(activity));
  markActivity.push(...itemSplit)
  localStorage.setItem("markActivity", JSON.stringify(markActivity));
    completeTask()
    newActivity()
}





// function to make sure that the task is move to the next div of completed tasks
const completeTask=()=>{

  itemComplete.innerHTML="";
  markActivity.forEach((el, index)=>{

  const deadline=new Date(el.date);
  let days=new Date()
  let mths_=deadline.getTime()-days.getTime()
  let dif_days=Math.ceil(mths_/(1000 * 3600 * 24));
  
  let isNegative=()=>{
    if(dif_days>0){
      return `Task completed  ${dif_days} days earlier`
    }
    else{
      let sumUp=dif_days*-1
      return `Task completed ${sumUp} days late`
    }
  }
     return(itemComplete.innerHTML += `
     <li id=${index} class="taskComplet">
      <span style="font-size: 24px; font-weight:700; color:black">${el.title}</span>
      <span style="font-size: 16px;">${isNegative()}</span>
      <p>${el.description}</p>
      <button class="delete"  onClick="completeDelete(this)" >Delete</button>
      </li>
      `);
  })
  }

 

// delete functionality for the delete button on the completed task
  let completeDelete = (e) => {
    e.parentElement.remove();
    markActivity.splice(e.parentElement.id, 1)

    localStorage.setItem("markActivity", JSON.stringify(markActivity));
    markActivity = JSON.parse(localStorage.getItem("markActivity")) || [];

  };

  // updating the data whever i delete, edit or add new completed activity
  (() => {
    markActivity = JSON.parse(localStorage.getItem("markActivity")) || [];
    completeTask();
  })();
