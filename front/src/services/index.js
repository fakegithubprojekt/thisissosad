import axios from 'axios';
import store from "@/store"
import $router from '@/router'

// instanca axios-a za potrebe backenda
let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
});


Service.interceptors.request.use((request)=>{
    try{
        request.headers['Authorization']='Bearer '+Auth.getToken();
    }catch(e){
        console.error(e);
    }
    return request;
})
Service.interceptors.response.use((response)=>{
    console.log("interceptor",response);
    return response;
},
(error)=>{
    if(error.response.status==401){
        Auth.logout();
        $router.go();
    }
})

let Posts = {
    Comments: {
        async add(postId, comment) {
            await Service.post(`/posts/${postId}/comments/`, comment);
        },
        async delete(postId, commentId) {
            await Service.delete(`/posts/${postId}/comments/${commentId}`);
        },
    },
    add(post) {
        return Service.post('/posts', post);
    },
    add1(post1) {
        return Service.post('/posts', post1);
    },
    prijava(podaciprijavee) {
        return Service.post('/prijava', podaciprijavee);
    },
    addkorisnik(korisnik) {
        return Service.post('/postsk', korisnik);
    },
    async mojeprijave(userEmail) {
        let options = {}
        if (userEmail) {
            options.params = {
                userEmail: userEmail
            }
        }
        let response = await Service.get('/prijava', options);
        return response.data.map((doc) => {
            return {
                id: doc._id,
                email: doc.email,
                posted_at: Number(doc.posted_at),
                poslodavac: doc.poslodavac,
                oib: doc.oib,
                brtel: doc.brtel,
                vrsta: doc.vrsta,
                grad: doc.grad,
                satnica: doc.satnica,
                putni: doc.putni,
                datum: doc.datum,
                vrijeme: doc.vrijeme,
                koremail: doc.koremail,
                number: doc.number,
                tekst: doc.tekst,
                datumk: doc.datumk,
                tipoglasa: doc.tipoglasa,
                url: doc.url,
                userEmail: doc.userEmail,
                prijava: doc.prijava,
                ocekivanje:doc.ocekivanje,
                razlog:doc.razlog
            };
        });
    },
    async mojioglasi(userEmail) {
        let options = {}
        if (userEmail) {
            options.params = {
                userEmail: userEmail
            }
        }
        let response = await Service.get('/mojioglasi', options);
        return response.data.map((doc) => {
            return {
                id: doc.id,
                email: doc.email,
                koremail: doc.kkkoremail,
                posted_at: Number(doc.posted_at),
                poslodavac: doc.poslodavac,
                oib: doc.oib,
                brtel: doc.brtel,
                vrsta: doc.vrsta,
                grad: doc.grad,
                satnica: doc.satnica,
                putni: doc.putni,
                datum: doc.datum,
                vrijeme: doc.vrijeme,
                number: doc.number,
                datumk: doc.datumk,
                tipoglasa: doc.tipoglasa,
                url: doc.url,
                userEmail: doc.userEmail,
                aktivanoglas: doc.aktivanoglas,
                tekst: doc.tekst,
                prijava: doc.prijava
            };
        });
    },
    async prijavenaoglas(userEmail) {
        let options = {}
        if (userEmail) {
            options.params = {
                userEmail: userEmail
            }
        }
        let response = await Service.get('/prijavenaoglas', options);
        return response.data.map((doc) => {
            return {
                id: doc.id,
                email: doc.email,
                posted_at: Number(doc.posted_at),
                poslodavac: doc.poslodavac,
                oib: doc.oib,
                brtel: doc.brtel,
                ime: doc.ime,
                prezime: doc.prezime,
                vrsta: doc.vrsta,
                grad: doc.grad,
                satnica: doc.satnica,
                putni: doc.putni,
                datum: doc.datum,
                vrijeme: doc.vrijeme,
                number: doc.number,
                tekst: doc.tekst,
                datumk: doc.datumk,
                tipoglasa: doc.tipoglasa,
                url: doc.url,
                userEmail: doc.userEmail,
                username: doc.korime,
                prijava: doc.prijava,
                aktivnikorisnik:doc.aktivnikorisnik,
                status:doc.status,
                ocekivanje:doc.ocekivanje,
                razlog:doc.razlog
            };
        });
    },
    async getAll(searchTerm) {
        let options = {};

        if (searchTerm) {
            options.params = {
                _any: searchTerm,
            };
        }

        let response = await Service.get('/posts', options);
        return response.data.map((doc) => {
            return {
                id: doc._id,
                email: doc.email,
                posted_at: Number(doc.posted_at),
                poslodavac: doc.poslodavac,
                oib: doc.oib,
                brtel: doc.brtel,
                vrsta: doc.vrsta,
                grad: doc.grad,
                satnica: doc.satnica,
                putni: doc.putni,
                datum: doc.datum,
                tekst: doc.tekst,
                vrijeme: doc.vrijeme,
                number: doc.number,
                uploadValue: doc.uploadValue,
                datumk: doc.datumk,
                tipoglasa: doc.tipoglasa,
                url: doc.url,
                status:doc.status,
                aktivanoglas:doc.aktivanoglas,
                napomena:doc.napomena,
                kkkoremail:doc.kkkoremail
            };
        });
    },
    async getAll1(searchTerm) {
        let options = {};

        if (searchTerm) {
            options.params = {
                _any: searchTerm,
            };
        }

        let response = await Service.get('/postsn', options);
        return response.data.map((doc) => {
            return {
                id: doc._id,
                email: doc.email,
                posted_at: Number(doc.posted_at),
                poslodavac: doc.poslodavac,
                oib: doc.oib,
                brtel: doc.brtel,
                vrsta: doc.vrsta,
                grad: doc.grad,
                satnica: doc.satnica,
                putni: doc.putni,
                datum: doc.datum,
                tekst: doc.tekst,
                vrijeme: doc.vrijeme,
                number: doc.number,
                uploadValue: doc.uploadValue,
                datumk: doc.datumk,
                tipoglasa: doc.tipoglasa,
                url: doc.url,
                status:doc.status,
                aktivanoglas:doc.aktivanoglas,
                napomena:doc.napomena
            };
        });
    },
    async getOne(id) {
        let response = await Service.get(`/posts/${id}`);
        let doc = response.data;
        return {
            id: doc._id,
            poslodavac: doc.poslodavac,
                oib: doc.oib,
                email: doc.email,
                brtel: doc.brtel,
                vrsta: doc.vrsta,
                grad: doc.grad,
                satnica: doc.satnica,
                putni: doc.putni,
                datum: doc.datum,
                posted_at: Number(doc.posted_at),
                vrijeme: doc.vrijeme,
                tekst: doc.tekst,
                number: doc.number,
                uploadValue: doc.uploadValue,
                datumk: doc.datumk,
                tipoglasa: doc.tipoglasa,
                url: doc.url,
                status:doc.status,
                aktivanoglas:doc.aktivanoglas,
                napomena:doc.napomena,
                kkkoremail:doc.kkkoremail,
            // dodajemo da čita i `comments` te `_id` pretvara u `id`
            comments: (doc.comments || []).map((c) => {
                c.id = c._id;
                delete c._id;
                return c;
            }),
        };
    },
    async azuriraj(id,azuriraj){
        return Service.patch(`/posts/${id}`, azuriraj)
    },
    async prijavenaoglas1(id,azuriraj){
        return Service.patch(`/prijavenaoglas/${id}`, azuriraj)
    }
}
let Auth={
    async login(email,password){
        let response=await Service.post("/auth",{
            email:email,
            password:password
        });
        let user=response.data
        localStorage.setItem("user",JSON.stringify(user));
        return true
    },
    async azuriraj(id,azuriraj){
        localStorage.setItem("user",JSON.stringify(azuriraj));
        return Service.patch(`/users/${id}`, azuriraj)
    },
    

        async signup(a) {
           let post=await Service.post('/users', a);
           return post
        
    },
    async promjena(promjenalozinke){
        return Service.patch('/user', promjenalozinke)
    },
    logout(){
        localStorage.removeItem('user');
    },
    getUser(){
        return JSON.parse(localStorage.getItem("user"));
    },
    getToken(){
        let user=Auth.getUser();
        if(user && user.token){
            return user.token
        }
        else {
            return false
        }
    },
    authenticated(){
        let user=Auth.getUser()
        if(user && user.token){
            store.tipKorisnika=user.tipKorisnika,
            store.prezime=user.prezime,
            store.koremail=user.email,
            store.username=user.username,
            store.ime=user.ime,
            store.zanimanje=user.zanimanje,
            store.brtel=user.brtel,
            store.zupanija=user.zupanija,
            store.datumreg=user.datumreg,
            store.userid=user.id,

            store.korisnik.tipKorisnika=user.tipKorisnika,
            store.korisnik.prezime=user.prezime,
            store.korisnik.koremail=user.email,
            store.korisnik.username=user.username,
            store.korisnik.ime=user.ime,
            store.korisnik.zanimanje=user.zanimanje,
            store.korisnik.brtel=user.brtel,
            store.korisnik.zupanija=user.zupanija,
            store.korisnik.datumreg=user.datumreg,
            store.korisnik.userid=user.id
            return true
        }
        return false
    },
    state:{
        get user(){
            return Auth.getUser();
        },
       get authenticated(){
           return Auth.authenticated();
       },
       get tipKorisnika(){
           let user=Auth.getUser();
           if(user){
               return user.tipKorisnika
           }
       },
       get prezime(){
        let user=Auth.getUser();
        if(user){
            return user.prezime
        }
    },
       get userEmail() {
           let user=Auth.getUser();
           if(user){
               return user.username;
           }
       }
    }
};
export { Service, Posts,Auth }; 