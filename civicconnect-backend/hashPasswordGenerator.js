const bcrypt = require("bcryptjs");
async function hashPasswordGenerator() {
    const hashed = await bcrypt.hash("Wasef123", 10);
    //const hashed = await bcrypt.hash("AdminPass2025!", 10);
    console.log("ans is "+ hashed);
}
hashPasswordGenerator();


