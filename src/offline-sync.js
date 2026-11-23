/** Caller supplies authenticated, idempotent transport. No payments or sensitive operations by default. */
export async function flushOfflineQueue({ list, remove, send, online = true, allowedTypes = [] }) {
  if (!online) return { sent: 0, pending: null, reason: "offline" };
  if (!Array.isArray(allowedTypes)) throw new Error("allowedTypes must be an array");
  let sent = 0;
  const operations = await list();
  for (const operation of operations) {
    if (!allowedTypes.includes(operation.type)) return { sent, pending: operations.length - sent, reason: "type-not-allowed" };
    try {
      const accepted = await send(operation);
      if (accepted !== true) return { sent, pending: operations.length - sent, reason: "not-confirmed" };
      await remove(operation.id);
      sent++;
    } catch {
      return { sent, pending: operations.length - sent, reason: "send-failed" };
    }
  }
  return { sent, pending: 0, reason: "complete" };
}
