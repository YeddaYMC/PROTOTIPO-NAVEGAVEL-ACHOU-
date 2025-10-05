// Lógica simples do protótipo: navegação entre telas, RBAC simulado e armazenamento local
const state = {
    currentScreen: 'screen-1',
    role: null, // 'consumer' | 'business'
    users: JSON.parse(localStorage.getItem('proto_users') || '[]'),
    currentUser: JSON.parse(localStorage.getItem('proto_currentUser') || 'null'),
    businesses: JSON.parse(localStorage.getItem('proto_businesses') || '[]')
}

function show(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
    const el = document.getElementById(screenId)
    if (el) el.classList.add('active')
    state.currentScreen = screenId
}

// inicialização
show('screen-1')

// delegação de clicks
document.body.addEventListener('click', e => {
    const a = e.target.closest('[data-action]')
    if (a) {
        const action = a.getAttribute('data-action')
        handleAction(action, a)
    }
    const roleBtn = e.target.closest('[data-role]')
    if (roleBtn) {
        const role = roleBtn.getAttribute('data-role')
        state.role = role
        // salvar temporariamente
        localStorage.setItem('proto_role', role)
        show('screen-3')
    }
})

function handleAction(action, el) {
    switch (action) {
        case 'create-account': show('screen-2'); break
        case 'goto-login': show('screen-4'); break
        case 'back': goBack(); break
        case 'google-login': alert('Fluxo de login com Google simulado.'); break
        case 'profile': show('screen-7'); renderProfile(); break
        case 'create-business': show('screen-9'); break
        case 'manage-business': show('screen-10'); break
        case 'view-my-ad': openMyAd(); break
        case 'edit-profile': alert('Abrir formulário de edição (simulado)'); break
        case 'logout': doLogout(); break
        case 'agree-lgpd': localStorage.setItem('proto_lgpd', '1'); show('screen-1'); break
        case 'edit-account': alert('Editar cadastro pessoal (simulado)'); break
        case 'edit-business': show('screen-9'); break
        case 'delete-business': confirmAction('Excluir perfil do negócio? (simulado)', () => {
            state.businesses = []
            saveState()
            show('screen-8')
        })
            break
        case 'delete-account': confirmAction('Deletar conta e dados? (simulado)', () => {
            state.users = []
            state.currentUser = null
            saveState()
            show('screen-1')
        })
            break
    }
}

function goBack() {
    // regras simples de retrocesso baseado em tela atual
    switch (state.currentScreen) {
        case 'screen-2': show('screen-1'); break
        case 'screen-3': show('screen-2'); break
        case 'screen-4': show('screen-1'); break
        case 'screen-5': show('screen-1'); break
        case 'screen-6': show('screen-5'); break
        case 'screen-7': show('screen-5'); break
        case 'screen-8': show('screen-1'); break
        case 'screen-9':
            // se empreededor vai pra 8
            show(state.currentUser && state.currentUser.role === 'business' ? 'screen-8' : 'screen-1')
            break
        default: show('screen-1')
    }
}

// Signup
document.getElementById('signup-form').addEventListener('submit', e => {
    e.preventDefault()
    const f = e.target
    const data = Object.fromEntries(new FormData(f).entries())
    data.role = localStorage.getItem('proto_role') || state.role || 'consumer'
    data.id = Date.now()
    state.users.push(data)
    state.currentUser = { id: data.id, email: data.email, role: data.role }
    saveState()
    show('modal')
    showModal('Conta criada com sucesso! Você será direcionado(a).', () => {
        // redirecionar pelo papel
        if (data.role === 'consumer') show('screen-5')
        else show('screen-8')
    })
})

// Login
document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault()
    const f = e.target
    const { email, password } = Object.fromEntries(new FormData(f).entries())
    const user = state.users.find(u => u.email === email && u.password === password)
    if (!user) {
        showModal('Usuário ou senha inválidos', () => { show('screen-4') })
        return
    }
    state.currentUser = { id: user.id, email: user.email, role: user.role }
    saveState()
    showModal('Login efetuado com sucesso', () => {
        if (user.role === 'consumer') show('screen-5')
        else show('screen-8')
    })
})

// render results (protótipo)
function renderResults() {
    const list = document.getElementById('results')
    list.innerHTML = ''
    // gerar itens de exemplo
    for (let i = 1; i <= 5; i++) {
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `<div><strong>Negócio ${i}</strong><div class="muted">${(i * 0.7).toFixed(1)} km</div></div><button data-action="open-biz" data-id="${i}">Abrir</button>`
        list.appendChild(card)
    }
}

// delegar abrir negócio
document.body.addEventListener('click', e => {
    const openBtn = e.target.closest('[data-action="open-biz"]')
    if (openBtn) {
        const id = openBtn.getAttribute('data-id')
        openBusiness(id)
    }
})

function openBusiness(id) {
    // preencher template
    document.getElementById('biz-name').textContent = `Negócio ${id}`
    document.getElementById('biz-desc').textContent = 'Uma descrição curta do negócio.'
    document.getElementById('biz-address').textContent = 'Endereço: Rua Exemplo, 123'
    document.getElementById('biz-hours').textContent = 'Horário: 09:00 - 18:00'
    document.getElementById('biz-distance').textContent = 'Distância: 1.5 km'
    show('screen-6')
}

// Simular ações externas: WhatsApp e Rota
document.getElementById('call-whatsapp').addEventListener('click', () => {
    // pegar info do negócio (no protótipo, usamos o nome exibido)
    const name = document.getElementById('biz-name').textContent || 'Contato'
    showModal(`Simulação: abrir WhatsApp para ${name}. Número: (11) 9xxxx-xxxx`, () => { })
})

document.getElementById('route').addEventListener('click', () => {
    showModal('Simulação: abrir app de rotas (Google Maps) para traçar rota.', () => { })
})

// perfil
function renderProfile() {
    const p = document.getElementById('profile-info')
    if (!state.currentUser) {
        p.innerHTML = '<p>Nenhum usuário logado.</p>'
        return
    }
    const user = state.users.find(u => u.id === state.currentUser.id)
    if (!user) return
    p.innerHTML = `<p><strong>${user.name}</strong></p><p>${user.email}</p>`
}

// criar/editar negocio
document.getElementById('business-form').addEventListener('submit', e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries())
    data.id = Date.now()
    state.businesses.push(data)
    saveState()
    showModal('Perfil do negócio salvo e publicado!', () => { show('screen-8') })
})

function openMyAd() {
    const b = state.businesses[0]
    if (!b) {
        showModal('Você ainda não tem um anúncio.', () => { show('screen-8') })
        return
    }
    // preencher dados do anúncio
    document.getElementById('biz-name').textContent = b.fantasyName || 'Meu negócio'
    document.getElementById('biz-desc').textContent = b.description || ''
    document.getElementById('biz-address').textContent = b.address || ''
    show('screen-6')
}

function doLogout() {
    state.currentUser = null
    localStorage.removeItem('proto_currentUser')
    show('screen-1')
}

// modais
function showModal(text, cb) {
    const modal = document.getElementById('modal')
    document.getElementById('modal-text').textContent = text
    modal.classList.remove('hidden')
    document.getElementById('modal-ok').onclick = () => {
        modal.classList.add('hidden')
        if (cb) cb()
    }
}

function confirmAction(text, cb) {
    if (confirm(text)) cb()
}

function saveState() {
    localStorage.setItem('proto_users', JSON.stringify(state.users))
    localStorage.setItem('proto_businesses', JSON.stringify(state.businesses))
    localStorage.setItem('proto_currentUser', JSON.stringify(state.currentUser))
}

// render inicial
renderResults()

// mostrar tela apropriada se já logado
if (state.currentUser) {
    const u = state.users.find(x => x.id === state.currentUser.id)
    if (u) {
        if (u.role === 'consumer') show('screen-5')
        else show('screen-8')
    }
}
