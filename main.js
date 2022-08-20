const form = document.getElementById('form-control')
const amount = document.getElementById('amount')
const description = document.getElementById('desc')
const category = document.getElementById('category')
const submit = document.getElementById('submitbtn')
submit.addEventListener('click', onSubmit)

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/214983645cf4452a800285f62dabe81c/expenses')
    .then((response) => {
        for (let i=0; i<response.data.length; i++){
            appendList(response.data[i]);
        }
    })
    .catch((err) => console.log(err))

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
    axios.post('https://crudcrud.com/api/214983645cf4452a800285f62dabe81c/expenses',myObj)
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

        //================================================================================
        // changes happened here to delete from the server
        //================================================================================


        const descforremovingfromlocal = deleteButton.previousSibling.previousSibling.previousSibling.innerHTML;
        const cateforremovingfromlocal = deleteButton.previousSibling.previousSibling.innerHTML;
        const priceforremovingfromlocal = deleteButton.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;


        // we need to remove from server
        // search using id and then remove on button click from server
        axios.get('https://crudcrud.com/api/214983645cf4452a800285f62dabe81c/expenses')
        .then((response) => {
            for (let i=0; i<response.data.length; i++){
                console.log(response.data[i]._id);
                let toMatch = response.data[i];
                if(toMatch.amt == priceforremovingfromlocal && toMatch.cat == cateforremovingfromlocal && toMatch.desc == descforremovingfromlocal){
                    let targetId = toMatch._id
                    console.log('toMatch',toMatch);
                    axios.delete(`https://crudcrud.com/api/214983645cf4452a800285f62dabe81c/expenses/${targetId}`)
                    .then((response) => console.log('deleted',targetId))
                    .catch((err) => console.log(err))
                }
            }
        })
        .catch((err) => console.log(err))




        // localStorage.removeItem(descforremovingfromlocal.innerHTML) 
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





