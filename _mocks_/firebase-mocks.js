const auth = () => {
    return {
        signInWithEmailAndPassword : (email,password) =>{
            return new Promise((resolve) => {
                resolve ('existe  cuenta')
            })
        }
    }
};



const firebase = {
    auth : auth
}

// agregando jest para convertir en un mock -- funciones de burla

export default jest.fn(()=>{
    return firebase
})    // crear mock fucntion 
