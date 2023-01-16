import axios from "axios";

export let axiosInstance = axios.create({
  baseURL: "/",
});

if(typeof window === "undefined"){
    axiosInstance = axios.create({
        baseURL:"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"
    })
}
