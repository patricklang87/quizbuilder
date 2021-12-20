import { createSlice } from '@reduxjs/toolkit';

export const viewResultsSlice = createSlice({
    name: "viewResults",
    initialState: {
        result: [],
        assessments: []
    },
    reducers: {
        setAssessments: (state, action) => {
            state.assessments = action.payload;
        },
        addAssessment: (state, action) => {
            state.assessments = [...state.assessments, action];
        },
        setResult: (state, action) => {
            state.result = action.payload;
        },
        removeAllResults: (state) => {
            state.assessments = [];
            state.result = [];
        }
    }
});

export const { setAssessments, addAssessment, setResult, removeAllResults } = viewResultsSlice.actions;
export default viewResultsSlice.reducer;