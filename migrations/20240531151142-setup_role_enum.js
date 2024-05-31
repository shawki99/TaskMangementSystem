module.exports = {
  async up(db, client) {
    await db.collection('RoleEnum').insertMany([
      { _id: 1, roleName: 'Manager' },
      { _id: 2, roleName: 'User' }
    ]);
  },

  async down(db, client) {
    await db.collection('RoleEnum').drop();
  }
};
