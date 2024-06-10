import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBoxSeam } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  Stacked,
  Pie,
  Button,
  LineChart,
  SparkLine,
} from "../../../components/Admin";
import {
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../../../components/Admin/data/dummy";
import { FiBarChart } from "react-icons/fi";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

function Ecommerce() {
  const { currentColor, currentMode } = useStateContext();
  const [earningData, setEarningData] = useState([]);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
  const [monthlyExpenseData, setMonthlyExpenseData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState(0);
  const [averageRevenue, setAverageRevenue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/statistics/summaryCounts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const revenueResponse = await axios.get(
          "http://localhost:8080/api/statistics/current-year-revenue",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const expenseResponse = await axios.get(
          "http://localhost:8080/api/statistics/current-year-expenses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newData = [
          {
            icon: <MdOutlineSupervisorAccount />,
            amount: response.data.userCount.toString(),
            percentage: "+50%",
            title: "Klienci",
            iconColor: "#03C9D7",
            iconBg: "#E5FAFB",
            pcColor: "red-600",
          },
          {
            icon: <BsBoxSeam />,
            amount: response.data.workshopCount.toString(),
            percentage: "+25%",
            title: "Warsztaty",
            iconColor: "rgb(255, 244, 229)",
            iconBg: "rgb(254, 201, 15)",
            pcColor: "green-600",
          },
          {
            icon: <FiBarChart />,
            amount: response.data.reservationCount.toString(),
            percentage: "+38%",
            title: "Rezerwacje",
            iconColor: "rgb(228, 106, 118)",
            iconBg: "rgb(255, 244, 229)",
            pcColor: "green-600",
          },
          {
            icon: <HiOutlineRefresh />,
            amount: response.data.instructorCount.toString(),
            percentage: "-20%",
            title: "Instruktorzy",
            iconColor: "rgb(0, 194, 146)",
            iconBg: "rgb(235, 250, 242)",
            pcColor: "red-600",
          },
        ];

        setEarningData(newData);

        const monthNames = [
          "Sty",
          "Lut",
          "Mar",
          "Kwi",
          "Maj",
          "Cze",
          "Lip",
          "Sie",
          "Wrz",
          "Paź",
          "Lis",
          "Gru",
        ];

        const revenueDataWithMonthNames = revenueResponse.data.map((item) => ({
          ...item,
          month: monthNames[item.month - 1], // Zamieniamy numer miesiąca na skrót
        }));

        const expenseDataWithMonthNames = expenseResponse.data.map((item) => ({
          ...item,
          month: monthNames[item.month - 1], // Zamieniamy numer miesiąca na skrót
        }));

        setMonthlyRevenueData(revenueDataWithMonthNames);
        setMonthlyExpenseData(expenseDataWithMonthNames);

        const totalRevenue = revenueResponse.data.reduce(
          (acc, month) => acc + parseFloat(month.total_revenue || 0),
          0
        );
        const totalExpenses = expenseResponse.data.reduce(
          (acc, month) => acc + parseFloat(month.total_expense || 0),
          0
        );

        setTotalRevenue(totalRevenue);
        setTotalExpenses(totalExpenses);

        const currentMonthRevenue = revenueResponse.data.length
          ? parseFloat(
              revenueResponse.data[revenueResponse.data.length - 1]
                .total_revenue || 0
            )
          : 0;
        const currentMonthExpenses = expenseResponse.data.length
          ? parseFloat(
              expenseResponse.data[expenseResponse.data.length - 1]
                .total_expense || 0
            )
          : 0;

        setCurrentMonthRevenue(currentMonthRevenue);
        setCurrentMonthExpenses(currentMonthExpenses);

        const averageRevenue = revenueResponse.data.length
          ? totalRevenue / revenueResponse.data.length
          : 0;
        setAverageRevenue(parseInt(averageRevenue));
      } catch (error) {
        console.error("Error fetching data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-white">Dochód</p>
              <p className="text-2xl">
                {currentMonthRevenue - currentMonthExpenses} zł
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
              size="md"
            />
          </div>
        </div>
        <div className="flex m-3 fle3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Statystyki przychodów</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Wydatki</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Przychody</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className="border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">
                    {currentMonthRevenue} zł
                  </span>
                  <span className="p-1.5 hover:drop-shadow-xl ml-3 rounded-full cursor-pointer text-white bg-green-400 text-xs">
                    35%
                  </span>
                </p>
                <p className="text-gray-400 mt-1">Przychód</p>
              </div>
              <div>
                <p>
                  <span className="text-3xl font-semibold">
                    {currentMonthExpenses} zł
                  </span>
                </p>
                <p className="text-gray-400 mt-1">Wydatki</p>
              </div>

              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line-sparkline"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={monthlyRevenueData}
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Pobierz Raport"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked
                width="320px"
                height="360px"
                monthlyExpenseData={monthlyExpenseData}
                monthlyRevenueData={monthlyRevenueData}
              />
            </div>
          </div>
        </div>
        <div>
          <div
            className="rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-white text-2xl">
                Średni przychód
              </p>
              <div>
                <p className="text-2xl text-white font-semibold mt-8">
                  {averageRevenue} zł
                </p>
                <p className="text-gray-200">Miesięczny zarobek</p>
              </div>
            </div>
            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={monthlyRevenueData}
                width="320"
                color="rgb(240,250,250)"
              />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold">113,984 zł</p>
              <p className="text-gray-400">Roczna sprzedaż</p>
            </div>
            <div className="w-40">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold"> Ostatnie rezerwacje</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="mt-10 w-72 md:w-400">
            {recentTransactions.map((item) => (
              <div key={item.title} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                color="white"
                bgColor={currentColor}
                text="Dodaj"
                borderRadius="10px"
              />
            </div>
            <p className="text-gray-400 text-sm">36 Ostatnich Rezerwacji</p>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Ogólna Sprzedaż</p>
            <DropDown currentMode={currentColor} />
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Weeekendowe Wyniki</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>
          <div className="mt-10">
            {weeklyStats.map((item) => (
              <div
                key={item.title}
                className="flex justify-between mt-4 w-full"
              >
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{ background: item.iconBg }}
                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title} </p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount} </p>
              </div>
            ))}
            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="area-sparkline"
                height="160px"
                type="Area"
                data={SparklineAreaData}
                width="320"
                color="rgb(240,250,250)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ecommerce;
