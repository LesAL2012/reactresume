import * as axios from "axios";

const instance = axios.create({

    baseURL: 'https://react.ts.biz.ua/',


});

export const agroBunnerAPI = {

    getAgroBunnerImg() {
        return instance.get('qAgroBunner.php?getAgroBunner=getAgroBunnerAllImg')
            .then(response => {
                //return response.data;
                if (response.status === 200) {
                    return response.data;
                } else {
                    alert('Some trouble with server or network - try to connect again')
                }
            });
    }
}