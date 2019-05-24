import axios from 'axios';
// import api from 'index'
const remarkUrl = '/boke/api/remark'

export default {
    addRemark:function(params,resback,errback) {
        const addUrl = `${remarkUrl}/addRemark`
        axios.post(addUrl,params)
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
    },
    getRemark(params,resback,errback){
        const getUrl = `${remarkUrl}/${params}`
        axios.get(getUrl)
        .then(res => {
            if(res.status === 200){
                resback(res);
            }
        })
        .catch((err) => {
            if(errback){
                errback(err)
            }
        })
    }
}