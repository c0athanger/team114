import axios from 'axios';
export default axios.create({
	baseURL: 'http://flip4.engr.oregonstate.edu:9009'
})