
/*const btSalvar = document.getElementById("btSalvar");

btSalvar.addEventListener('click', function(){
    const titulo = document.getElementById("titulo");
    const descricao = document.getElementById("descricao");
    const tipo = document.getElementById("tipo");
    
    const task = {
        titulo: titulo.value,
        descricao: descricao.value,
        tipo: tipo.value
    };

    try {
        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        }).then(response => {
            if (!response.ok) {
                throw new Error("Erro na resposta da API");
            }
            return response.json();
        }).then(data => {
            console.log("Task criada com sucesso:", data);
        });
    } catch(err) {
        console.log("Erro ao criar task: " + err);
    }
});*/

