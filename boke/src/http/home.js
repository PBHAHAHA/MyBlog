import axios from 'axios';
const preUrl = '/boke/api/essay'

export default {
    getEssay:function(params,resback,errback){
        const url = `${preUrl}`
        axios.get(url , params)
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
    },
    getSearch: function(params,resback,errback){
        const contUrl = `${preUrl}/search`
        axios.post(contUrl,params)
        .then(res => {
            if(res.status === 200) {
                resback(res)
            }
        })
        .catch((err) => {
            if(errback) {
                errback(err)
            }
        })
    },
    getContents: function(params,resback,errback) {
        const contUrl = `${preUrl}/${params}`
        axios.get(contUrl,{})
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
    getTagsCont: function(params,resback,errback){
        const contUrl = `${preUrl}`
        axios.post(contUrl,params)
        .then(res => {
            if(res.status === 200){
                resback(res)
            }
        })
        .catch(err => {
            if(errback) errback(err)
        })
    }
}
// function switchParams(params) {
//     let postParams = new URLSearchParams();
//     for(let key in params)
//     {
//         postParams.append(key,params[key]);
//     }
//     return postParams;
// }