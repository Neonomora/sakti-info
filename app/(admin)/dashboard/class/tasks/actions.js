"use server";

import ClassTask from "@/models/class/ClassTask";

// MAIN CREATE
export async function createAction(data) {
  try {
    await ClassTask.create(data);
    return { success: true };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, message: error.message };
  }
}

// UPDATE
export async function updateAction(
  taskId,
  newTitle,
  newFormat,
  newUpload,
  newDate,
  newTime,
  newDetail
) {
  try {
    await ClassTask.findByIdAndUpdate(
      taskId,
      {
        $set: {
          title: newTitle,
          format: newFormat,
          upload: newUpload,
          date: newDate,
          time: newTime,
          detail: newDetail,
        },
      },
      { new: true }
    );
    return { success: true };
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, message: error.message };
  }
}

// DELETE
export async function deleteAction(taskId) {
  try {
    await ClassTask.findByIdAndDelete(taskId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, message: error.message };
  }
}
