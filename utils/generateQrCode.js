const generateQrCode = (id, imagePath) => {
  return new Promise((resolve, reject) => {
    const { spawn } = require("child_process");
    const pythonProcess = spawn("python", [
      "./SIH22.py",
      JSON.stringify(id),
      imagePath,
    ]);

    pythonProcess.stderr.on("data", (data) => {
      reject(data);
    });
    pythonProcess.stdout.on("data", (data) => {
      console.log("result");
      resolve(data.toString());
    });
    pythonProcess.on("exit", (code) => {
      console.log(`code with ${code}`);
    });
  });
};

module.exports = { generateQrCode };
