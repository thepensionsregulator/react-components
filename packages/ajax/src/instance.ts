import axios from 'axios';
import https from 'https';

const agent = new https.Agent({ ca: process.env.NODE_EXTRA_CA_CERTS });
const registryInstance = axios.create({
	httpsAgent: agent,
	baseURL: 'https://apim.dev01.tpr.gov.uk/randomtrustees/',
	timeout: 30000,
	headers: {
		'Ocp-Apim-Subscription-Key': 'c7dd5beab8a74e5ca0a20c2a02ddeb57',
	},
});

function registryFetcher(endpoint) {
	return registryInstance.get(endpoint).then(({ data }) => data);
}
