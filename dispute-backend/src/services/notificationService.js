/**
 * Notification service layer for dispute-related outbound notifications.
 *
 * Keep dispute creation code calling this service instead of vendor-specific
 * APIs directly. When Microsoft Graph API, Teams Bot, or Adaptive Card access
 * is available, replace the placeholder logic inside sendTeamsNotification
 * without changing the dispute creation controller flow.
 */

const sendTeamsNotification = async (dispute) => {
  // TODO: Add Microsoft Graph API / Teams Bot / Adaptive Card integration here.
  // Future implementation should use dispute.assigneeEmail as the recipient and
  // build an Adaptive Card payload from the dispute details below.
  console.log(
    `Teams notification would be sent to: ${dispute.assigneeEmail}`,
    {
      disputeId: dispute._id,
      ticketNumber: dispute.ticketNumber,
      assigneeName: dispute.assigneeName,
      assigneeEmail: dispute.assigneeEmail,
      customerCode: dispute.customerCode,
      invoice: dispute.invoice,
      reasonCode: dispute.reasonCode,
      priority: dispute.priority,
      status: dispute.status,
    }
  );
};

module.exports = {
  sendTeamsNotification,
};
