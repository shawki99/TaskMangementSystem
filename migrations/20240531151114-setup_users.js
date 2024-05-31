module.exports = {
  async up(db, client) {
    await db.collection('User').insertOne(
      { userName: 'Admin' ,email:'admin@example.com' ,password:"9tPpO9CkR9r8icPuXIij5ONr7kwzk08qJBF2J8C7nxOQREm" ,roleID:1 }
      //$2b$10$EK7AX/9tPpO9CkR9r8icPuXIij5ONr7kwzk08qJBF2J8C7nxOQREm
      //userName,email,password,roleID
    );
  },

  async down(db, client) {
    await db.collection('User').drop();
  }
};
