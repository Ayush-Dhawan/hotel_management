// https://jaaramkfipybtkkixsmc.supabase.co/storage/v1/object/public/restaurant-menu-images/butter-chicken.jpg
import supabase, { supabaseUrl } from "./supabase"

export async function getRestaurant(){
    let { data, error } = await supabase
.from('restaurant')
.select('*')

if(error){
    console.log("error loading restaurant")
    throw new Error("error loading restaurant")
}
console.log("restaurant: ", data)
return data;
}



export async function createEditDishes(newDish, id){

    // https://jaaramkfipybtkkixsmc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imageName = `${newDish.image.name}`.replaceAll("/", "")
    console.log("image name ->", imageName)
    const hasImagePath = newDish.image?.startsWith?.(supabaseUrl);
    console.log(newDish.image)
  
    const imagePath = hasImagePath ? newDish.image : `https://jaaramkfipybtkkixsmc.supabase.co/storage/v1/object/public/restaurant-menu-images/${imageName}`
    //1. create cabin  
  let query = supabase.from('restaurant')
  
  if(!id)
   query =  query
  .insert([{...newDish, image: imagePath}])
  .select()
    
  if(id){
    query = query.update({...newDish, image: imagePath})
    .eq("id", id)
    .select()
  }
  
  const {data, error} = await query;
  
  if(error){
    console.log(error);
    throw new Error("Dish could not be created")
  }
  
  // 2. upload image
  if(hasImagePath) return data;
  const {error: storageError } = await supabase
    .storage
    .from('restaurant-menu-images')
    .upload(imageName, newDish.image)
  
    // 3. delete the cabin i case of storage error
    // if(storageError){
    //   await supabase
    // .from('cabins')
    // .delete()
    // .eq('id', data.id)
    //   console.log(storageError);
    //   throw new Error("Cabin image could not be uploaded")
    // }
  
  }



  export async function deleteDishes(id){
    const { data, error } = await supabase
  .from('restaurant')
  .delete()
  .eq('id', id)

  if(error){
    console.log(error);
    throw new Error("dish could not be deleted")
  }
  return data;
}