import { getToday } from "../utils/helper";
import supabase from "./supabase";

export async function getRequests(){
    const {data, error} = await supabase.from("requests").select("id, created_at, startDate, endDate, numNights,numGuests, cabinPrice,extrasPrice, totalPrice, status,hasBreakfast, isPaid, observations, cabins(id, name), guests(id, fullName, email)")
  
    if(error){
      console.log("Error loading requests")
      throw new Error("Error loading requests")
  }
  console.log("data from api", data)
  return data;
  }
  

  export async function deleteRequest(id){
    const { data, error } = await supabase
  .from('requests')
  .delete()
  .eq('id', id)

  if(error){
    console.log(error);
    throw new Error("Request could not be deleted")
  }
  return data;
}