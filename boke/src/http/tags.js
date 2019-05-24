import axios from 'axios';
// import api from 'index'
const preUrl = '/boke/api/tags'

export default {
    getTags:function(params,resback,errback) {
        const tagsUrl = `${preUrl}`
        axios.get(tagsUrl)
        .then(res => {
            if(res.status === 200){
                resback(res);
            }
        })
        .catch((err) => {
            if(errback) {
                errback(err)
            }
        })
    }
}