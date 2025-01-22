import { apiSlice } from "../api/apiSlice";

const studentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchStudent: builder.query({
            query: (params) => ({
                url: "/searchStudents",
                method: "GET",
                params,
            }),
        }),
        getStudent: builder.query({
            query: (params) => ({
                url: "/student",
                method: "GET",
                params,
            }),
            providesTags: ["student"],
        }),
    }),
});

export const {
    useSearchStudentQuery,
    useLazyGetStudentQuery
} = studentApiSlice;