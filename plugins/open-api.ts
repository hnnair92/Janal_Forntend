import { OpenAPI } from "../openapi";
import { ApiResult } from "../openapi/core/ApiResult";
import { ApiRequestOptions } from "../openapi/core/ApiRequestOptions";

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default defineNuxtPlugin(nuxtApp => {
    const {token,data} = useAuth();
    OpenAPI.BASE = nuxtApp.$config.public.baseURL;
    if(token.value){
        let accessToken = token.value.split("Bearer ")[1];
        OpenAPI.TOKEN=accessToken;
    }
    else{
        OpenAPI.TOKEN=undefined;
    }

  })
