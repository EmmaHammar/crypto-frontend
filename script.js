const registerContainer = document.getElementById("registerContainer");
let userName = document.getElementById("userName");
let password = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");


const loginContainer = document.getElementById("loginContainer");
let loginUserName = document.getElementById("loginUserName");
let loginPassword = document.getElementById("loginPassword");
let loginBtn = document.getElementById("loginBtn");

const userPageContainer = document.getElementById("userPageContainer");
let msg = document.getElementById("msg");

registerBtn.addEventListener("click", function () {

    msg.innerHTML = "";
    let newUserName = userName.value;
    let newPassword = password.value;

    let newUser = {
        userName: newUserName,
        password: newPassword
    };
    // console.log("newUser:", newUser);

    fetch("http://localhost:3000/users/newuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
    });

    registerContainer.innerHTML = "";
    msg.innerHTML = `<p>Du är nu registrerad, vänligen logga in.</p>`
});

loginBtn.addEventListener("click", function() {
    msg.innerHTML = "";

    let loginUser = {
        userName: loginUserName.value,
        password: loginPassword.value
    };
    // console.log("loginUser: ", loginUser);

    fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log("data:", data)

        if (data === "loginOk") {
            console.log("logga in");

            printUserPage();
            registerContainer.innerHTML = "";
            loginContainer.innerHTML = "";

        } if (data === "error") {
            console.log("errormeddelande");
            msg.innerHTML = `<p>Error, försök igen.</p>`
        }

    });

});

function printUserPage() {
    const userPageTemplate = `
        <h2>Kul att du har loggat in!</h2> 
        <p>Fyll gärna i mer uppgifter så att vi kan nå dig angående din leverans.</p>
        <div id="addInfoContainer">
            <div><input type="text" id="addEmail">E-mail</div>
            <div><input type="text" id="addPhone">Mobilnummer</div>
            <div><button id="addInfoBtn">Lägg till</button></div>
        </div>
    `;

    userPageContainer.innerHTML = userPageTemplate;
};