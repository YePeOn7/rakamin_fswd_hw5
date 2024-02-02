class Form{
    constructor(id, validationCb){
        this.form = document.getElementById(id);
        this.validationCb = validationCb;
    }

    validate(){
        return this.validationCb(this.form.value);
    }

    alertHandle(){
        if (this.validate()) this.form.setCustomValidity("");
        else this.form.setCustomValidity("---"); // can set anything. Just don't let it empty
    }

    getValue(){
        return this.form.value;
    }
}

// Creating form objects
let nameForm = new Form("name", function(nameValue){
    return (nameValue.length >= 10);
});
let ageForm = new Form("age", function(ageValue){
    return (ageValue.trim() >= 25);
})
let stipendForm = new Form("stipend", function(stipendValue){
    return (stipendValue >= 100000 && stipendValue <= 1000000);
})

function submitForm() {
    const name = document.getElementById("name").value
    const age = document.getElementById("age").value
    const stipend = document.getElementById("stipend").value

    const table = document.getElementById("dataTable");
    const row = table.insertRow(-1);
    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = age;
    row.insertCell(2).innerHTML = stipend;

    // --- alternative 1 to add remove button ---- //
    row.insertCell(3).innerHTML = '<button class="btn-custom" onclick="removeRow(this)">Remove</button>';

    //---- alternative 2 to add remove button ---- //
    // const c3 = row.insertCell(3);
    // let button = document.createElement("button");
    // button.classList.add("btn-custom");
    // button.innerHTML = "Remove";
    // button.onclick = function(){
    //     removeRow(this)
    // };
    // c3.appendChild(button);

    // console.log(table);
    // console.log(name);
    // console.log(age);
    // console.log(stipend);
}

function removeRow(button) {
    // console.log("remove row");
    // console.log(button);

    button.parentNode.parentNode.remove();
}

function showTab(id) {
    tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach((tabContent) => {
        tabContent.classList.remove("tab-active");
        // console.log(tabContent);
    })

    document.getElementById(id).classList.add("tab-active");

    if (id == "form_section") {
        // console.log("form selected");
        document.getElementById("btn-form").classList.add("show-as-active");
        document.getElementById("btn-table").classList.remove("show-as-active");
    }
    else {
        // console.log("table selected");
        document.getElementById("btn-table").classList.add("show-as-active");
        document.getElementById("btn-form").classList.remove("show-as-active");
    }
}

function validCallback() {
    let successNotification = document.getElementById("successNotification");

    submitForm();
    successNotification.classList.remove("alert-danger");
    successNotification.classList.add("alert-success");
    successNotification.style.display = "block";
    successNotification.innerHTML = "The data has been successfully submitted";

    setTimeout(function () {
        successNotification.style.display = "none";
    }, 3000);
}

function invalidCallback() {
    let successNotification = document.getElementById("successNotification");

    successNotification.classList.remove("alert-success");
    successNotification.classList.add("alert-danger");
    successNotification.style.display = "block";
    successNotification.innerHTML = "The User input is invalid. Please check again";
}

function validate(validCb, invalidCb) {
    let inputName = document.getElementById('name');
    let inputAge = document.getElementById('age');
    let inputStipend = document.getElementById('stipend');

    let nameValid = nameForm.validate();
    let ageValid = ageForm.validate();
    let stipendValid = stipendForm.validate();

    // need to call ouside event also to get initial validation message
    nameForm.alertHandle();
    ageForm.alertHandle();
    stipendForm.alertHandle();

    // to update the validation message when user changing the input
    // console.log("add name input event listener");
    inputName.addEventListener("input", function () {
        nameForm.alertHandle();
    });

    // console.log("add age input event listener");
    inputAge.addEventListener("input", function () {
        ageForm.alertHandle();
    });

    // console.log("add stipend input event listener");
    inputStipend.addEventListener("input", function () {
        stipendForm.alertHandle();
    })

    // perform callback when success or fail
    if (nameValid && ageValid && stipendValid) {
        // console.log("valid");
        validCb()
    }
    else {
        // console.log("invalid");
        invalidCb();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var formElement = document.querySelector('form');
    formElement.addEventListener('submit', function (event) {
        // need to show bootstrap validation style
        formElement.classList.add("was-validated");

        // prevent to refresh the page
        event.preventDefault();
        event.stopPropagation();

        validate(validCallback, invalidCallback);
    });
});