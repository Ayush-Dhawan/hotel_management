import supabase from "./supabase"

export async function login({email, password}){
    
let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if(error) throw new Error(error.message)

  console.log(data);
  return data;
}


export async function getCurrentUser(){
  const {data} = await supabase.auth.getSession();

  if(!data.session) return null;

  const {data: userData, error} = await supabase.auth.getUser();
  if(error) throw new Error(error.message);
  return userData.user;
}

export async function userLogout(){
  const {error} = await supabase.auth.signOut();
  if(error){ 
    console.log("error logging out")
    throw new Error(error.message);
  }
}