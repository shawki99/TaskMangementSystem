const bcrypt=require("bcrypt");
module.exports = {
  async up(db, client) {
    const pass=await bcrypt.hash("admin", 10)
    await db.collection('User').insertOne(
      { userName: 'Admin' ,email:'admin@example.com' ,password:pass ,roleID:1 }
      
    );
  },

  async down(db, client) {
    await db.collection('User').drop();
  }
};
