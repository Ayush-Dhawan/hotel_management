import { getToday } from "../utils/helper";
import supabase from "./supabase";

export async function getBookings(){
  const {data, error} = await supabase.from("bookings").select("id, created_at, startDate, endDate, numNights,numGuests, status, totalPrice, cabins(name), guests(fullName, email)")

  if(error){
    console.log("Error loading bookings")
    throw new Error("Error loading bookings")
}
return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  console.log("from apiBookings", data)
  return data;
}


// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }else{
    console.log("booking updated!")
  }
  console.log("updated booking state ispaid ad status", data.isPaid,data.status)
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function insertBooking({startDate, endDate, numNights, numGuests, cabinPrice, extrasPrice, totalPrice, status, hasBreakfast, isPaid, observations, cabins, guests}){
  
    const { data, error } = await supabase
    .from('bookings')
    .insert([
      { startDate: startDate, endDate: endDate, numNights: numNights, numGuests: numGuests, cabinPrice: cabinPrice, extrasPrice: extrasPrice, totalPrice: totalPrice,  status: status, hasBreakfast: hasBreakfast, isPaid: isPaid, observations: observations, cabinId: cabins.id, guestId: guests.id},
    ])
    .select()

    if (error) {
      console.error(error);
      throw new Error("Booking could not be added");
    }
    return data

}

// export async function insertBooking(booking){
//   console.log("data from apiBookings", {...booking})
//   const { data, error } = await supabase
//   .from('bookings')
//   .insert({...booking})
//   .select()

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be added");
//   }
//   return data

// }

