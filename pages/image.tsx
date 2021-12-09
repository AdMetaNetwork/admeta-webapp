import Image from 'next/image'
import {PolkadotChainConnector} from './api/polkadotApi';

function ImageAd({ img }) {
	
	return (
		<Image
		src={img}
		alt="Picture of the author"
		width={2214}
		height={1260}
	  />

	)

  }
  // This gets called on every request
export async function getServerSideProps() {
	// Fetch data from external API
  let p : PolkadotChainConnector = new PolkadotChainConnector;
  let img : string = await p.getTargetMetadata();
  
	// Pass data to the page via props
	return { props: { img } }
  }

  
  export default ImageAd