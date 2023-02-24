import { createSlice } from "@reduxjs/toolkit";

const ShopSlice = createSlice({
  name: "Shop",
  initialState: {
    sections: [],
    selectedSection_Name: null,
    items_Info: [],
    selectedItem_Name: null,
  },
  reducers: {
    replaceSections(state, action) {
      state.sections = action.payload;

      let infos = [];
      action.payload
        .map((section) => ({ sectionName: section.name, items: section.items }))
        .forEach((sectionObj) => {
          sectionObj.items.forEach((item) => {
            infos.push({
              sectionName: sectionObj.sectionName,
              itemName: item.name,
            });
          });
        });

      state.items_Info = infos;
    },
    addSection(state, action) {
      state.sections.push(action.payload);
    },
    addItem(state, action) {
      let [selectedSection] = state.sections.filter(
        (section) => section.name === state.selectedSection_Name
      );
      selectedSection.items.push(action.payload);
      state.items_Info.push({
        sectionName: state.selectedSection_Name,
        itemName: action.payload.name,
      });
    },
    updateSection(state, action) {
      state.items_Info.forEach((item_info) => {
        if (item_info.sectionName === state.selectedSection_Name) {
          item_info.sectionName = action.payload.name;
        }
      });

      let [selectedSection] = state.sections.filter(
        (section) => section.name === state.selectedSection_Name
      );
      selectedSection.name = action.payload.name;
      selectedSection.image = action.payload.image;
    },
    selectSection(state, action) {
      state.selectedSection_Name = action.payload;
    },
    removeSection(state) {
      state.sections = state.sections.filter(
        (section) => section.name !== state.selectedSection_Name
      );
      state.items_Info = state.items_Info.filter(
        (item_info) => item_info.sectionName !== state.selectedSection_Name
      );
    },
    selectItem(state, action) {
      state.selectedItem_Name = action.payload;
    },
    updateItem(state, action) {
      state.items_Info.forEach((item_info) => {
        if (
          item_info.sectionName === state.selectedSection_Name &&
          item_info.itemName === state.selectedItem_Name
        ) {
          item_info.itemName = action.payload.name;
        }
      });

      let [selectedItem] = state.sections
        .filter((section) => section.name === state.selectedSection_Name)[0]
        .items.filter((item) => item.name === state.selectedItem_Name);
      selectedItem.name = action.payload.name;
      selectedItem.price = action.payload.price;
      selectedItem.description = action.payload.description;
      selectedItem.image = action.payload.image;
      selectedItem.date = action.payload.date;
    },
    removeItem(state) {
      let [selectedSection] = state.sections.filter(
        (section) => section.name === state.selectedSection_Name
      );
      selectedSection.items = selectedSection.items.filter(
        (item) => item.name !== state.selectedItem_Name
      );
      state.items_Info = state.items_Info.filter(
        (item_info) =>
          !(
            item_info.sectionName === state.selectedSection_Name &&
            item_info.itemName === state.selectedItem_Name
          )
      );
    },
  },
});

export default ShopSlice;

export const ShopActions = ShopSlice.actions;
