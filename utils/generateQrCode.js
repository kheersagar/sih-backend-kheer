const generateQrCode = () => {
  return new Promise((resolve, reject) => {
    const { spawn } = require("child_process");
    const pythonProcess = spawn("python", ["./SIH22.py"]);

    pythonProcess.stderr.on("data", (data) => {
      console.log("err");
      console.log(data.toString());
      reject(data.toString());
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
