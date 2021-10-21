import AxiosConexionConfig from 'conexion/AxiosConexionConfig';

const getTips=async (idpiso)=>{
    const values = JSON.stringify({
        where: {
            idpiso              
        }
    });

    const tips=await AxiosConexionConfig.get('/tips?filter='+encodeURIComponent(values))
        .catch((e)=>console.log(e));
    return tips.data
}
export default getTips;