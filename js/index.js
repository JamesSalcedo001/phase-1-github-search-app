


const formGrab = document.getElementById("github-form")

formGrab.addEventListener("submit", (event) => {
    event.preventDefault();
    event.target[0].value 

    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then(res => res.json())
    .then(res => {

        const ul = document.getElementById("user-list");
        const rl = document.getElementById("repos-list");

        ul.innerHTML = ""
        rl.innerHTML = ""

        res.items.forEach(user => {
           
            const li = document.createElement("li")

            const avatar = document.createElement("img")

            const name = document.createElement("h3")


            name.textContent = user.login 

            avatar.src = user.avatar_url

            name.addEventListener("click", e => userRepos(user.login, e))

            li.append(name, avatar)
            ul.append(li)


        })
    })
    formGrab.reset();
})


function userRepos(user, e) {
    const rl = document.getElementById("repos-list");
    rl.innerHTML = ""
    e.preventDefault();
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
    .then(res => res.forEach(repo => {
        
        const h2 = document.createElement("h2")
        const li = document.createElement("li")
        li.style = "padding: 20px; margin 20px; background-color: black; color: white;"

        h2.textContent = repo.name
        li.append(h2) 
        rl.append(li)
    }))
}