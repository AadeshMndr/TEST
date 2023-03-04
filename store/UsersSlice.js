import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: "none",
    purchases: [],
    loadingData: false,
  },
  reducers: {
    replaceUsers(state, action) {
      state.users = action.payload.map((user) => ({
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        username: user.username,
      }));
    },
    replacePurchases(state, action) {
      state.purchases = action.payload;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    addToCart(state, action) {
      let cartItemArray = state.purchases.filter(
        (purchase) =>
          purchase.name === action.payload.name &&
          purchase.purchasedBy === action.payload.currentUser &&
          purchase.sectionName === action.payload.selectedSection_Name &&
          purchase.purchasedOn.year === new Date().getFullYear() &&
          purchase.purchasedOn.month === new Date().getMonth() + 1 &&
          purchase.purchasedOn.day === new Date().getDate() &&
          purchase.paid === false &&
          purchase.item.price === action.payload.item.price
      );

      if (cartItemArray.length === 0) {
        state.purchases.push({
          name: action.payload.name,
          amount: 1,
          paid: false,
          saved: false,
          purchasedBy: action.payload.currentUser,
          sectionName: action.payload.selectedSection_Name,
          purchasedOn: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
          },
          item: action.payload.item,
        });
      } else {
        let cartItem = cartItemArray[0];
        cartItem.amount++;
        cartItem.saved = false;
      }
    },
    deductFromCart(state, action) {
      let selectedPurchase = state.purchases.filter(
        (purchase) =>
          purchase.name === action.payload.name &&
          purchase.purchasedBy === action.payload.purchasedBy &&
          purchase.sectionName === action.payload.sectionName &&
          purchase.purchasedOn.year === new Date().getFullYear() &&
          purchase.purchasedOn.month === new Date().getMonth() + 1 &&
          purchase.purchasedOn.day === new Date().getDate() &&
          purchase.item.price === action.payload.item.price &&
          !purchase.paid
      )[0];

      if (selectedPurchase !== undefined) {
        if (selectedPurchase.amount > 1) {
          selectedPurchase.amount--;
          selectedPurchase.saved = false;
        } else if ((selectedPurchase.amount = 1)) {
          state.purchases = state.purchases.filter(
            (purchase) => purchase !== selectedPurchase
          );
        }
      }
    },
    reevaluatePurchasedItems(state, action) {
      state.purchases.forEach((purchase) => {
        let ok =
          purchase.name === action.payload.name &&
          purchase.sectionName === action.payload.sectionName &&
          purchase.purchasedOn.year === new Date().getFullYear() &&
          purchase.purchasedOn.month === new Date().getMonth() + 1 &&
          purchase.purchasedOn.day === new Date().getDate() &&
          !purchase.saved &&
          !purchase.paid;

        if (ok) {
          purchase.item = action.payload.item;
          purchase.name = action.payload.item.name;
          purchase.saved = false;
        }
      });
    },
    reevaluatePurchasedSections(state, action) {
      state.purchases.forEach((purchase) => {
        let ok =
          purchase.sectionName === action.payload.sectionName &&
          purchase.purchasedOn.year === new Date().getFullYear() &&
          purchase.purchasedOn.month === new Date().getMonth() + 1 &&
          purchase.purchasedOn.day === new Date().getDate();

        if (ok) {
          purchase.sectionName = action.payload.newSectionName;
          purchase.saved = false;
        }
      });
    },
    pay(state, action) {
      state.purchases.forEach((purchase) => {
        let ok =
          purchase.name === action.payload.name &&
          purchase.sectionName === action.payload.sectionName &&
          purchase.purchasedOn.year === action.payload.purchasedOn.year &&
          purchase.purchasedOn.month === action.payload.purchasedOn.month &&
          purchase.purchasedOn.day === action.payload.purchasedOn.day;

        if (purchase.saved && purchase.paid) {
          ok = false;
        }

        if (ok) {
          purchase.paid = action.payload.pay;
          purchase.saved = false;
        }
      });
    },
    payAll(state, action) {
      action.payload.purchases.forEach((payment) => {
        state.purchases.forEach((purchase) => {
          let ok =
            purchase.name === payment.name &&
            purchase.sectionName === payment.sectionName &&
            purchase.purchasedOn.year === payment.purchasedOn.year &&
            purchase.purchasedOn.month === payment.purchasedOn.month &&
            purchase.paid !== action.payload.pay &&
            purchase.purchasedOn.day === payment.purchasedOn.day;

          if (ok) {
            purchase.paid = action.payload.pay;
            purchase.saved = false;
          }
        });
      });
    },
    save(state, action) {
      action.payload.purchases.forEach((payment) => {
        state.purchases.forEach((purchase) => {
          let ok =
            purchase.name === payment.name &&
            purchase.sectionName === payment.sectionName &&
            purchase.purchasedOn.year === payment.purchasedOn.year &&
            purchase.purchasedOn.month === payment.purchasedOn.month &&
            purchase.purchasedOn.day === payment.purchasedOn.day;

          if (ok) {
            purchase.saved = true;
          }
        });
      });
    },
    setLoadingData(state, action) {
      state.loadingData = action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
