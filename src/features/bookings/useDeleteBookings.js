

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import {useNavigate} from 'react-router-dom'

export function useDeleteBookings() {
  const queryClient = useQueryClient();
    const navigate = useNavigate();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) =>
      deleteBookingApi(bookingId),

    onSuccess: () => {
      toast.success(`Booking successfully deleted`);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },

    onError: () =>toast.error("Booking succesfully deleted")
  });

  return { isDeleting, deleteBooking };
}