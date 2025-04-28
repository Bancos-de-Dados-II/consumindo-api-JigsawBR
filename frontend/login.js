const API_URL = 'http://localhost:3000';

const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token); // salva token no navegador
      window.location.href = 'tarefas.html'; // redireciona para a página de tarefas
    } else {
      alert(data.message || 'Falha no login');
    }
  } catch (error) {
    console.error('Erro ao fazer login', error);
  }
});
