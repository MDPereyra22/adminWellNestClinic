import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal"
import  { styled } from 'styled-components'
import Products from "../../components/GetProducts/GetProducts"
function ProductsList(){
  return(<ContinerLoginPage>
    <BackGroundGlobal imgBackGround = 'https://d1odllitvcy39q.cloudfront.net/images/141_nueva-fachada-seguro-americano-2014.jpg'></BackGroundGlobal>
    <Products></Products>
  </ContinerLoginPage>)
}

const ContinerLoginPage = styled.div`
  width: 100%;
  height: 100vh;
  /* margin-top: calc(100vh * (0.1)) */;

`

export default ProductsList;