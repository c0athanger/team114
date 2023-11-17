import axios from 'axios';
export default axios.create({
	baseURL: 'http://flip2.engr.oregonstate.edu:8999'
})