const bcrypt=require("bcrypt");
module.exports = {
  async up(db, client) {
    const adminPass = await bcrypt.hash("admin", 10);
    const userPass1 = await bcrypt.hash("user1", 10);
    const userPass2 = await bcrypt.hash("user2", 10);
    const userPass3 = await bcrypt.hash("user3", 10);

    const users = [
      { userName: 'Admin', email: 'admin@tms.com', password: adminPass, roleID: 1 },
      { userName: 'user1', email: 'user1@tms.com', password: userPass1, roleID: 2 },
      { userName: 'user2', email: 'user2@tms.com', password: userPass2, roleID: 2 },
      { userName: 'user3', email: 'user3@tms.com', password: userPass3, roleID: 2 }
    ];

    await db.collection('User').insertMany(users);
    
  },

  async down(db, client) {
    await db.collection('User').drop();
  }
};
