export function storeToken(key,value) {
   
        if (localStorage.getItem(key) === value) {
            console.log('Token is already stored');
        } else {
            localStorage.setItem(key, value);
        }
} 
export function deleteToken(key){
    localStorage.removeItem(key);
}