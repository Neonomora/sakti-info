export async function updateSubEvents(eventId, subEvents) {
  const res = await fetch(`/api/admin/CampusEvent/${eventId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subEvents }),
  });
  return res;
}
