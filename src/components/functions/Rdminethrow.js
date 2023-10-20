import axios from "axios";

export async function Throw(user, data, image) {
  if (image.length > 0) {
    try {
      const reportName = await axios.post('http://10.254.4.132:3010/api/postreport', { usuario: user, dados: data }).then(async (e)=>{

      

      if(e.data.message !== "Criado"){
        alert(e.data.message)
      }else{
        alert(e.data.message)

      const requests = image.map(async (img) => {
        console.log(img);
        await axios.post('http://10.254.4.132:3010/api/imgrecieve', {
          "image": img.imagecode,
          "name": img.name,
          "extension": img.extension,
          "reponame": data.reportname
        });
      });

   

      await Promise.all(requests);

      
    }
      
    return e.data.message
  })
      
  

      

     

    } catch (error) {
      return error;
    }
  }

  const withoutfile = await axios.post('http://10.254.4.132:3010/api/postreport', { usuario: user, dados: data })
}
