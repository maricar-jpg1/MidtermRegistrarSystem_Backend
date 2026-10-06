const schedules = require("../data/schedules");

function getAll() {
  return schedules;
}

function getById(id) {
  return schedules.find((item) => item.id === Number(id));
}

function hasConflict(data, excludeId = null) {
  return schedules.some((schedule) => {
    if (
      excludeId !== null &&
      schedule.id === Number(excludeId)
    ) {
      return false;
    }

    if (schedule.day !== data.day) {
      return false;
    }

    const sameRoom = schedule.room === data.room;
    const sameFaculty =
      schedule.faculty_id === Number(data.faculty_id);
    const sameSection =
      schedule.section === data.section;

    if (!sameRoom && !sameFaculty && !sameSection) {
      return false;
    }

    return (
      data.start_time < schedule.end_time &&
      data.end_time > schedule.start_time
    );
  });
}

function create(data) {
  if (hasConflict(data)) {
    return { conflict: true };
  }

  const nextId =
    schedules.length > 0
      ? Math.max(...schedules.map((item) => item.id)) + 1
      : 1;

  const item = {
    id: nextId,
    ...data
  };

  schedules.push(item);

  return item;
}

function update(id, data) {
  const index = schedules.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  if (hasConflict(data, id)) {
    return { conflict: true };
  }

  schedules[index] = {
    ...schedules[index],
    ...data,
    id: Number(id)
  };

  return schedules[index];
}

function remove(id) {
  const index = schedules.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  return schedules.splice(index, 1)[0];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};