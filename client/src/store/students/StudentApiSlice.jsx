import { apiSlice } from "../api/apiSlice";

const studentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchStudent: builder.query({
            query: (params) => ({
                url: "/searchStudent",
                method: "GET",
                params,
            }),
            providesTags: ["Users"],
        }),
    }),
});

export const { useSearchStudentQuery } = studentApiSlice;