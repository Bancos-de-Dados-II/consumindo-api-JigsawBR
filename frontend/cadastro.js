const API_URL = 'http://localhost:3000'; // ajuste se necessário

const form = document.getElementById('cadastro-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const res = await fetch(`${API_URL}/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Cadastro realizado com sucesso!');
      window.location.href = 'login.html';
    } else {
      alert(data.message || 'Erro no cadastro');
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário', error);
  }
});
