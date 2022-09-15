const generateQrCode = (id, imagePath) => {
  console.log(imagePath);
  return new Promise((resolve, reject) => {
    const { spawn } = require("child_process");
    const pythonProcess = spawn("python", ["-u","./SIH22.py", id, imagePath]);

    pythonProcess.stderr.on("data", (data) => {
      console.log(data.toString());
      reject(data);
    });
    pythonProcess.stdout.on("data", (data) => {
      console.log("result");
      console.log(data.toString())
      resolve(data.toString());
    });
    pythonProcess.on("exit", (code) => {
      console.log(`code with ${code}`);
    });
  });
};

module.exports = { generateQrCode };
