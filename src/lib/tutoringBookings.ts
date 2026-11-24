/**
 * Tutoring bookings made through Cal.com. The Cal.com webhook (`/api/cal/webhook`) writes one document per
 * booking to this collection; `/api/tutoring/bookings` returns the signed-in user's bookings to the
 * My Bookings page. Only the server reads or writes the collection.
 */

export const TUTORING_BOOKINGS_COLLECTION = 'tutoringBookings';

/** The booking-page metadata key that carries the AP Dojo user id from the embed into the booking. */
export const CAL_METADATA_UID_KEY = 'apdojoUid';

export type TutoringBookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'rescheduled';

/** A booking as the My Bookings page receives it. */
export interface TutoringBooking {
  id: string;
  title: string;
  startTime: string | null;
  endTime: string | null;
  status: TutoringBookingStatus;
  meetingUrl: string | null;
  attendeeName: string | null;
  /** Cal.com's page for this booking, where it can be rescheduled or cancelled. */
  manageUrl: string;
}

export function calManageBookingUrl(bookingUid: string): string {
  return `https://cal.com/booking/${encodeURIComponent(bookingUid)}`;
}
