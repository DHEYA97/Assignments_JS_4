var uName = document.getElementById("uName")
var uEmail = document.getElementById("uEmail")
var uPassword = document.getElementById("uPassword")
var login = document.getElementById("login")
var signup = document.getElementById("signup")
var loginError = document.getElementById("loginError")
var signupError = document.getElementById('signupError')
var welcomeuser = document.querySelector('#welcome span')
var logout = document.querySelector('.nav-item a')
var currentIndex
var user
var userSesstionList


if(localStorage.getItem('userLogin') == null)
{
    user = []
}
else
{
    user = JSON.parse(localStorage.getItem('userLogin'))
}

if(localStorage.getItem('userSesstion') == null)
{
    userSesstionList = []
}
else
{
    userSesstionList = JSON.parse(localStorage.getItem('userSesstion'))
}
// console.log(userSesstionList)

// console.log(location.href)
// console.log(location.hostname)
var path = location.pathname.split("/")
var baselocation = ""
for(var i = 0 ; i <path.length-1 ;i++)
{
    baselocation += '/' + path[i]
}
console.log(location.pathname)
console.log(baselocation.slice(1) + "/home.html")
console.log(location.pathname)
// location.replace(baselocation + "/home.html")
console.log(location.hostname  + "/" + baselocation + "/home.html")

if(location.pathname.slice(0) == (baselocation.slice(1) + "/home"))
{
    if(localStorage.getItem('userSesstion') == null)
    {
        location.replace(location.hostname  + "/" + baselocation + "/index.html")
    }
    else
    {
        welcomeuser.innerHTML = userSesstionList[0].username
    }
}

if(location.pathname.slice(0) == (baselocation.slice(1) + "/index"))
{
    if(localStorage.getItem('userSesstion'))
    {
        location.replace(location.hostname  + "/" + baselocation + "/home.html")
    }
}

if(login)
{

    login.addEventListener('click',function(){
        if(isLoginEmpty())
        {
            loginError.classList.replace('text-success' ,'text-danger')
            loginError.innerHTML = "All inputs is required"
        }
        else
        {
            var a = 0
            for(var i = 0 ; i<user.length ; i++)
            {
                if(uEmail.value == user[i].uEmail && uPassword.value == user[i].uPassword)
                {
                    currentIndex = i
                    a = 1
                    break
                }
            }
            // console.log(a)
            if(a == 1)
            {
                userSesstionList.push(user[currentIndex])
                localStorage.setItem('userSesstion',JSON.stringify(userSesstionList))
                // console.log(userSesstionList);
                location.replace(baselocation + "/home.html")
            }
            else
            {
                loginError.classList.replace('text-success' ,'text-danger')
                loginError.innerHTML = "incorrect email or password"
                // console.log('email already exists')
            }
        }
    })
}

if(signup)
{
signup.addEventListener('click',function(){
    if(isEmpty())
    {
        signupError.classList.replace('text-success' ,'text-danger')
        signupError.innerHTML = "All inputs is required"
    }
    else
    {
        var a = 0
        for(var i = 0 ; i<user.length ; i++)
        {
            if(uEmail.value == user[i].uEmail)
            {
                a = 1
                break
            }
        }
        // console.log(a)
        if(a == 0)
        {
            var user1  = {
                username : uName.value,
                uEmail : uEmail.value,
                uPassword : uPassword.value,
            }
            user.push(user1)
            localStorage.setItem('userLogin',JSON.stringify(user))
            console.log(user);
            signupError.classList.replace('text-danger','text-success')
            signupError.innerHTML = "Success"
            clear()
        }
        else
        {
            signupError.classList.replace('text-success' ,'text-danger')
            signupError.innerHTML = "email already exists"
            // console.log('email already exists')
        }
        
    }
})
}
if(logout)
{
    logout.addEventListener('click',function()
    {
        localStorage.removeItem('userSesstion')
    })
}
function isEmpty()
{
    if(uEmail.value == '' || uName.value == '' || uPassword.value == '')
    {
        return true
    }
    else return false
}

function isLoginEmpty()
{
    if(uEmail.value == '' || uPassword.value == '')
    {
        return true
    }
    else return false
}

function clear()
{
    uName.value = ""
    uEmail.value = ""
    uPassword.value = ""
}