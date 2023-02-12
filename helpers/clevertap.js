import axios from "axios";

export class Clevertap{

    get headersClevertap() {
        return{
            'X-CleverTap-Account-Id': 'TEST-ZW8-R77-K66Z',
            'X-CleverTap-Passcode': 'GCE-IMX-GEUL',
            'Content-Type': 'application/json; charset=utf-8'

        }
    }

    uploadEvent = async(dataEvent) => {

        try{
            const data = {
                d:[dataEvent]
            }
            const instance = axios.create({
                baseURL:'https://eu1.api.clevertap.com/1/upload',
                headers: this.headersClevertap,
                method:'POST'
            })
            const res = await  instance.request({
                data
            })
            console.log(res)
        }catch (error){
            console.log(error)
        }
    }
}


