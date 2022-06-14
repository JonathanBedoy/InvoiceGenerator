import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: [

  ],
  companyData: [

  ],
  attributesNeeded: {
    name: '',
    phone: 'number',
    city: '',
    street: '',
    zipCode: 'number',
    state: '',
    description: ''
  },
  hasBeenFetched: false
}

const companySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setHasBeenFetched(state, {payload}) {
      const {val =true} = payload
      state.hasBeenFetched = val
    },
    editCompany(state, { payload }) {
      const { id } = payload
      const index = state.company.findIndex(ele => ele.id === parseInt(id))
      if (index !== -1)
        state.company[index] = {
          ...state.company[index],
          ...payload
        }

    },
    addToCompany(stateNow, { payload }) {
      const { city = '', street = '', zipCode = '', state = '', phone = '5555555555', name = '', description = '', id = Math.floor(Math.random() * 100000000000000000) } = payload
      stateNow.company.push({ name, city, street, zipCode, state, description, phone, id })

    },
    computeCompanyData(state) {
      const sortedcompany = []
      state.company.forEach(element => {
        if (!sortedcompany[element.name]) sortedcompany[element.name] = []
        sortedcompany[element.name].push(element)
      });
      let keys = Object.keys(sortedcompany)
      const companyData = keys.map((ele, index) => {
        return {
          id: index, title: sortedcompany[ele][0].name.replaceAll('_', ' '),
          expandableInfo: {
            columns: [
              {
                name: 'Name',
                selector: 'name',
                center: true,
                sortable: true,
              },
              {
                name: 'Phone',
                selector: 'phone',
                sortable: true,
                center: true,
              },
              {
                name: 'Address',
                selector: 'location',
                sortable: true,
                center: true,
              }
            ],
            rows: sortedcompany[ele]
          },
        }
      })
      state.companyData = companyData
    },
    removeCompany(state, { payload }) {
      const { attributeLabel='', attributeValue='', attributeValueType='number', id = null } = payload
      //in case id is passed in 
      if (id !== null) {
        let index = state.company.findIndex(ele => ele.id === parseInt(id))
        state.company.splice(index, 1)
        return
      }
      let attributeValueFormatted = attributeValue
      if(attributeValueType === 'number') attributeValueFormatted = parseInt(attributeValueFormatted)
      let index = state.company.findIndex(ele => ele[attributeLabel] === attributeValueFormatted)
      // in case there are more than one
      while (index !== -1) {
        state.company.splice(index, 1)
        index = state.company.findIndex(ele => ele[attributeLabel] === attributeValueFormatted)
      }
    },
    setCompanyState(state, { payload }) {
      const {
        attributesNeeded = {
          name: '',
          phone: 'number',
          city: '',
          street: '',
          zipCode: 'number',
          state: '',
          description: ''
        },
        company = []
      } = payload

      state.attributesNeeded = attributesNeeded
      state.company = company
      state.hasBeenFetched = true
    }
  }
});

export const CompanyActions = companySlice.actions
export default companySlice;