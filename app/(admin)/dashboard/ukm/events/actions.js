"use server";

import UkmEvent from "@/models/ukm/UkmEvent";

// MAIN CREATE
export async function createAction(data) {
  try {
    await UkmEvent.create(data);
    return { success: true };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, message: error.message };
  }
}

// SUB CREATE
export async function createSubEventAction(eventId, data) {
  try {
    await UkmEvent.findByIdAndUpdate(
      eventId,
      {
        $push: {
          subEvents: {
            title: data.title,
            time: data.time,
          },
        },
      },
      { new: true }
    );
    return { success: true };
  } catch (error) {
    console.error("Error Creating Sub Event:", error);
    return { success: false, error: error.message };
  }
}

// UPDATE
export async function updateAction(eventId, subId, newTitle, newTime) {
  try {
    if (!subId) {
      await UkmEvent.findByIdAndUpdate(
        eventId,
        { $set: { title: newTitle } },
        { new: true }
      );
    } else {
      await UkmEvent.findOneAndUpdate(
        { _id: eventId, "subEvents._id": subId },
        {
          $set: { "subEvents.$.title": newTitle, "subEvents.$.time": newTime },
        },
        { new: true }
      );
    }
    return { success: true };
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, message: error.message };
  }
}

// DELETE
export async function deleteAction(eventId, subId) {
  try {
    if (!subId) {
      await UkmEvent.findByIdAndDelete(eventId);
    } else {
      await UkmEvent.findByIdAndUpdate(
        eventId,
        { $pull: { subEvents: { _id: subId } } },
        { new: true }
      );
    }
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, message: error.message };
  }
}
