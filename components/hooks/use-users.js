import { useSelector } from "react-redux";

const useUsers = () => {
  const { users, currentUser } = useSelector((state) => state.users);

  if (users.length === 0 || currentUser === "none") {
    if (
      currentUser !== "none" &&
      currentUser !== null &&
      currentUser !== undefined
    ) {
      return {
        firstName: "",
        middleName: [],
        lastName: "",
        username: currentUser,
      };
    }
    return { firstName: "", middleName: [], lastName: "", username: "" };
  }

  let userObj = users.filter((user) => user.username === currentUser)[0];

  return userObj;
};

export const usePurchases = () => {
  const { purchases, currentUser } = useSelector((state) => state.users);

  const getTodaysPurchases = () => {
    return purchases.filter(
      (purchase) =>
        purchase.purchasedBy === currentUser &&
        purchase.purchasedOn.year === new Date().getFullYear() &&
        purchase.purchasedOn.month === new Date().getMonth() + 1 &&
        purchase.purchasedOn.day === new Date().getDate()
    );
  };

  const getThisWeeksPurchases = () => {
    const offset = new Date().getDay();

    const today = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - offset);

    return purchases.filter((purchase) => {
      const purchaseDate = new Date(
        `${purchase.purchasedOn.month}-${purchase.purchasedOn.day}-${purchase.purchasedOn.year}`
      );

      return (
        purchase.purchasedBy === currentUser &&
        purchaseDate >= startOfWeek &&
        purchaseDate <= today
      );
    });
  };

  const getThisMonthsPurchases = () => {
    const today = new Date();
    const startOfMonth = new Date(
      `${new Date().getMonth() + 1}-1-${new Date().getFullYear()}`
    );

    return purchases.filter((purchase) => {
      const purchaseDate = new Date(
        `${purchase.purchasedOn.month}-${purchase.purchasedOn.day}-${purchase.purchasedOn.year}`
      );

      return (
        purchase.purchasedBy === currentUser &&
        purchaseDate >= startOfMonth &&
        purchaseDate <= today
      );
    });
  };

  const reevalDuplication = (purchases) => {
    let diffItems = [];
    purchases.forEach((purchase) => {
      if (
        !diffItems.some(
          (item) =>
            purchase.name === item.name &&
            purchase.sectionName === item.sectionName &&
            purchase.paid === item.paid &&
            purchase.item.price === item.item.price
        )
      ) {
        diffItems.push(purchase);
      }
    });

    let reevaledData = [];
    diffItems.forEach((item) => {
      let data = { amount: 0 };

      purchases.forEach((purchase) => {
        if (
          purchase.name === item.name &&
          purchase.sectionName === item.sectionName &&
          purchase.paid === item.paid &&
          purchase.item.price === item.item.price
        ) {
          data = { ...purchase, amount: data.amount + purchase.amount };
        }
      });

      reevaledData.push(data);
    });

    return reevaledData;
  };

  const getSpecificDayPurchase = (fullDate) => {
    return purchases.filter(
      (purchase) =>
        purchase.purchasedBy === currentUser &&
        purchase.purchasedOn.year === fullDate.getFullYear() &&
        purchase.purchasedOn.month === fullDate.getMonth() + 1 &&
        purchase.purchasedOn.day === fullDate.getDate()
    );
  }

  const getSpecificWeekPurchase = (startingFullDate) => {
    let endOfWeek = new Date(startingFullDate.toDateString());
    endOfWeek.setDate(startingFullDate.getDate() + 7);

    return purchases.filter((purchase) => {
      const purchaseDate = new Date(
        `${purchase.purchasedOn.month}-${purchase.purchasedOn.day}-${purchase.purchasedOn.year}`
      );

      return (
        purchase.purchasedBy === currentUser &&
        purchaseDate >= startingFullDate &&
        purchaseDate <= endOfWeek
      );
    });
  } 

  return {
    getTodaysPurchases,
    getThisWeeksPurchases,
    purchases,
    reevalDuplication,
    getThisMonthsPurchases,
    getSpecificDayPurchase,
    getSpecificWeekPurchase,
  };
};

export default useUsers;
