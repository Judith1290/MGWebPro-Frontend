// async function postData(url, payload) {
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload)
//         });
//         return await response.json();
//     } catch (error) {
//         console.error("Error posting data:", error);
//     }

// }


// const postData = async (contrasena, correo) => {
//     try {
//         // Verificar si el correo ya existe en la base de datos
//         const users = await getData();
//         const userExists = users.find(user => user.gmail === correo);
//         if (userExists) {
//             throw new Error("Correo electrónico ya registrado");
//         }

//         // Si el correo no existe, proceder con la inserción del nuevo usuario
//         const response = await fetch(apiUrl, {
//             method: "POST",
//             mode: "cors",
//             credentials: "same-origin",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 contrasena,
//                 gmail: correo,
//                 tipe: "user"
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error en la solicitud POST:", error);
//         return null;
//     }
// }



// const getData = async (apiUrl) => {
//     try {
//         const response = await fetch(apiUrl, {
//             method: "GET",
//             mode: "cors",
//             credentials: "same-origin",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error en la solicitud GET:", error);
//         throw error;
//     }
// };
//


async function checkEmailExists(correo) {
    try {
        // Obtener los usuarios
        const users = await getData();

        // Buscar si el correo ya existe
        const userExists = users.find(user => user.gmail === correo);

        // Si existe, devolver true
        return !!userExists;
    } catch (error) {
        console.error("Error checking email existence:", error);
        return false; 
    }
}

async function postData(url, payload) {
    try {
        // Verificar si el correo ya existe antes de hacer la solicitud POST
        const emailExists = await checkEmailExists(payload.gmail);
        if (emailExists) {
            throw new Error("Correo electrónico ya registrado");
        }

        // Si el correo no existe, proceder con el registro
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
        return null;
    }
}
async function getData() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud GET: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
    }
}
export{postData, getData};