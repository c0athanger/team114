import axios from 'axios';
// URL of server, change this if you need to change the URL
export default axios.create({
	baseURL: 'http://flip3.engr.oregonstate.edu:9039'
})