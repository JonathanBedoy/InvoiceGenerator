import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "onSite fasteners and tools",
  inventory: [
    // {
    //   type: 'asd',
    //   brand: 'Senco',
    //   quantity: 10,
    //   name: "1/2'",
    //   description: '3/5 Senco N17',
    //   id: 1
    // },
    // {
    //   type: 'd',
    //   brand: 'Unicatch',
    //   quantity: 6,
    //   name: "3/8' Gauge",
    //   description: "Unicatch 3/8' Gauge",
    //   id: 2
    // },
    // {
    //   type: 'Staples',
    //   brand: 'Senco',
    //   quantity: 21,
    //   name: "6/7'",
    //   description: "Senco 6/7'",
    //   id: 3
    // },
    // {
    //   type: 'Staples_Guns',
    //   brand: 'Senco',
    //   quantity: 3,
    //   name: "Flat Nose",
    //   description: "Senco Flat Nose",
    //   id: 4
    // },
    // {
    //   type: 'Staples_Guns',
    //   brand: 'Unicatch',
    //   quantity: 2,
    //   name: "Brad",
    //   description: 'Unicatch Brad',
    //   id: 5
    // }
  ],
  inventoryData: [],
  attributesNeeded: {
    type: "dropdown",
    brand: "dropdown",
    quantity: "number",
    // name: "",
    description: "",
  },
  hasBeenFetched: false,
};

const inventorySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setHasBeenFetched(state, { payload }) {
      const { val = true } = payload;
      state.hasBeenFetched = val;
    },
    updateQuantity(state, { payload }) {
      const { id, offset = 0, newQuantity = null } = payload;
      const index = state.inventory.findIndex((ele) => ele.id === parseInt(id));
      if (index !== -1) {
        let newQuantityCalculated = newQuantity
          ? Number(newQuantity)
          : Number(state.inventory[index].quantity) + Number(offset);
        // newQuantityCalculated = newQuantityCalculated < 0 ?
        state.inventory[index] = {
          ...state.inventory[index],
          quantity: newQuantityCalculated,
        };
      }
    },
    editInventoryItem(state, { payload }) {
      const { id } = payload;
      const index = state.inventory.findIndex((ele) => ele.id === parseInt(id));
      if (index !== -1)
        state.inventory[index] = {
          ...state.inventory[index],
          ...payload,
        };
    },
    addToInventory(state, { payload }) {
      const {
        type = "",
        brand = "",
        quantity = 0,
        name = "",
        description = "",
      } = payload;
      state.inventory.push({
        type,
        brand,
        quantity,
        name,
        description,
        id: Math.floor(Math.random() * 100000000000000000),
      });
    },
    copmuteInventoryData(state) {
      const sortedInventory = [];
      state.inventory.forEach((element) => {
        if (!sortedInventory[element.type]) sortedInventory[element.type] = [];
        sortedInventory[element.type].push(element);
      });
      let keys = Object.keys(sortedInventory);
      const inventoryData = keys.map((ele, index) => {
        return {
          id: index,
          title: sortedInventory[ele][0].type.replaceAll("_", " "),
          expandableInfo: {
            columns: [
              {
                name: sortedInventory[ele][0].type.replaceAll("_", " "),
                selector: "name",
                center: true,
                sortable: true,
              },
              {
                name: "Brand",
                selector: "brand",
                sortable: true,
                center: true,
              },
              {
                name: "Quantity",
                selector: "quantity",
                sortable: true,
                center: true,
              },
            ],
            rows: sortedInventory[ele],
          },
        };
      });
      state.inventoryData = inventoryData;
    },
    removeInventory(state, action) {
      const {
        attributeLabel = "",
        attributeValue = "",
        id = null,
      } = action.payload;
      if (id !== null) {
        let index = state.inventory.findIndex(
          (ele) => ele.id.toString() === id.toString()
        );
        state.inventory.splice(index, 1);
        return;
      }

      let attributeValueFormatted = attributeValue;

      let index = state.inventory.findIndex((ele) => {
        return ele[attributeLabel] == attributeValueFormatted;
      });
      // in case there are more than one
      while (index !== -1) {
        state.inventory.splice(index, 1);
        index = state.inventory.findIndex(
          (ele) => ele[attributeLabel] == attributeValueFormatted
        );
      }
    },
    setInventoryState(state, { payload }) {
      const {
        attributesNeeded = {
          type: "dropdown",
          brand: "dropdown",
          quantity: "number",
          // name: "",
          description: "",
        },
        inventory = [],
      } = payload;

      state.attributesNeeded = attributesNeeded;
      state.inventory = inventory;
      state.hasBeenFetched = true;
    },
  },
});

export const InventoryActions = inventorySlice.actions;

export default inventorySlice;
