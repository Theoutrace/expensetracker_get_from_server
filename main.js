const form = document.getElementById('form-control')
const amount = document.getElementById('amount')
const description = document.getElementById('desc')
const category = document.getElementById('category')
const submit = document.getElementById('submitbtn')
submit.addEventListener('click', onSubmit)

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/9ee616cf63a943ecacfb5ebca0d314b0/expenses')
    .then((response) => {
        for (let i=0; i<response.data.length; i++){
            appendList(response.data[i])
        }
    })
    .catch((err) => console.log(err))


    // let AllkeysInLocalStorage = Object.keys(localStorage) 
    // AllkeysInLocalStorage.forEach(function (key) {
    //     let keyFromLocal = localStorage.getItem(key)
    //     let parsedData = JSON.parse(keyFromLocal)
    //     appendList(parsedData)
    // })  
});

//On-submit function:
function onSubmit(event) {
    event.preventDefault()


    myObj = {
        amt: amount.value,
        desc: description.value,
        cat: category.value
    }
    appendList(myObj)
    amount.value = ''
    description.value = ''
    category.value = ''
}





//Main Function:
function appendList(myObj) {
    
    const allh4inFront =document.getElementsByClassName('desc-h4-class')
    

    for (let i = 0; i<allh4inFront.length; i++){
        if (allh4inFront[i].innerHTML == myObj.desc){
            const toBeDeleted = allh4inFront[i].parentElement
            toBeDeleted.remove()
        }
    }
    
    
    const innerDiv = document.createElement('div')
    innerDiv.classList.add('inner-div')
    const amtContainerH4 = document.createElement('h4')
    const descContainerH4 = document.createElement('h4')
    const catContainerH4 = document.createElement('h4')
    descContainerH4.classList.add('desc-h4-class')

    const editButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    editButton.classList.add('innerbtn')
    editButton.classList.add('editbtn')
    deleteButton.classList.add('innerbtn')
    deleteButton.classList.add('dltbtn')

    editButton.innerHTML = 'Edit'
    deleteButton.innerHTML = 'Delete'

    let stringifiedData = JSON.stringify(myObj)

    amtContainerH4.innerHTML = myObj.amt
    descContainerH4.innerHTML = myObj.desc
    catContainerH4.innerHTML = myObj.cat

    innerDiv.appendChild(amtContainerH4)
    innerDiv.appendChild(descContainerH4)
    innerDiv.appendChild(catContainerH4)
    innerDiv.appendChild(editButton)
    innerDiv.appendChild(deleteButton)

    //================================================================================
    // changes happened here to post to the server
    //================================================================================
    
    console.log('myObj: ', myObj);
    axios.post('https://crudcrud.com/api/9ee616cf63a943ecacfb5ebca0d314b0/expenses',myObj)
    .then((response) => {
        console.log("from post",response);
    })
    .catch((err) => {
        console.log('from post error',err);
    });
    // localStorage.setItem(myObj.desc, stringifiedData)

    //=================================================================================


    const parentDiv = document.getElementById('total-items')
    parentDiv.appendChild(innerDiv)

    //Delete Button Function:
    deleteButton.addEventListener('click', function(){
        const descforremovingfromlocal = deleteButton.previousSibling.previousSibling.previousSibling
        localStorage.removeItem(descforremovingfromlocal.innerHTML) 
        deleteButton.parentElement.remove() 
    })


    //Edit Button Function:
    editButton.addEventListener('click', function(){
        const targetamt = editButton.previousSibling.previousSibling.previousSibling.innerHTML 
        const targetdesc = editButton.previousSibling.previousSibling.innerHTML 
        const targetCategory = editButton.previousSibling.innerHTML

        amount.value = targetamt;
        description.value = targetdesc;
        category.value = targetCategory

        editButton.parentElement.remove() 
        localStorage.removeItem(targetdesc)

    })

}





