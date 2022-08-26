const ticket = require("../models/ticket");

//totalRevenue
const RevenueController = async (req, res) => {
  try {
    const result = await ticket.find({});
    let revenue = 0;
    result.map((resultItem, index) => {
      resultItem.ticketedUsers.map((item) => {
        if (item.nationality.toLowerCase() !== "indian")
          revenue += result[index].fprice;
        else if (item.userType.toLowerCase() === "adult")
          revenue += result[index].price;
        else revenue += result[index].cprice;
      });
    });
    res.send(revenue.toString());
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
    const sortable = Object.fromEntries(
      Object.entries(mp).sort(([, a], [, b]) => b - a)
    );
    const labels = Object.keys(sortable);
    const data = Object.values(sortable);
    res.send({
      labels: labels.slice(0, 10),
      data: data.slice(0, 10),
    });
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
    const sortable = Object.fromEntries(
      Object.entries(mp).sort(([, a], [, b]) => b - a)
    );
    const labels = Object.keys(sortable);
    const data = Object.values(sortable);
    res.send({
      labels: labels.slice(0, 10),
      data: data.slice(0, 10),
    });
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

const monumentDayWise = async (req, res) => {
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
    const sortable = Object.fromEntries(
      Object.entries(mp).sort(([, a], [, b]) => b - a)
    );
    const labels = Object.keys(sortable).slice(0, 10);
    const data = await ticket.find({}).populate("monumentId");
    const resultant = [];
    data.map((resultItem, index) => {
      if (labels.includes(resultItem.monumentId.name)) {
        let arr = [0, 0, 0, 0, 0, 0, 0];
        const day = new Date(resultItem.date).getDay();
        let revenue = 0;
        resultItem.ticketedUsers.map((item) => {
          if (item.nationality.toLowerCase() !== "indian")
            revenue += result[index].fprice;
          else if (item.userType.toLowerCase() === "adult")
            revenue += result[index].price;
          else revenue += result[index].cprice;
        });
        arr[day] += Number(revenue);
        resultant.push({
          name: resultItem.monumentId.name,
          data: arr,
        });
      }
    });

    res.send(resultant);
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
  monumentDayWise,
};
