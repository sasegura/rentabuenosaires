import AxiosConexionConfig from 'conexion/AxiosConexionConfig';

const getUsuario=async (email)=>{
    const values = JSON.stringify({
        where: {
            correo: email              
        }
    });
    const usuario=await AxiosConexionConfig.get('/usuarios?filter='+encodeURIComponent(values))
        .catch((e)=>console.log(e));
    return usuario.data
}
export default getUsuario;