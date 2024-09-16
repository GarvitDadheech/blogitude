import { atomFamily, selectorFamily } from "recoil";
import axios from 'axios';
import { BACKEND_URL } from "../../../config";

export const BlogAtom = atomFamily({
    key: 'BlogAtom',
    default: selectorFamily({
        key: "BlogAtomSelector",
        get: (id : {id?:string}) => async ({get}) => {
            
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.get(`${BACKEND_URL}/blog/${id.id}`, {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            return response.data.blog;
        }
    })
})