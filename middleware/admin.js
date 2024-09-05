import { callWithNuxt, useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  const nuxtApp = useNuxtApp()
  const { status,data, signIn } = useAuth()
  // Return immediately if user is already authenticated
  if (status.value === 'authenticated' && data.value.groups && data.value.groups.includes("Admin")) {
    return
  }else if(status.value === 'authenticated'){
    return navigateTo("/redirect");
  }
  else{
    return navigateTo("/account/login");
  }
});