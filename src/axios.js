import axios from 'axios';
// URL of server, change this if you need to change the URL
export default axios.create({
	baseURL: 'http://flip1.engr.oregonstate.edu:9029'
})