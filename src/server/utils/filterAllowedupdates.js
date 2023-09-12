export const filterAllowedUpdates = (body, allowedUpdates) => {
  const updates = Object.keys(body);
  const filteredUpdates = updates.filter(update => allowedUpdates.includes(update));
  const query = {};
  filteredUpdates.forEach(update => {
    query[update] = body[update];
  });
  return query;
};
