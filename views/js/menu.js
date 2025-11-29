window.onload = () => {
    const token = localStorage.getItem('token');

    // Si no hay token -> saca al usuario
    if (!token) {
        window.location.href = 'login.html';
    }
};

function logout(){
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}