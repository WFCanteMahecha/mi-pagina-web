// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtRbpONiRosp1DFROn--2ElK8SVclvQwY",
  authDomain: "webprueba-51c6c.firebaseapp.com",
  projectId: "webprueba-51c6c",
  storageBucket: "webprueba-51c6c.firebasestorage.app",
  messagingSenderId: "23038917466",
  appId: "1:23038917466:web:8ca941e3b99fa318109163",
  measurementId: "G-QW7TEGK5H9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Manejo de sesión en `index.html` para login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Redirigir a la página de bienvenida después de un login exitoso
            window.location.href = 'welcome.html';
        })
        .catch(error => {
            // Manejo de errores
            const errorCode = error.code;
            const errorMessage = error.message;

            // Mostrar un mensaje de error según el tipo de error
            if (errorCode === 'auth/user-not-found') {
                document.getElementById('error-message').textContent = 'Este correo electrónico no está registrado.';
            } else if (errorCode === 'auth/wrong-password') {
                document.getElementById('error-message').textContent = 'La contraseña es incorrecta.';
            } else {
                document.getElementById('error-message').textContent = errorMessage;
            }
            document.getElementById('error-message').style.display = 'block';
        });
});

// Manejo de sesión en `welcome.html` para verificar si el usuario está autenticado
if (window.location.pathname === '/welcome.html') {
    auth.onAuthStateChanged(user => {
        if (user) {
            // Si el usuario está autenticado, mostrar su correo electrónico
            document.getElementById('user-email').textContent = `Bienvenido, ${user.email}`;
        } else {
            // Si el usuario no está autenticado, redirigir al login
            window.location.href = 'index.html';
        }
    });

    // Cerrar sesión
    document.getElementById('logout-btn')?.addEventListener('click', function() {
        auth.signOut().then(() => {
            // Redirigir al login después de cerrar sesión
            window.location.href = 'index.html';
        });
    });
}
