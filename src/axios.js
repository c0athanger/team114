import axios from 'axios';
export default axios.create({
	baseURL: 'http://flip3.engr.oregonstate.edu:9009'
})