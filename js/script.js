const $insert = document.querySelector('.geral')
const $button = document.querySelector('button')
const user = document.querySelector('input')

function gerarDados(info, repos) {
    const perfil = document.createElement('div')
    perfil.classList.add('image')

    const img = document.createElement('img')
    img.setAttribute('src', info.avatar_url)

    const div2 = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.innerText = info.name

    const p = document.createElement('p')
    p.innerText = info.bio

    div2.appendChild(h2)
    div2.appendChild(p)

    perfil.appendChild(img)
    perfil.appendChild(div2)

    $insert.appendChild(perfil)

    const reps = document.createElement('div')
    reps.classList.add('reps')
    reps.innerHTML = "<h2>Repositórios</h2>"

    const ul = document.createElement('ul')
    for (let i = 0; i < repos.length; i++) {
        const li = document.createElement('li')
        li.innerHTML = `<a href="${repos[i].clone_url}" target=”_blank”>${repos[i].name}</a>`
        ul.appendChild(li)
    }
    reps.appendChild(ul)
    $insert.appendChild(reps)

}

async function getUser(user) {

    const info = await (await fetch(`https://api.github.com/users/${user}`, {
        auth: "Riann472",
        password: "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"
    })).json()

    if (info.status == "404") {
        alert(`Erro: "${info.message}"`)
        console.log(info)
    } else {
        const repos = await (await fetch(`${info.repos_url}`, {
            auth: "Riann472",
            password: "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"
        })).json()

        const divExistente = document.querySelector('.image')
        const divExistente2 = document.querySelector('.reps')

        if (divExistente != null) {
            divExistente.remove()
            divExistente2.remove()
            gerarDados(info, repos)
        } else {
            gerarDados(info, repos)
        }
    }
}

$button.addEventListener('click', () => {
    getUser(user.value)
})

