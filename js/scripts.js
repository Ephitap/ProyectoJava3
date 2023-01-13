//Usuarios y Libros
const usuarios = [{
    username: 'Rogal Dorn',
    email: 'RogalDornn@gmail.com',
    pass: 'password123'
},
{
    username: 'Angry Boii',
    email: 'Angronn@gmail.com',
    pass: 'FrackOff666'
},
{
    username: 'El señor de la nocheee',
    email: 'KonRad@gmail.com',
    pass: 'KillEmAll555'
}]

const Libros = [{
    id:1,
    titulo: "The Brightest and The Best",
    Media: "Ebook",
    Precio: 3500,
    Autor: "Mike Brooks",
    img: './img/libro-1.webp'
}, {
    id:2,
    titulo: "Los fantasmas de Gaunt",
    Media: "Libro  Audible",
    Precio: 13500,
    Autor: "Mike Brooks",
    img: './img/libro-2.webp'
}, {
    id:3,
    titulo: "Da Gobbo's Demise",
    Media: "Ebook  Libro  Audible",
    Precio: 6000,
    Autor: "Denny Flowers",
    img: './img/libro-3.jpg'
}, {
    id:4,
    titulo: "Sabbat Worlds Crusade Collection 1",
    Media: "Libro",
    Precio: 30000,
    Autor: "Mike Brooks",
    img: './img/libro-4.jpg'
}
, {
    id:5,
    titulo: "Lupercal's War",
    Media: "Libro",
    Precio: 1000,
    Autor: "Mike Brooks",
    img: './img/libro-5.jpg'
}
, {
    id:6,
    titulo: "The Greater Good",
    Media: "Audible",
    Precio: 20500,
    Autor: "Mike Brooks",
    img: './img/libro-6.jpg'
}
]

//DOM
const mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    recordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles');


//Storage
function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'nicka': usuarioDB.username,
        'user': usuarioDB.email,
        'pass': usuarioDB.pass
    }

    storage.setItem('usuario', JSON.stringify(usuario));
    }


//Limpiar los storages
function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

//Recupero los datos que se guardaron y los retorno
function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}

//Mostrara el nickname
function saludar(usuario) {
    nombreUsuario.innerHTML = `<span>${usuario.nicka}</span><br> Ingresa a la libreria`
}

//HTML DINAMICO
function mostrarInfoLibro(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card " id="tarjeta${element.nombre}">
                <h3 class="card-header text-center" id="TituloLibro""> ${element.titulo}</h3>
                <img src="${element.img}" alt="${element.titulo}" class="card-img-bottom" id="LibroIMG">
                <div class="card-body">
                    <p class="card-text" id="AutorLibro">Autor: ${element.Autor}</p>
                    <p class="card-text" id="MediaLibro">Media: ${element.Media} </p>
                    <p class="card-text" id="IDLibro">ID Libro: ${element.id} </p>
                    <p class="card-text text-danger" id="PrecioLibro">Precio: ${element.Precio} CLP</p>
                </div>
            </div>`;
        contTarjetas.innerHTML += html;
    });
}

function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

//Esta función revisa si hay un usuario guardado en el storage, y en ese caso evita todo el proceso de login 
function estaLogueado(usuario) {

    if (usuario) {
        saludar(usuario);
        mostrarInfoLibro(Libros);
        presentarInfo(toggles, 'd-none');
    }
}
//valida usuario
function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.email == user);

    //console.log('Usuario encontrado por validate '+ typeof isFound);
    if (typeof encontrado === 'undefined') {
        return false; 
    } else {
        //si estoy en este punto, quiere decir que el mail existe, sólo queda comparar la contraseña
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    //Valida que ambos campos estén completos
    if (!mailLogin.value || !passLogin.value) {
        alert('Todos los campos son requeridos');
    } else {
        //Revisamos si el return de la función validate es un objeto o un boolean. Si es un objeto, fue una validación exitosa y usamos los datos. Si no, informamos por alert.
        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {

            //Revisamos si elige persistir la info aunque se cierre el navegador o no
            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            //Recién ahora cierro el cuadrito de login
            modal.hide();
            //Muestro la info para usuarios logueados
            mostrarInfoLibro(Libros);
            presentarInfo(toggles, 'd-none');
        }
    }
});

btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(toggles, 'd-none');
});

estaLogueado(recuperarUsuario(localStorage));