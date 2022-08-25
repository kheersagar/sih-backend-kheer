const ticket = require("../models/ticket");

//totalRevenue
const RevenueController = async (req, res) => {
  try {
    const result = await ticket.find({});
    let revenue = 0;
    result.map((resultItem) => {
      resultItem.ticketedUsers.map((item, index) => {
        if (item.nationality.toLowerCase() !== "indian")
          revenue += result[index].fprice;
        else if (item.userType.toLowerCase() === "adult")
          revenue += result[index].price;
        else revenue += result[index].cprice;
      });
    });
    console.log(revenue);
    res.send(revenue);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

//
const NationalityRevenue = async (req, res) => {
  try {
    const result = await ticket.find({});
    let Irevenue = 0,
      Frevenue = 0;
    result.map((resultItem) => {
      resultItem.ticketedUsers.map((item, index) => {
        if (item.nationality.toLowerCase() !== "indian")
          Frevenue += result[index].fprice;
        else Irevenue += result[index].price;
      });
    });
    console.log();
    res.send({
      label: ["INDIAN", "FOREIGNER"],
      data: [Irevenue, Frevenue],
    });
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const StateRevenue = async (req, res) => {
  const mp = new Map();
  try {
    const result = await ticket.find({}).populate("monumentId");
    result.map((resultItem, index) => {
      let revenue = 0;
      resultItem.ticketedUsers.map((item) => {
        if (item.nationality.toLowerCase() !== "indian")
          revenue += result[index].fprice;
        else if (item.userType.toLowerCase() === "adult")
          revenue += result[index].price;
        else revenue += result[index].cprice;

        mp[resultItem.monumentId.stateUT] = revenue;
      });
    });
    res.send(mp);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const monumentWise = async (req, res) => {
  const mp = new Map();
  try {
    const result = await ticket.find({}).populate("monumentId");
    result.map((resultItem, index) => {
      let revenue = 0;
      resultItem.ticketedUsers.map((item) => {
        if (item.nationality.toLowerCase() !== "indian")
          revenue += result[index].fprice;
        else if (item.userType.toLowerCase() === "adult")
          revenue += result[index].price;
        else revenue += result[index].cprice;

        mp[resultItem.monumentId.name] = revenue;
      });
    });
    res.send(mp);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const dayWise = async (req, res) => {
  let arr = [0, 0, 0, 0, 0, 0, 0];
  try {
    const result = await ticket.find({}).populate("monumentId");
    result.map((resultItem, index) => {
      const day = new Date(resultItem.date).getDay();
      // console.log(day);
      let revenue = 0;
      resultItem.ticketedUsers.map((item) => {
        if (item.nationality.toLowerCase() !== "indian")
          revenue += result[index].fprice;
        else if (item.userType.toLowerCase() === "adult")
          revenue += result[index].price;
        else revenue += result[index].cprice;
        console.log(revenue);
      });
      arr[day] += Number(revenue);
    });
    res.send(arr);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};
const monthWise = async (req, res) => {
  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  try {
    const result = await ticket.find({}).populate("monumentId");
    result.map((resultItem, index) => {
      const day = new Date(resultItem.date).getMonth();
      // console.log(day);
      let revenue = 0;
      resultItem.ticketedUsers.map((item) => {
        if (item.nationality.toLowerCase() !== "indian")
          revenue += result[index].fprice;
        else if (item.userType.toLowerCase() === "adult")
          revenue += result[index].price;
        else revenue += result[index].cprice;
        console.log(revenue);
      });
      arr[day] += Number(revenue);
    });
    res.send(arr);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};
const yearWise = async (req, res) => {
  const mp = new Map();
  try {
    const result = await ticket.find({}).populate("monumentId");
    result.map((resultItem, index) => {
      const year = new Date(resultItem.date).getFullYear().toString();
      let revenue = 0;
      resultItem.ticketedUsers.map((item) => {
        if (item.nationality.toLowerCase() !== "indian")
          revenue += result[index].fprice;
        else if (item.userType.toLowerCase() === "adult")
          revenue += result[index].price;
        else revenue += result[index].cprice;
        console.log(mp, revenue);
        mp[year] = mp[year] ? mp[year] + revenue : 0;
      });
    });
    res.send(mp);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};
module.exports = {
  RevenueController,
  NationalityRevenue,
  StateRevenue,
  monumentWise,
  dayWise,
  monthWise,
  yearWise,
};
