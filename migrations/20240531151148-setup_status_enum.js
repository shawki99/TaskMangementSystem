module.exports = {
  async up(db, client) {
    await db.collection('StatusEnum').insertMany([
      { _id: 1, status: 'Pending' },
      { _id: 2, status: 'Completed' },
      { _id: 3, status: 'Canceled' },
      { _id: 4, status: 'In Progress' }
    ]);
  },

  async down(db, client) {
    await db.collection('StatusEnum').drop();
  }
};
