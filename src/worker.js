/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'POST') {
			const formData = await request.formData();						
			const file = formData.get('file'); // 'file' refers to the name attribute in your input element.
									
			const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
			
			const pinataHeaders = {
			  pinata_api_key: env.PINATA_API_KEY,
			  pinata_secret_api_key: env.PINATA_SECRET_API_KEY,
			}
		
			const pinataData = new FormData();
			pinataData.append('file', file);
		
			const pinataResponse = await fetch(url, {
			  method: 'POST',
			  headers: pinataHeaders,
			  body: pinataData,
			})
		
			const pinataResult = await pinataResponse.json()

			// console.log("pinataResponse: ", pinataResponse);
			console.log("pinataResult: ", pinataResult);
		
			return new Response(JSON.stringify(pinataResult), {
				headers: {
					'content-type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				}
			});
		  } else {
			return new Response('Please send a POST request.', {
				headers: {
					'content-type': 'text/plain',
					'Access-Control-Allow-Origin': '*',
				}
			});
		  }
		  }
};

