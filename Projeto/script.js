let tarefas = [
    { id: 1, descricao: "Estudar para a prova", concluida: false },
    { id: 2, descricao: "Limpar a casa", concluida: false },
    { id: 3, descricao: "Comprar morangos", concluida: true },
    { id: 4, descricao: "Jogar videogame :)", concluida: false },
];

let filtroAtual = 'todas';

document.addEventListener('DOMContentLoaded', function() {
    renderizarTarefas();

    document.getElementById('formTarefa').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputTarefa = document.getElementById('tarefa');
        if (inputTarefa.value.trim()) {
            adicionarTarefa(inputTarefa.value.trim().toUpperCase());
            inputTarefa.value = '';
        }
    });

    document.getElementById('btnTodas').addEventListener('click', () => filtrarTarefas('todas'));
    document.getElementById('btnConcluidas').addEventListener('click', () => filtrarTarefas('concluidas'));
    document.getElementById('btnPendentes').addEventListener('click', () => filtrarTarefas('pendentes'));
});

function adicionarTarefa(descricao) {
    const novaTarefa = {
        id: Date.now(),
        descricao: descricao,
        concluida: false
    };
    tarefas.push(novaTarefa);
    renderizarTarefas();
}

function alternarStatus(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        renderizarTarefas();
    }
}

function removerTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    renderizarTarefas();
}

function filtrarTarefas(filtro) {
    filtroAtual = filtro;
    renderizarTarefas();
}

function renderizarTarefas() {
    const listaTarefas = document.getElementById('listaTarefas');
    listaTarefas.innerHTML = '';
    
    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroAtual === 'concluidas') return tarefa.concluida;
        if (filtroAtual === 'pendentes') return !tarefa.concluida;
        return true;
    });
    
    if (tarefasFiltradas.length === 0) {
        listaTarefas.innerHTML = '<p class="tarefa-card">NENHUMA TAREFA ENCONTRADA</p>';
        return;
    }
    
    tarefasFiltradas.forEach(tarefa => {
        const tarefaCard = document.createElement('div');
        tarefaCard.className = `tarefa-card ${tarefa.concluida ? 'concluida' : ''}`;
        
        tarefaCard.innerHTML = `
            <span class="tarefa-texto">${tarefa.descricao}</span>
            <div class="tarefa-acoes">
                <button onclick="alternarStatus(${tarefa.id})">
                    ${tarefa.concluida ? 'DESMARCAR' : 'CONCLUIR'}
                </button>
                <button onclick="removerTarefa(${tarefa.id})">REMOVER</button>
            </div>
        `;
        
        listaTarefas.appendChild(tarefaCard);
    });

    document.addEventListener("DOMContentLoaded", () => {
        const clickSound = document.getElementById("click-sound");
    
        function tocarSom() {
            if (clickSound) {
                clickSound.pause();         // Garante que não sobreponha sons
                clickSound.currentTime = 0; // Recomeça do início
                clickSound.play().catch(err => {
                    console.warn("Som bloqueado ou erro:", err);
                });
            }
        }
    
        document.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", tocarSom);
        });
    });
    
}