const {
  RevenueController,
  NationalityRevenue,
  StateRevenue,
  monumentWise,
  dayWise,
  monthWise,
  yearWise,
} = require("../controllers/RevenueController");

const router = require("express").Router();

router.get("/revenue", RevenueController);
router.get("/nationalityRevenue", NationalityRevenue);
router.get("/stateRevenue", StateRevenue);
router.get("/monumentRevenue", monumentWise);
router.get("/dayRevenue", dayWise);
router.get("/monthRevenue", monthWise);
router.get("/yearRevenue", yearWise);

module.exports = router;
